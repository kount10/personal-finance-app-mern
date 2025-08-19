const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Models
const expenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  date: String
});
const budgetSchema = new mongoose.Schema({
  category: String,
  amount: Number
});
const Expense = mongoose.model('Expense', expenseSchema, 'expenses');
const Budget = mongoose.model('Budget', budgetSchema, 'budgets');

// Routes
app.post('/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json({ message: 'Expense added' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/budgets', async (req, res) => {
  try {
    const { category, amount } = req.body;
    await Budget.findOneAndUpdate({ category }, { category, amount }, { upsert: true });
    res.status(201).json({ message: 'Budget set' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

app.get('/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));