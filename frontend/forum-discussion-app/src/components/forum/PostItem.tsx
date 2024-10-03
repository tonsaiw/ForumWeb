import React from "react";
import Link from "next/link";
import { PostProps } from "../../types/PostTypes";

export const PostItem: React.FC<PostProps> = ({ post }) => {
  return (
    <Link href={`/forum/${post.id}`}>
      <div className="bg-[#3b1e17] text-white p-4 mb-6 rounded-lg relative cursor-pointer">
        <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
        <p className="mb-4">{post.content}</p>
        <button className="bg-[#d0945d] text-white py-1 px-3 rounded-lg mb-4">
          Discussion
        </button>
        <div className="text-sm text-gray-400">
          <p>{post.author}</p>
          <p>{post.date}</p>
        </div>
        <div className="absolute top-4 right-4 text-green-500 text-2xl flex items-center">
          <p>{post.votes}</p>
          <span className="ml-2">🔼</span>
        </div>
      </div>
    </Link>
  );
};
