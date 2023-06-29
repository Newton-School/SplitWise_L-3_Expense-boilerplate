const express = require('express');

const {
  addExpense,
  getAllExpense,
  getExpensesByGroup,
  getTransactionByGroup,
  getDebtsAndCredits,
  settleExpense,
} = require('../controllers/expenseControllers');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post('/group/:groupId', isLoggedIn, isAuthenticated('user'), addExpense);
router.get('/', isLoggedIn, isAuthenticated('user'), getAllExpense);
router.get(
  '/group/:groupId',
  isLoggedIn,
  isAuthenticated('user'),
  getExpensesByGroup
);
router.get(
  '/transaction/:groupId',
  isLoggedIn,
  isAuthenticated('user'),
  getTransactionByGroup
);
router.get(
  '/calculate/:groupId',
  isLoggedIn,
  isAuthenticated('user'),
  getDebtsAndCredits
);

router.patch(
  '/settle/:expenseId',
  isLoggedIn,
  isAuthenticated('user'),
  settleExpense
);

module.exports = router;
