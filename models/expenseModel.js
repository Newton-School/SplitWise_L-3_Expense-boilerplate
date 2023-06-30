// models/Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  settled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Expense', ExpenseSchema);
