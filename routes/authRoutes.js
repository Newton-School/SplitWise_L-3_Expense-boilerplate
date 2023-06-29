const express = require('express');

const {
  login,
  signup,
  decodeToken,
  getAllRegisteredUser,
} = require('../controllers/authControllers');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Restricted Routes
router.get('/decode', decodeToken);
router.get('/users', getAllRegisteredUser);

module.exports = router;
