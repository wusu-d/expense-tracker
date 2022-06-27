import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  expenses: [],
};

export const ExpensesContext = createContext(INITIAL_STATE);

const ExpensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { expenses: [{ ...action.payload }, ...state.expenses] };
    case "DELETE":
      return {
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case "SET":
      const inverted = action.payload.reverse();
      return {
        expenses: inverted,
      };
    case "UPDATE":
      const updatableExpenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state.expenses[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state.expenses];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return { expenses: updatedExpenses };
    default:
      return state;
  }
};

export const ExpensesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExpensesReducer, INITIAL_STATE);

  return (
    <ExpensesContext.Provider value={{ expenses: state.expenses, dispatch }}>
      {children}
    </ExpensesContext.Provider>
  );
};
