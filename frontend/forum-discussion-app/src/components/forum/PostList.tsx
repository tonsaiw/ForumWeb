"use client";

import React from "react";
import { PostItem } from "./PostItem";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../../types/PostTypes";
import apiClient from "@/app/lib/axios";

const fetchPosts = async (): Promise<Post[]> => {
  const response = await apiClient.get("/posts");
  return response.data;
};

export const PostList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div>
      {data?.map((d: Post) => (
        <PostItem key={d._id} post={d} />
      ))}
    </div>
  );
};
