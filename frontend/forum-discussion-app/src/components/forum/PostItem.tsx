import React from "react";
import Link from "next/link";
import { PostProps } from "../../types/PostTypes";

export const PostItem: React.FC<PostProps> = ({ post }) => {
  return (
    <Link href={`/forum/${post._id}`}>
      <div className="bg-[#3b1e17] text-white p-4 mb-6 rounded-lg relative cursor-pointer">
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <p className="mb-4">{post.content}</p>
        <div className="text-sm text-gray-400">
          <p>{post.author}</p>
          <p>{post.last_updated_at}</p>
        </div>
      </div>
    </Link>
  );
};
