import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseRes, budgetRes] = await Promise.all([
          axios.get('/expenses'),
          axios.get('/budgets')
        ]);
        setExpenses(expenseRes.data || []);
        setBudgets(budgetRes.data || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const refreshData = async () => {
    try {
      const [expenseRes, budgetRes] = await Promise.all([
        axios.get('/expenses'),
        axios.get('/budgets')
      ]);
      setExpenses(expenseRes.data || []);
      setBudgets(budgetRes.data || []);
    } catch (err) {
      console.error('Error refreshing data:', err);
    }
  };

  return (
    <DataContext.Provider value={{ expenses, budgets, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);