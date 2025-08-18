import React, { useState } from 'react';
import axios from 'axios';

function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date) return alert('Fill all fields');
    try {
      await axios.post('http://localhost:5000/expenses', { amount: Number(amount), category, date });
      alert('Expense added');
      setAmount(''); setDate('');
    } catch (err) {
      alert('Error adding expense');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option><option>Rent</option><option>Transport</option><option>Entertainment</option>
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;