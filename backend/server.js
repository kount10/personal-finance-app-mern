const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// CORS configuration (allow frontend dev server)
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/personal_finance_app';
mongoose.connect(mongoUri)
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

// Basic request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.post('/expenses', async (req, res) => {
  try {
    const { amount, category, date } = req.body || {};
    if (amount === undefined || amount === null || isNaN(Number(amount)) || !category || !date) {
      return res.status(400).json({ error: 'Missing or invalid fields: amount, category, date are required' });
    }
    const expense = new Expense({ amount: Number(amount), category, date });
    await expense.save();
    res.status(201).json({ message: 'Expense added' });
  } catch (err) {
    console.error('POST /expenses failed:', err);
    res.status(500).json({ error: err?.message || 'Server error' });
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

// Delete an expense by id
app.delete('/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('DELETE /expenses hit with id:', id);
    let deleted = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      deleted = await Expense.findByIdAndDelete(id);
    }

    if (!deleted) {
      const result = await Expense.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Expense not found' });
      }
    }

    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/budgets', async (req, res) => {
  try {
    const { category, amount } = req.body || {};
    if (!category || amount === undefined || amount === null || isNaN(Number(amount))) {
      return res.status(400).json({ error: 'Missing or invalid fields: category and amount are required' });
    }
    await Budget.findOneAndUpdate(
      { category },
      { category, amount: Number(amount) },
      { upsert: true, new: true }
    );
    res.status(201).json({ message: 'Budget set' });
  } catch (err) {
    console.error('POST /budgets failed:', err);
    res.status(500).json({ error: err?.message || 'Server error' });
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

// Debug endpoint to list routes
app.get('/__routes', (req, res) => {
  try {
    const stack = app._router && app._router.stack ? app._router.stack : [];
    const routes = [];
    stack.forEach((layer) => {
      if (layer.route && layer.route.path) {
        const methods = Object.keys(layer.route.methods)
          .filter((m) => layer.route.methods[m])
          .map((m) => m.toUpperCase());
        routes.push({ path: layer.route.path, methods });
      }
    });
    res.json(routes);
  } catch (e) {
    res.json([]);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  try {
    const stack = app._router && app._router.stack ? app._router.stack : [];
    console.log('Registered routes:');
    stack.forEach((layer) => {
      if (layer.route && layer.route.path) {
        const methods = Object.keys(layer.route.methods)
          .filter((m) => layer.route.methods[m])
          .map((m) => m.toUpperCase())
          .join(',');
        console.log(`${methods} ${layer.route.path}`);
      }
    });
  } catch (e) {
    // ignore
  }
});