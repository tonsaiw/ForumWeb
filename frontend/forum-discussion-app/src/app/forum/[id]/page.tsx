"use client"; // Marks this component as a client-side component

import { useParams, useRouter } from "next/navigation"; // Both hooks from next/navigation
import PostDetail from "../../../components/forum/PostDetail";
import { posts } from "../../../mockData/mockPosts";
import { Header } from "../../../components/common/Header";

export default function PostPage() {
  const { id } = useParams(); // Get dynamic route parameter (post ID)
  const router = useRouter(); // Use router for navigation

  // Find the post based on the id
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <Header />
      {/* Back Button */}
      <div className="pt-24">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg m-4 "
          onClick={() => router.push("/forum")} // Navigate back to forum page
        >
          Back to Forum
        </button>
        <PostDetail
          title={post.title}
          content={post.content}
          author={post.author}
          date={post.date}
        />
      </div>
    </div>
  );
}
