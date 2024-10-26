import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const postSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  outline: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

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

export const postRouter = createTRPCRouter({
  create: createPost,
  get: getPost,
  update: updatePost,
  delete: deletePost,
  list: listPosts,
});
