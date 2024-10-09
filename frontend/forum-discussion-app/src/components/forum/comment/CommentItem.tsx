import React from "react";
import Link from "next/link";
import { CommentProps } from "../../../types/CommentTypes";

export const CommentItem: React.FC<CommentProps> = ({ comment }) => {
  return (
    <Link href={`/forum/${comment._id}`}>
      <div className="bg-[#3b1e17] text-white p-4 mb-6 rounded-lg relative cursor-pointer">
        <p className="mb-4">{comment.message}</p>
        <div className="text-sm text-gray-400">
          <p>{comment.author}</p>
          <p>{comment.last_updated_at}</p>
        </div>
      </div>
    </Link>
  );
};
