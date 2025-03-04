import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { chatMessages } from "@/service/llmrag";
import {chunks2Text, whisperAsr} from "@/service/asr";
import { uploadToS3 } from "@/service/s3";

const postSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  outline: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type AsrRes = {
  status: string;
  file_id: number;
  text: string;
  chunks: Chunk[];
};

export type Chunk = {
  timestamp: number[];
  text: string;
};

const createPost = publicProcedure
  .input(
    postSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.db.post.create({
      // @ts-ignore
      data: {
        ...input,
      },
    });
  });

const getPost = publicProcedure
  .input(z.number())
  .query(async ({ input, ctx }) => {
    return ctx.db.post.findUnique({
      where: {
        id: input,
      },
      include: {
        card: true,
      },
    });
  });

const updatePost = publicProcedure
  .input(
    postSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { id, ...data } = input;
    return ctx.db.post.update({
      where: { id },
      data,
    });
  });

const deletePost = publicProcedure
  .input(z.number())
  .mutation(async ({ input, ctx }) => {
    return ctx.db.post.delete({
      where: { id: input },
    });
  });

const listPosts = publicProcedure
  .input(
    z
      .object({
        limit: z.number().min(1).max(100).optional(),
        cursor: z.number().optional(),
      })
      .optional(),
  )
  .query(async ({ input, ctx }) => {
    const limit = input?.limit ?? 50;
    const cursor = input?.cursor;

    return ctx.db.post.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        card: true,
      },
    });
  });

const MAX_FILE_SIZE = 500 * 1024 * 1024;

const genByRecord = publicProcedure
  .input(
    z.object({
      file: z.object({
        name: z.string(),
        type: z.string(),
        // base64 格式的文件内容
        content: z.string(),
      }),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    try {
      // 检查文件大小（base64）
      const fileSizeInBytes = Buffer.from(input.file.content, "base64").length;
      if (fileSizeInBytes > MAX_FILE_SIZE) {
        throw new TRPCError({
          code: "PAYLOAD_TOO_LARGE",
          message: "文件大小不能超过 500MB",
        });
      }

      // 检查文件类型
      const allowedTypes = ["audio/wav", "audio/mp3", "audio/mpeg"];
      if (!allowedTypes.includes(input.file.type)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "仅支持 WAV, MP3 格式的音频文件",
        });
      }

      const post = await ctx.db.post.create({
        data: {
          name: input.file.name,
          outline: "", // 识别出的文字
          // 如果需要保存其他信息，在这里添加
        },
      });

      const fileUrl = await uploadToS3(
        input.file.content,
        input.file.name,
        input.file.type
      );
      void whisperAsr(input.file.content).then(async (res: AsrRes) => {
        if (res.status !== "success") {
          return {
            code: 1,
            msg: "failed",
          };
        }

        const text = chunks2Text(res.chunks)

        const result = await chatMessages(text);
        await ctx.db.post.update({
          where: {
            id: post.id,
          },
          data: {
            outline: result.answer,
          },
        });
      });

      return {
        code: 0,
        msg: "success",
      };
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error;
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "语音识别失败",
      });
    }
  });

export const postRouter = createTRPCRouter({
  create: createPost,
  get: getPost,
  update: updatePost,
  delete: deletePost,
  list: listPosts,
  genByRecord: genByRecord,
});
