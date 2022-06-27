import axios from "axios";

const BACKEND_URL = "https://expense-tracker-707a4-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const res = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
  const id = res.data.name;
  return id;
};

export const getExpenses = async () => {
  const res = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];

  for (const key in res.data) {
    expenses.push({
      id: key,
      date: new Date(res.data[key].date),
      amount: res.data[key].amount,
      description: res.data[key].description,
    });
  }

  return expenses;
};

export const updatedExpense = (id, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
};
