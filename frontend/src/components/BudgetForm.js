import React, { useState } from 'react';
import axios from 'axios';
import { useData } from '../context/DataContext';

function BudgetForm() {
  const [category, setCategory] = useState('Food');
  const [amount, setAmount] = useState('');
  const { refreshData } = useData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return alert('Enter budget amount');
    try {
      await axios.post('/budgets', { category, amount: Number(amount) });
      await refreshData();
      alert('Budget set');
      setAmount('');
    } catch (err) {
      const message = err?.response?.data?.error || err?.message || 'Unknown error';
      alert(`Error setting budget: ${message}`);
    }
  };

  return (
    <div className="card bg-secondary-subtle border-0 shadow-sm h-100 animate__animated animate__fadeInUp">
      <div className="card-body py-3">
        <h2 className="h4 mb-3">Set Budget</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-12">
            <label className="form-label">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select bg-dark text-light">
              <option>Food</option><option>Rent</option><option>Transport</option><option>Entertainment</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Budget Amount" required className="form-control bg-dark text-light" />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">Set Budget</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm;