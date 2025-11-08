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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-modal">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          {employee ? "Edit Employee" : "Add Employee"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {["name", "department", "position", "startDate", "salary"].map(
            (field) => (
              <input
                key={field}
                type={field === "salary" ? "number" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={
                  field.charAt(0).toUpperCase() + field.slice(1)
                }
                required
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none transition"
              />
            )
          )}

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
              className="px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
