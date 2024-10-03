import React from "react";
import { PostItem } from "./PostItem";
import { mockPosts } from "../../mockData/mockPosts";

export const PostList = () => {
  return (
    <div>
      {mockPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};
