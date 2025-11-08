import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [
      {
        id: 1,
        name: "Parviz Aslanov",
        department: "Marketing",
        position: "UI Designer",
        startDate: "2023-11-20",
        salary: "1700",
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
