const Group = require('../models/groupModel');
const Expense = require('../models/expenseModel');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

const addExpense = async (req, res) => {
  const groupId = req.params.groupId;
  const { description, amount } = req.body;
  const userId = req.user.userId;
  console.log(userId);

  try {
    //NOTE: Read description carefully
    //Write a code to add expense here logic given in description write a code accoding to it
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllExpense = async (req, res) => {
  try {
    //write a code to get all Expense
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getExpensesByGroup = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    //NOTE: Read description carefully
    // Write a code to GET a Expense by group and also populate members and expenses
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getTransactionByGroup = async (req, res) => {
  const groupId = req.params.groupId;

  try {
    //NOTE: Read description carefully
    // Write a code here to GET a transaction by group and populate payer, recipient, group
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const calculateDebtsAndCredits = async (userId, groupId) => {
  try {
    const group = await Group.findById(groupId);
    if (!group) {
      throw new Error('Group not found');
    }

    // Get all the transactions involving the user within the group
    const groupTransactions = await Transaction.find({
      group: groupId,
      $or: [{ payer: userId }, { recipient: userId }],
    });
    console.log(groupTransactions);

    // Get all the transactions involving the user outside the group
    const outsideGroupTransactions = await Transaction.find({
      group: { $ne: groupId },
      $or: [{ payer: userId }, { recipient: userId }],
    });

    console.log(outsideGroupTransactions);

    // Calculate the debts and credits within the group
    const debtsAndCredits = {};
    for (const memberId of group.members) {
      if (memberId !== userId) {
        debtsAndCredits[memberId] = 0;
      }
    }

    for (const transaction of groupTransactions) {
      if (transaction.payer === userId) {
        debtsAndCredits[transaction.recipient] -= transaction.amount;
      } else {
        debtsAndCredits[transaction.payer] += transaction.amount;
      }
    }

    // Calculate the debts and credits outside the group
    for (const transaction of outsideGroupTransactions) {
      const otherMemberId =
        transaction.payer === userId
          ? transaction.recipient
          : transaction.payer;
      if (debtsAndCredits[otherMemberId] === undefined) {
        debtsAndCredits[otherMemberId] = 0;
      }
      debtsAndCredits[otherMemberId] +=
        transaction.payer === userId ? -transaction.amount : transaction.amount;
    }

    return debtsAndCredits;
  } catch (error) {
    console.error('Error calculating debts and credits:', error);
    throw error;
  }
};

// GET method to fetch debts and credits
const getDebtsAndCredits = async (req, res) => {
  const userId = req.user.userId;
  const groupId = req.params.groupId;

  try {
    // Implement calculateDebtsAndCredits function here
  } catch (error) {
    console.error('Error fetching debts and credits:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const settleExpense = async (req, res) => {
  const expenseId = req.params.expenseId;
  const userId = req.user.userId;

  try {
    //NOTE: Read description carefully
    //Write a code to settle a expense in a group
  } catch (error) {
    console.error('Error settling expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addExpense,
  getAllExpense,
  getExpensesByGroup,
  getTransactionByGroup,
  getDebtsAndCredits,
  settleExpense,
};
