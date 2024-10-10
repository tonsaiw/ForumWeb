import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import apiClient from "@/app/lib/axios";
interface HeaderProps {
  onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLoginClick }) => {
  const { user, setUser } = useAuth();
  const handleLogout = () => {
    try {
      apiClient.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-8 bg-[#3b1e17] text-white shadow-md">
      <div className="text-2xl font-bold flex items-center">
        <span className="text-[#ffcd2d]">Forum</span>
        <span className="text-green-500">Hub</span>
      </div>
      {user ? (
        <div className="flex items-center space-x-4">
          <span>Welcome, {user}</span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          onClick={onLoginClick}
        >
          Login
        </button>
      )}
    </header>
  );
};
