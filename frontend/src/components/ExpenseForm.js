import React, { useState } from 'react';
import axios from 'axios';
import { useData } from '../context/DataContext';

function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState('');
  const { refreshData } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !date) return alert('Fill all fields');
    try {
      await axios.post('/expenses', { amount: Number(amount), category, date });
      await refreshData();
      alert('Expense added');
      setAmount(''); setDate('');
    } catch (err) {
      const message = err?.response?.data?.error || err?.message || 'Unknown error';
      alert(`Error adding expense: ${message}`);
    }
  };

  return (
    <div className="card bg-secondary-subtle border-0 shadow-sm h-100 animate__animated animate__fadeInUp">
      <div className="card-body py-3">
        <h2 className="h4 mb-3">Add Expense</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required className="form-control bg-dark text-light" />
          </div>
          <div className="col-12">
            <label className="form-label">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select bg-dark text-light">
              <option>Food</option><option>Rent</option><option>Transport</option><option>Entertainment</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="form-control bg-dark text-light" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">Add Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;