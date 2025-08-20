import React from 'react';
import { useData } from '../context/DataContext';
import axios from 'axios';

function ExpenseList() {
  const { expenses, refreshData } = useData();

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this expense?');
    if (!confirmed) return;
    try {
      await axios.delete(`/expenses/${id}`);
      await refreshData();
    } catch (err) {
      console.error('Error deleting expense:', err);
      const message = err?.response?.data?.error || err?.message || 'Unknown error';
      alert(`Failed to delete expense: ${message}`);
    }
  };

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
    <div className="card bg-secondary-subtle border-0 shadow-sm h-100 animate__animated animate__fadeInUp">
      <div className="card-body py-3">
        <h3 className="h5 mb-3">Expense List</h3>
        {expenses.length === 0 ? (
          <p className="text-secondary">No expenses recorded.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Category</th>
                  <th scope="col">Amount</th>
                  <th scope="col" className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(expense => (
                  <tr key={expense._id} className="animate__animated animate__fadeIn">
                    <td>{expense.date}</td>
                    <td>{expense.category}</td>
                    <td>${expense.amount}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(expense._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ExpenseList);