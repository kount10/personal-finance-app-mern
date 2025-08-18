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
    <div className="alerts-container">
      <h2>Budget Alerts</h2>
      {alerts.length ? alerts.map((alert, i) => <p key={i} className="alert">{alert}</p>) : <p>No alerts</p>}
    </div>
  );
}

export default BudgetAlerts;