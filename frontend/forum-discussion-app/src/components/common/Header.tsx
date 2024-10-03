export const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-8 bg-[#3b1e17] text-white shadow-md">
    <div className="text-2xl font-bold flex items-center">
      <span className="text-[#ffcd2d]">Unity</span>
      <span className="text-green-500">Hub</span>
    </div>
    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
      Login
    </button>
  </header>
);
