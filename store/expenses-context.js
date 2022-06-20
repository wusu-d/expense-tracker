import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  expenses: [
    {
      id: "e1",
      description: "A pair of shoes",
      amount: 59.99,
      date: new Date("2021-12-19"),
    },
    {
      id: "e2",
      description: "A pair of trousers",
      amount: 79.43,
      date: new Date("2022-01-17"),
    },
    {
      id: "e3",
      description: "Some bananas",
      amount: 21.61,
      date: new Date("2022-06-16"),
    },
    {
      id: "e4",
      description: "A book",
      amount: 10.52,
      date: new Date("2022-06-20"),
    },
    {
      id: "e5",
      description: "Dinner",
      amount: 100.28,
      date: new Date("2022-05-05"),
    },
    {
      id: "e6",
      description: "A pair of shoes",
      amount: 59.99,
      date: new Date("2021-12-19"),
    },
    {
      id: "e7",
      description: "A pair of trousers",
      amount: 79.43,
      date: new Date("2022-01-17"),
    },
    {
      id: "e8",
      description: "Some bananas",
      amount: 21.61,
      date: new Date("2021-12-30"),
    },
    {
      id: "e9",
      description: "A book",
      amount: 10.52,
      date: new Date("2022-06-04"),
    },
    {
      id: "e10",
      description: "Dinner",
      amount: 100.28,
      date: new Date("2022-06-19"),
    },
  ],
};

export const ExpensesContext = createContext(INITIAL_STATE);

const ExpensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return { expenses: [{ ...action.payload, id: id }, ...state.expenses] };
    case "DELETE":
      return {
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
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
