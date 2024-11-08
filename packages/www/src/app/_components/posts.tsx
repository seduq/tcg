"use client"

import { Post } from "@prisma/client";
import { api } from "@tcg/www/trpc/react";
import { FunctionComponent, useState } from "react";

const Posts: FunctionComponent = () => {
  const utils = api.useUtils();
  const [{ pages: initial }, query] = api.post.getAll
    .useSuspenseInfiniteQuery({
      take: 2,
    }, {
      getNextPageParam: (lastPage) => lastPage.cursor,
    });

  const [pages, setPages] = useState<Post[]>(initial.flatMap((page) => page.posts));

  const pagesFetch = async () => {
    const { data: result } = await query.fetchNextPage();
    if (result) {
      setPages(result.pages.flatMap((page) => page.posts));
    }
  }

  return (
    <>
      <ul>
        {
          pages?.map((post) => (
            <li key={post.id}>{post.name}</li>
          ))}
      </ul>
      {query.hasNextPage && <button onClick={pagesFetch}>++++</button>}
    </>
  );
}

export default Posts;