import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BudgetAlerts() {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/expenses').then(res => setExpenses(res.data));
    axios.get('http://localhost:5000/budgets').then(res => setBudgets(res.data));
  }, []);

  const alerts = budgets.map(budget => {
    const total = expenses.filter(e => e.category === budget.category).reduce((sum, e) => sum + e.amount, 0);
    return total > budget.amount ? `${budget.category}: Over budget by $${total - budget.amount}` : null;
  }).filter(Boolean);

  return (
    <div className="card bg-secondary-subtle border-0 shadow-sm h-100 animate__animated animate__fadeInUp">
      <div className="card-body py-3">
        <h2 className="h5 mb-3">Budget Alerts</h2>
        {alerts.length ? (
          <div className="d-flex flex-column gap-2">
            {alerts.map((alert, i) => (
              <div key={i} className="alert alert-danger py-2 mb-0 animate__animated animate__shakeX" role="alert">{alert}</div>
            ))}
          </div>
        ) : (
          <p className="text-secondary mb-0">No alerts</p>
        )}
      </div>
    </div>
  );
}

export default BudgetAlerts;