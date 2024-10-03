import { Header } from "../common/Header";
import { HeroSection } from "../common/HeroSection";
import { PostList } from "./PostList";

const Forum = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <Header />
      <HeroSection />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Latest Discussions</h2>
        <PostList />
      </div>
    </div>
  );
};

export default Forum;
