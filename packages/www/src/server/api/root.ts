import { postRouter } from "@tcg/www/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@tcg/www/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
