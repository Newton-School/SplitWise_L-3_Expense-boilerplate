const User = require('../models/userModel');
const Group = require('../models/groupModel');

const newGroup = async (req, res) => {
  const { name } = req.body;

  try {
    // Create a new group
    const newGroup = new Group({
      name,
      members: [req.user.userId],
    });

    await newGroup.save();

    // Add the group to the user's group list
    const user = await User.findById(req.user.userId);
    user.groups.push(newGroup._id);
    await user.save();

    res.status(201).json({ message: 'Group created successfully', newGroup });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getGroup = async (req, res) => {
  const groupId = req.params.id;

  try {
    // Fetch the group details
    const group = await Group.findById(groupId).populate(
      'members',
      'username email'
    );
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error('Error fetching group details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllGroups = async (req, res) => {
  try {
    // Fetch all groups
    const groups = await Group.find();

    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateGroup = async (req, res) => {
  const groupId = req.params.id;
  const { name } = req.body;

  try {
    // Find the group by ID
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Update the group's name
    group.name = name;
    await group.save();

    res.status(201).json({ message: 'Group updated successfully', group });
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addMember = async (req, res) => {
  const groupId = req.params.groupId;
  const { memberId } = req.body;

  try {
    const groupId = req.params.groupId;
    const { email } = req.body;

    try {
      // Check if the group exists
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }

      // Check if the member exists
      const member = await User.findOne({ email });
      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }

      // Add the member to the group
      group.members.push(member._id);
      await group.save();

      res
        .status(200)
        .json({ message: 'Member added to the group successfully' });
    } catch (error) {
      console.error('Error adding member to group:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error adding member to group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteMember = async (req, res) => {
  const groupId = req.params.groupId;
  const memberId = req.params.memberId;

  try {
    // Check if the group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    // Check if the member exists in the group
    const memberIndex = group.members.indexOf(memberId);
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found in the group' });
    }

    // Remove the member from the group
    group.members.splice(memberIndex, 1);
    await group.save();

    res
      .status(200)
      .json({ message: 'Member removed from the group successfully' });
  } catch (error) {
    console.error('Error removing member from group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  newGroup,
  getGroup,
  getAllGroups,
  updateGroup,
  addMember,
  deleteMember,
};
