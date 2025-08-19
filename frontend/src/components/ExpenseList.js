import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = () => {
    axios.get('http://localhost:5000/expenses')
      .then(res => setExpenses(res.data || []))
      .catch(err => console.error('Error fetching expenses:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/expenses/${id}`)
      .then(() => {
        setExpenses(expenses.filter(expense => expense._id !== id));
      })
      .catch(err => console.error('Error deleting expense:', err));
  };

  return (
    <div className="table-container">
      <h3>Expense List</h3>
      {expenses.length === 0 ? (
        <p>No expenses recorded.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense._id}>
                <td>{expense.date}</td>
                <td>{expense.category}</td>
                <td>${expense.amount}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(expense._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseList;