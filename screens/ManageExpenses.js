import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const { expenses, dispatch } = useContext(ExpensesContext);
  const expenseID = route.params?.expenseID;
  const isEditExpense = !!expenseID;

  const selectedExpense = expenses.find((expense) => expense.id === expenseID);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditExpense ? "Edit Expense" : "Add Expense",
    });
  }, [isEditExpense, navigation]);

  const deleteExpenseHandler = () => {
    dispatch({ type: "DELETE", payload: expenseID });
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (isEditExpense) {
      dispatch({
        type: "UPDATE",
        payload: {
          id: expenseID,
          data: expenseData,
        },
      });
    } else {
      dispatch({
        type: "ADD",
        payload: expenseData,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditExpense ? "Update" : "Add"}
        cancelHandler={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />

      {isEditExpense && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={30}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    alignItems: "center",
    paddingTop: 8,
    marginTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  },
});
export default ManageExpense;
