const router = require('express').Router();

router.use('/auth', require('./authRoutes'));
router.use('/group', require('./groupRoutes'));
router.use('/expense', require('./expenseRoutes'));

module.exports = router;
