import React from "react";
import { PostDetailProps } from "../../types/PostTypes";

const PostDetail: React.FC<PostDetailProps> = ({
  title,
  content,
  author,
  date,
}) => {
  return (
    <>
      <div className="min-h-screen bg-[#1c1c1e] text-white p-6 pt-24">
        <div className="max-w-4xl mx-auto bg-[#252526] p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-sm text-gray-400 mb-4">{date}</p>
          <p className="bg-[#d0945d] text-white py-1 px-3 rounded-lg inline-block mb-6">
            {author}
          </p>
          <p className="mb-6">{content}</p>
          <p className="font-bold">{author}</p>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <p className="text-gray-400 mb-4">
              Here's a subtitle for a comment block.
            </p>
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
              rows={4}
              placeholder="Write your comment..."
            />
            <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg">
              Comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
