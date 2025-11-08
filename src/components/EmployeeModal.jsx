import { useState, useEffect } from "react";

export default function EmployeeModal({ employee, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    position: "",
    startDate: "",
    salary: "",
  });

  useEffect(() => {
    if (employee) setForm(employee);
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "salary") {
      const numericValue = value.replace(/[^\d]/g, ""); // remove non-numeric characters
      setForm({
        ...form,
        salary: numericValue ? formatINR(numericValue) : "",
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanSalary = parseInt(form.salary.replace(/[^0-9]/g, "")) || 0;

    onSave({ ...form, salary: cleanSalary });
  };
  const formatINR = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const departments = ["Marketing", "Finance", "HR", "IT", "Sales", "Testing"];
  const positions = [
    "UI Designer",
    "UX Designer",
    "Software Developer",
    "Tester",
    "Project Manager",
    "Accountant",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none transition"
          />
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none transition bg-white"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none transition bg-white"
          >
            <option value="">Select Position</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none transition"
          />
          <input
            type="text"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary (in ₹)"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none transition"
          />
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-accent text-white hover:bg-accent/80 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
