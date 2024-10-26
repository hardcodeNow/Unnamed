import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

const cardSchema = z.object({
  id: z.number().optional(),
  content: z.string(),
  postId: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const createCard = publicProcedure
  .input(
    cardSchema.omit({
      id: true,
      createdAt: true,
      updatedAt: true,
    })
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.db.card.create({
      data: {
        ...input,
      },
    });
  });

const readCard = publicProcedure
  .input(z.number())
  .query(async ({ input, ctx }) => {
    return ctx.db.card.findUnique({
      where: { id: input },
      include: {
        post: true,
      },
    });
  });

const updateCard = publicProcedure
  .input(
    cardSchema.omit({
      createdAt: true,
      updatedAt: true,
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { id, ...data } = input;
    return ctx.db.card.update({
      where: { id },
      data,
    });
  });

const deleteCard = publicProcedure
  .input(z.number())
  .mutation(async ({ input, ctx }) => {
    return ctx.db.card.delete({
      where: { id: input },
    });
  });

const listCards = publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).optional(),
      cursor: z.number().optional(),
      postId: z.number().optional(),
    }).optional()
  )
  .query(async ({ input, ctx }) => {
    const limit = input?.limit ?? 50;
    const cursor = input?.cursor;

    return ctx.db.card.findMany({
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      where: input?.postId ? {
        postId: input.postId
      } : undefined,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post: true,
      },
    });
  });

const searchCards = publicProcedure
  .input(z.string())
  .query(async ({ input, ctx }) => {
    return ctx.db.card.findMany({
      where: {
        content: {
          contains: input,
        },
      },
      include: {
        post: true,
      },
    });
  });

export const cardRouter = createTRPCRouter({
  create: createCard,
  read: readCard,
  update: updateCard,
  delete: deleteCard,
  list: listCards,
  search: searchCards,
});
