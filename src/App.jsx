import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import { useSelector, useDispatch } from "react-redux";
import {
  addEmployee,
  editEmployee,
  selectEmployee,
  clearSelectedEmployee,
} from "./redux/employeeSlice";

export default function App() {
  const { employees, selectedEmployee } = useSelector((state) => state.employee);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  // ✅ Added states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterDept, setFilterDept] = useState("All");

  const handleSave = (employee) => {
    if (selectedEmployee) {
      dispatch(editEmployee(employee));
    } else {
      const newEmployee = { ...employee, id: Date.now() };
      dispatch(addEmployee(newEmployee));
    }
    dispatch(clearSelectedEmployee());
    setShowModal(false);
  };

  // ✅ Filter employees by search
  let filteredEmployees = employees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    return (
      emp.name.toLowerCase().includes(query)
    );
  });

  // ✅ Filter by department
  if (filterDept !== "All") {
    filteredEmployees = filteredEmployees.filter(
      (emp) => emp.department === filterDept
    );
  }

  // ✅ Sort employees by name
  filteredEmployees.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortOrder === "asc") return nameA.localeCompare(nameB);
    return nameB.localeCompare(nameA);
  });

  return (
    <div className="flex bg-background min-h-screen">
      {/* Sidebar (fixed) */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col ml-64">
        <Topbar
          onAdd={() => {
            dispatch(clearSelectedEmployee());
            setShowModal(true);
          }}
          onSearch={setSearchQuery}
        />

        <div className="p-6">
          <EmployeeTable
            employees={filteredEmployees}
            onRowClick={(emp) => {
              dispatch(selectEmployee(emp));
              setShowModal(true);
            }}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            filterDept={filterDept}
            setFilterDept={setFilterDept}
          />
        </div>
      </div>

      {showModal && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
