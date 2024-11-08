import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";


export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.post.create({
        data: input
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.post.findFirst({
      orderBy: {
        createdAt: 'desc'
      }
    }) ?? null;
  }),

  getAll: publicProcedure.input(z.object({
    take: z.number().min(1).max(50),
    cursor: z.number().nullish()
  })).query(async ({ ctx, input }) => {
    const cursor = input.cursor || 1;
    const take = input.take;
    const skip = input.cursor ? 1 : 0;
    
    const posts = await ctx.db.post.findMany({
      take: take,
      skip: skip,
      cursor: {
        id: cursor
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    let nextCursor: number | undefined = posts.at(-1)?.id;
    if(posts.length < take)
      nextCursor = undefined;
    return {
      posts,
      cursor: nextCursor || null
    }
  }),
});
