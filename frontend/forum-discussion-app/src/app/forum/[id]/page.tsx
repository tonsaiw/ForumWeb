"use client"; // Marks this component as a client-side component
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Both hooks from next/navigation
import PostDetail from "../../../components/forum/PostDetail";
import { Header } from "../../../components/common/Header";
import apiClient from "../../lib/axios";
import { Post } from "../../../types/PostTypes";
import { CommentList } from "@/components/forum/comment/CommentList";
import Login from "@/components/user/Login";
import EditPostForm from "@/components/forum/EditPostForm";

export default function PostPage() {
  const { id } = useParams(); // Get dynamic route parameter (post ID)
  const router = useRouter(); // Use router for navigation

  const [post, setPost] = useState<Post | null>(null); // State to store post data
  const [isLoading, setIsLoading] = useState(true); // Loading state for better UX
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleToggleLogin = () => {
    setIsLoginOpen((prev) => !prev); // Toggles the login modal
  };

  const [isEditPostFormOpen, setIsEditPostFormOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiClient.get<Post>(`/posts/${id}`);

        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }
  const handleToggleEditPostForm = () => {
    setIsEditPostFormOpen((prev) => !prev); // Toggles the login modal
  };
  return (
    <div>
      <Header onLoginClick={handleToggleLogin} />
      {/* Back Button */}
      <div className="min-h-screen bg-[#1c1c1e] text-white p-6 pt-24">
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
          date={post.last_updated_at}
          postId={post._id}
          onEditClick={handleToggleEditPostForm}
        />
        <CommentList postId={post._id} />
        {isLoginOpen && <Login onClose={handleToggleLogin} />}
        {isEditPostFormOpen && (
          <EditPostForm onClose={handleToggleEditPostForm} postId={post._id} />
        )}
      </div>
    </div>
  );
}
