import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [
      {
        id: 1,
        name: "JP",
        department: "IT",
        position: "UI Designer",
        startDate: "20-11-2023",
        salary: "₹12,000",
      },
    ],
    selectedEmployee: null,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) state.employees[index] = action.payload;
    },
    selectEmployee: (state, action) => {
      state.selectedEmployee = action.payload;
    },
    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },
});

export const {
  addEmployee,
  editEmployee,
  selectEmployee,
  clearSelectedEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
