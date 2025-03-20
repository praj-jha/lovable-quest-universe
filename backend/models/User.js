
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  parentEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: [3, 'Age must be at least 3'],
    max: [18, 'Age must be less than 19']
  },
  role: {
    type: String,
    enum: ['student', 'parent', 'educator', 'admin'],
    default: 'student'
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  level: {
    type: Number,
    default: 1
  },
  xp: {
    type: Number,
    default: 0
  },
  preferences: {
    grade: String,
    subjects: [String]
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Add virtual for user's progress
UserSchema.virtual('progress', {
  ref: 'Progress',
  localField: '_id',
  foreignField: 'userId'
});

// Add method to update user XP
UserSchema.methods.addXP = async function(amount) {
  this.xp += amount;
  
  // Level up logic (simple example: every 100 XP = 1 level)
  const newLevel = Math.floor(this.xp / 100) + 1;
  if (newLevel > this.level) {
    this.level = newLevel;
  }
  
  await this.save();
  return this;
};

module.exports = mongoose.model('User', UserSchema);
