import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="table-container">
      <h2>Expenses</h2>
      <table>
        <thead><tr><th>Amount</th><th>Category</th><th>Date</th></tr></thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp._id}><td>{exp.amount}</td><td>{exp.category}</td><td>{exp.date}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;