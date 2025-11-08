import { FaSearch } from "react-icons/fa";

export default function Topbar({ onAdd, onSearch }) {  // ✅ added onSearch prop
  return (
    <div className="flex justify-between items-center bg-secondary text-white px-8 py-4 shadow-md">
      {/* Left section: Title + Search bar */}
      <div className="flex items-center gap-6 w-2/3">
        <h1 className="text-lg font-semibold whitespace-nowrap">
          Human Resources
        </h1>

        {/* Search bar */}
         <div className="relative flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)} // ✅ added this line
            className="w-full px-4 py-2 rounded-full bg-white/90 text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
          />
          <FaSearch className="absolute right-4 top-2.5 text-gray-500" />
        </div>
      </div>

      {/* Add People button */}
      <button
        onClick={onAdd}
        className="bg-accent px-4 py-2 rounded-lg text-sm hover:bg-accent/80 transition font-medium"
      >
        + Add People
      </button>
    </div>
  );
}
