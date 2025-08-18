import React from 'react';
import ExpenseForm from './components/ExpenseForm';
import BudgetForm from './components/BudgetForm';
import ExpenseList from './components/ExpenseList';
import SpendingChart from './components/SpendingChart';
import BudgetAlerts from './components/BudgetAlerts';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Personal Finance Management App (MERN)</h1>
      </header>
      <main>
        <div className="forms-container">
          <ExpenseForm />
          <BudgetForm />
        </div>
        <ExpenseList />
        <SpendingChart />
        <BudgetAlerts />
      </main>
    </div>
  );
}

export default App;