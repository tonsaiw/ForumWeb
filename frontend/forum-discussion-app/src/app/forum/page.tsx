"use client";
import { Header } from "@/components/common/Header";
import { HeroSection } from "@/components/common/HeroSection";
import PostForm from "@/components/forum/PostForm";
import { PostList } from "@/components/forum/PostList";
import Login from "@/components/user/Login";
import { useState } from "react";
import { AuthProvider } from "../context/AuthContext";

const Forum = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleToggleLogin = () => {
    setIsLoginOpen((prev) => !prev); // Toggles the login modal
  };

  const [isPostFormOpen, setIsPostFormOpen] = useState(false);

  const handleTogglePostForm = () => {
    setIsPostFormOpen((prev) => !prev); // Toggles the login modal
  };
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <AuthProvider>
        <Header onLoginClick={handleToggleLogin} />
        <HeroSection onPostFormClick={handleTogglePostForm} />
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">Latest Discussions</h2>
          <PostList />
        </div>
        {isLoginOpen && <Login onClose={handleToggleLogin} />}
      </AuthProvider>
      {isPostFormOpen && <PostForm onClose={handleTogglePostForm} />}
    </div>
  );
};

export default Forum;
