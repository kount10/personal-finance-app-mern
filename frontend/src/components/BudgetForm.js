import React, { useState } from 'react';
import axios from 'axios';

function BudgetForm() {
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return alert('Enter budget amount');
    try {
      await axios.post('http://localhost:5000/budgets', { category, amount: Number(amount) });
      alert('Budget set');
      setAmount('');
    } catch (err) {
      alert('Error setting budget');
    }
  };

  return (
    <div className="form-container">
      <h2>Set Budget</h2>
      <form onSubmit={handleSubmit}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option><option>Rent</option><option>Transport</option><option>Entertainment</option>
        </select>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Budget Amount" required />
        <button type="submit">Set Budget</button>
      </form>
    </div>
  );
}

export default BudgetForm;