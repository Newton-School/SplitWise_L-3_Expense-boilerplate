const express = require('express');

const {
  newGroup,
  getGroup,
  getAllGroups,
  updateGroup,
  addMember,
  deleteMember,
} = require('../controllers/groupControllers');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post('/new', isLoggedIn, isAuthenticated('user'), newGroup);
router.get('/:id', isLoggedIn, getGroup);
router.get('/', isLoggedIn, getAllGroups);
router.patch('/:id', isLoggedIn, updateGroup);

//For Member
router.post('/:groupId/member', isLoggedIn, isAuthenticated('user'), addMember);
router.delete(
  '/:groupId/member/:memberId',
  isLoggedIn,
  isAuthenticated('user'),
  deleteMember
);

module.exports = router;
