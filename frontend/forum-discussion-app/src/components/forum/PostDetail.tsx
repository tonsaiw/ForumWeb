import React from "react";
import { useState } from "react";
import { PostDetailProps } from "../../types/PostTypes";
import apiClient from "@/app/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface NewComment {
  message: string;
}
const createComment = async (postId: string, newComment: NewComment) => {
  const response = await apiClient.post(
    `/posts/${postId}/comments`,
    newComment
  );
  return response.data;
};

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  content,
  author,
  date,
  postId,
  onEditClick,
}) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (newComment: NewComment) => createComment(postId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setMessage("");
      setError(null);
    },
    onError: () => {
      setError(
        "Comment creation failed. Please check your inputs and try again."
      );
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) {
      setError("Comment cannot be empty.");
      return;
    }
    mutation.mutate({ message });
  };
  return (
    <>
      <div className="max-w-4xl mx-auto bg-[#252526] p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-sm text-gray-400 mb-4">{date}</p>
        <p className="bg-[#d0945d] text-white py-1 px-3 rounded-lg inline-block mb-6">
          {author}
        </p>
        <p className="mb-6">{content}</p>
        <p className="font-bold">{author}</p>
        <button
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
          onClick={onEditClick}
        >
          Edit or Delete Post
        </button>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <p className="text-gray-400 mb-4">
            Here's a subtitle for a comment block.
          </p>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
            rows={4}
            placeholder="Write your comment..."
          />
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={handleSubmit}
          >
            Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
