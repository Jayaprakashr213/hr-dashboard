import { useState, useRef, useEffect } from "react";
import { FaSort, FaFilter } from "react-icons/fa";

export default function EmployeeTable({
  employees,
  onRowClick,
  sortOrder,
  setSortOrder,
  filterDept,
  setFilterDept,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const departments = ["All", "Marketing", "Finance", "HR", "IT", "Sales", "Testing"];

  const dropdownRef = useRef(null);

  // ✅ Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterSelect = (value) => {
    setFilterDept(value);
    setShowFilter(false);
  };

  return (
    <div className="bg-card mt-6 rounded-xl shadow-lg border border-gray-200 relative">
      <div className="flex justify-between items-center px-4 py-3 bg-background border-b border-gray-200 relative z-20">
        <div className="flex items-center gap-3">
          {/* ✅ Sort button */}
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-primary/90 transition"
          >
            <FaSort /> Sort {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-primary/90 transition"
            >
              <FaFilter /> Filter
            </button>
            {showFilter && (
              <div
                className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-36 animate-fadeIn"
                style={{ transform: "translateY(5px)" }}
              >
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => handleFilterSelect(dept)}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      filterDept === dept
                        ? "bg-accent text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <span className="text-sm text-gray-500">
          Showing {employees.length} Employees
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-background text-primary font-semibold text-sm uppercase">
            <tr>
              <th className="p-4">Full Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Position</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">Salary</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                onClick={() => onRowClick(emp)}
                className="hover:bg-accent/10 cursor-pointer border-b border-gray-200"
              >
                <td className="p-4">{emp.name}</td>
                <td className="p-4">{emp.department}</td>
                <td className="p-4">{emp.position}</td>
                <td className="p-4">{emp.startDate}</td>
                <td className="p-4">{emp.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
