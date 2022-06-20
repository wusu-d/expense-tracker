import { useContext, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const { dispatch } = useContext(ExpensesContext);
  const expenseID = route.params?.expenseID;
  const isEditExpense = !!expenseID;

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

  const confirmHandler = () => {
    if (isEditExpense) {
      dispatch({
        type: "UPDATE",
        payload: {
          id: expenseID,
          data: { description: "Test!", date: new Date(), amount: 19.99 },
        },
      });
    } else {
      dispatch({
        type: "ADD",
        payload: { description: "Test", date: new Date(), amount: 20.99 },
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditExpense ? "Update" : "Add"}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
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
