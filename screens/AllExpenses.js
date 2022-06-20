import { useContext } from "react";
import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useContext(ExpensesContext);
  return <ExpensesOutput expenses={expenses} expensesPeriod="All expenses" />;
};

export default AllExpenses;
