import React, { useMemo } from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { useData } from '../context/DataContext';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function SpendingChart() {
  const { expenses } = useData();

  const categories = useMemo(() => (expenses.length ? [...new Set(expenses.map(e => e.category))] : []), [expenses]);
  const pieData = useMemo(() => ({
    labels: categories,
    datasets: [{
      data: categories.map(cat => expenses.filter(e => e.category === cat).reduce((sum, e) => sum + (e.amount || 0), 0)),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    }],
  }), [categories, expenses]);
  const barData = useMemo(() => ({
    labels: categories,
    datasets: [{
      label: 'Total Expenses',
      data: categories.map(cat => expenses.filter(e => e.category === cat).reduce((sum, e) => sum + (e.amount || 0), 0)),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderWidth: 1,
    }],
  }), [categories, expenses]);
  const dates = useMemo(() => (expenses.length ? [...new Set(expenses.map(e => e.date))].sort() : []), [expenses]);
  const lineData = useMemo(() => ({
    labels: dates,
    datasets: [{
      label: 'Expenses Over Time',
      data: dates.map(date => expenses.filter(e => e.date === date).reduce((sum, e) => sum + (e.amount || 0), 0)),
      fill: false,
      borderColor: '#36A2EB',
      tension: 0.1,
    }],
  }), [dates, expenses]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.4,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#e9ecef' }
      },
      tooltip: {
        titleColor: '#111',
        bodyColor: '#111',
        backgroundColor: 'rgba(233,236,239,0.9)'
      }
    },
    scales: {
      x: { ticks: { color: '#e9ecef' }, grid: { color: 'rgba(233,236,239,0.1)' } },
      y: { beginAtZero: true, ticks: { color: '#e9ecef' }, grid: { color: 'rgba(233,236,239,0.1)' } }
    },
    animation: { duration: 800, easing: 'easeOutQuart' },
    resizeDelay: 150
  };

  return (
    <div className="card bg-secondary-subtle border-0 shadow-sm h-100 animate__animated animate__fadeInUp">
      <div className="card-body py-3">
        <div className="row g-3">
          <div className="col-12 col-lg-4">
            <h3 className="h6">Spending by Category</h3>
            {categories.length ? <Pie data={pieData} options={chartOptions} /> : <p className="text-secondary">No data</p>}
          </div>
          <div className="col-12 col-lg-4">
            <h3 className="h6">Expenses by Category</h3>
            {categories.length ? <Bar data={barData} options={chartOptions} /> : <p className="text-secondary">No data</p>}
          </div>
          <div className="col-12 col-lg-4">
            <h3 className="h6">Expenses Over Time</h3>
            {dates.length ? <Line data={lineData} options={chartOptions} /> : <p className="text-secondary">No data</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SpendingChart);