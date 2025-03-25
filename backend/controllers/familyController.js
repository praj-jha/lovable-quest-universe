
const Family = require('../models/Family');
const User = require('../models/User');
const Submission = require('../models/Submission');

// Create a new family
exports.createFamily = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Check if user already has a family
    if (req.user.familyId) {
      return res.status(400).json({
        success: false,
        message: 'You are already part of a family'
      });
    }
    
    // Create new family
    const family = new Family({
      name,
      admin: req.user.id,
      members: [req.user.id]
    });
    
    await family.save();
    
    // Update user with family ID
    await User.findByIdAndUpdate(req.user.id, {
      familyId: family._id
    });
    
    res.status(201).json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create family',
      error: error.message
    });
  }
};

// Get all families
exports.getFamilies = async (req, res) => {
  try {
    const families = await Family.find()
      .populate('admin', 'username')
      .sort({ points: -1 });
    
    res.status(200).json({
      success: true,
      count: families.length,
      data: families
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get families',
      error: error.message
    });
  }
};

// Get a single family
exports.getFamily = async (req, res) => {
  try {
    const { id } = req.params;
    
    const family = await Family.findById(id)
      .populate('admin', 'username')
      .populate('members', 'username avatar');
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get family',
      error: error.message
    });
  }
};

// Get user's family
exports.getUserFamily = async (req, res) => {
  try {
    if (!req.user.familyId) {
      return res.status(404).json({
        success: false,
        message: 'You are not part of any family'
      });
    }
    
    const family = await Family.findById(req.user.familyId)
      .populate('admin', 'username')
      .populate('members', 'username avatar');
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    // Get family's submissions
    const submissions = await Submission.find({ familyId: family._id })
      .populate('challengeId', 'title')
      .sort({ submittedAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        family,
        submissions
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get user family',
      error: error.message
    });
  }
};

// Update a family
exports.updateFamily = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    
    // Check if family exists
    let family = await Family.findById(id);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    // Check if user is the admin of the family
    if (family.admin.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this family'
      });
    }
    
    // Update family
    family = await Family.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update family',
      error: error.message
    });
  }
};

// Add member to family
exports.addFamilyMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    // Check if family exists
    let family = await Family.findById(id);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    // Check if user is the admin of the family
    if (family.admin.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add members to this family'
      });
    }
    
    // Check if user to be added exists
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if user is already in a family
    if (user.familyId) {
      return res.status(400).json({
        success: false,
        message: 'User is already part of a family'
      });
    }
    
    // Check if user is already a member
    if (family.members.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this family'
      });
    }
    
    // Add user to family
    family.members.push(userId);
    await family.save();
    
    // Update user with family ID
    await User.findByIdAndUpdate(userId, {
      familyId: family._id
    });
    
    res.status(200).json({
      success: true,
      message: 'Member added to family',
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to add member to family',
      error: error.message
    });
  }
};

// Remove member from family
exports.removeFamilyMember = async (req, res) => {
  try {
    const { id, memberId } = req.params;
    
    // Check if family exists
    let family = await Family.findById(id);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    // Check if user is the admin of the family or the member being removed
    if (family.admin.toString() !== req.user.id && memberId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to remove members from this family'
      });
    }
    
    // Check if member is the admin
    if (memberId === family.admin.toString() && family.members.length > 1) {
      return res.status(400).json({
        success: false,
        message: 'Admin cannot leave family while other members exist. Transfer admin role first.'
      });
    }
    
    // Check if member exists in family
    if (!family.members.includes(memberId)) {
      return res.status(400).json({
        success: false,
        message: 'User is not a member of this family'
      });
    }
    
    // Remove member from family
    family.members = family.members.filter(
      member => member.toString() !== memberId
    );
    
    await family.save();
    
    // Update user to remove family ID
    await User.findByIdAndUpdate(memberId, {
      $unset: { familyId: "" }
    });
    
    // If no members left, delete family
    if (family.members.length === 0) {
      await Family.findByIdAndDelete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Family deleted as no members remain'
      });
    }
    
    // If admin is removed, assign new admin
    if (memberId === family.admin.toString()) {
      family.admin = family.members[0];
      await family.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Member removed from family',
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to remove member from family',
      error: error.message
    });
  }
};

// Transfer admin role
exports.transferAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { newAdminId } = req.body;
    
    // Check if family exists
    let family = await Family.findById(id);
    
    if (!family) {
      return res.status(404).json({
        success: false,
        message: 'Family not found'
      });
    }
    
    // Check if user is the admin of the family
    if (family.admin.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to transfer admin role'
      });
    }
    
    // Check if new admin is a member
    if (!family.members.includes(newAdminId)) {
      return res.status(400).json({
        success: false,
        message: 'New admin must be a member of the family'
      });
    }
    
    // Transfer admin role
    family.admin = newAdminId;
    await family.save();
    
    res.status(200).json({
      success: true,
      message: 'Admin role transferred successfully',
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to transfer admin role',
      error: error.message
    });
  }
};

// Get family leaderboard
exports.getFamilyLeaderboard = async (req, res) => {
  try {
    const families = await Family.find()
      .select('name points level')
      .sort({ points: -1, level: -1 })
      .limit(10);
    
    res.status(200).json({
      success: true,
      count: families.length,
      data: families
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get family leaderboard',
      error: error.message
    });
  }
};
