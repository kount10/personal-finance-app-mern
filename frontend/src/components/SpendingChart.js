import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SpendingChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, []);

  const categories = [...new Set(expenses.map(e => e.category))];
  const data = {
    labels: categories,
    datasets: [{
      data: categories.map(cat => expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }],
  };

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <Pie data={data} />
    </div>
  );
}

export default SpendingChart;