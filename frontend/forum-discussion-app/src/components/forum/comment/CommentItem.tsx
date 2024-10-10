import React from "react";
import Link from "next/link";
import { CommentProps } from "../../../types/CommentTypes";

import { useState } from "react";
import CommentForm from "./EditCommentForm";

export const CommentItem: React.FC<CommentProps> = ({ postId, comment }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const handleToggleComment = () => {
    setIsCommentOpen((prev) => !prev);
  };

  return (
    // <Link href={`/forum/${postId}/comments/${comment._id}`}>
    <div className="max-w-4xl bg-[#3b1e17] text-white p-4 mb-6 mx-auto rounded-lg relative cursor-pointer">
      <p className="mb-4">{comment.message}</p>
      <div className="text-sm text-gray-400">
        <p>{comment.author}</p>
        <p>{comment.last_updated_at}</p>
      </div>
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        onClick={handleToggleComment}
      >
        Edit or Delete
      </button>
      {isCommentOpen && (
        <CommentForm
          postId={postId}
          commentId={comment._id}
          onClose={handleToggleComment}
        />
      )}
    </div>
    // </Link>
  );
};
