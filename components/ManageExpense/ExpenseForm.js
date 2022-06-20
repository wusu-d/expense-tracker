import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Alert } from "react-native";
import { getFormattedDate } from "../../util/date";
import Button from "../ui/Button";
import Input from "./Input";

const ExpenseForm = ({
  submitButtonLabel,
  cancelHandler,
  onSubmit,
  defaultValues,
}) => {
  const [inputValues, setInputValues] = useState({
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    amount: defaultValues ? defaultValues.amount.toString() : "",
    description: defaultValues ? defaultValues.description : "",
  });

  const inputChangedHandler = (name, value) => {
    setInputValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    //validation
    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValid = expenseData.date !== "Invalid Date";
    const descValid = expenseData.description.trim().length > 0;

    if (!amountValid || !dateValid || !descValid) {
      Alert.alert("Invalid input", "Please check your input values");
      return;
    }
    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangedHandler("amount", value),
            value: inputValues.amount,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY/MM/DD",
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler("date", value),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCapitalize: "none",
          autpCorrect: false,
          onChangeText: (value) => inputChangedHandler("description", value),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginTop: 40 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: { flexDirection: "row", justifyContent: "space-between" },
  rowInput: { flex: 1 },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
export default ExpenseForm;
