const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
