import { useContext, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import IconButton from "../components/ui/IconButton";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { deleteExpense, storeExpense, updatedExpense } from "../util/http";

const ManageExpense = ({ route, navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { expenses, dispatch } = useContext(ExpensesContext);
  const expenseID = route.params?.expenseID;
  const isEditExpense = !!expenseID;

  const selectedExpense = expenses.find((expense) => expense.id === expenseID);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditExpense ? "Edit Expense" : "Add Expense",
    });
  }, [isEditExpense, navigation]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    await deleteExpense(expenseID);
    dispatch({ type: "DELETE", payload: expenseID });
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsSubmitting(true);
    if (isEditExpense) {
      dispatch({
        type: "UPDATE",
        payload: {
          id: expenseID,
          data: expenseData,
        },
      });
      await updatedExpense(expenseID, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      dispatch({
        type: "ADD",
        payload: { ...expenseData, id: id },
      });
    }
    navigation.goBack();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

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
