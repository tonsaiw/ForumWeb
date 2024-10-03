import React from "react";
import { PostItem } from "./PostItem";
import { posts } from "../../mockData/mockPosts";

export const PostList = () => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
