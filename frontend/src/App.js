import React, { Component } from 'react';
import ExpenseForm from './components/ExpenseForm';
import BudgetForm from './components/BudgetForm';
import ExpenseList from './components/ExpenseList';
import SpendingChart from './components/SpendingChart';
import BudgetAlerts from './components/BudgetAlerts';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import QuoteToast from './components/QuoteToast';
import './App.css';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h2>Something went wrong.</h2>;
    return this.props.children;
  }
}

function App() {
  return (
    <div className="App text-light min-vh-100">
      <BackgroundSlideshow />
      <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">Personal Finance</a>
        </div>
      </nav>
      <header className="py-3 text-center">
        <h1 className="h3 fw-semibold mb-1 animate__animated animate__fadeInDown">Personal Finance Management App</h1>
        <p className="text-secondary mb-0">Track expenses, set budgets, visualize spending</p>
      </header>
      <main className="container pb-3">
        <div className="row g-3 align-items-stretch">
          <div className="col-12 col-lg-6">
            <ExpenseForm />
          </div>
          <div className="col-12 col-lg-6">
            <BudgetForm />
          </div>
        </div>
        <div className="row g-3 mt-2 align-items-stretch">
          <div className="col-12 col-lg-6">
            <ErrorBoundary>
              <ExpenseList />
            </ErrorBoundary>
          </div>
          <div className="col-12 col-lg-6">
            <BudgetAlerts />
          </div>
        </div>
        <div className="row g-3 mt-2 align-items-stretch">
          <div className="col-12">
            <SpendingChart />
          </div>
        </div>
      </main>
      <QuoteToast />
    </div>
  );
}

export default App;