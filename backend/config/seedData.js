
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Zone = require('../models/Zone');
const Activity = require('../models/Activity');
const Quiz = require('../models/Quiz');
const User = require('../models/User');
const Achievement = require('../models/Achievement');
const Quest = require('../models/Quest');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Sample data
const zones = [
  {
    name: 'Math Kingdom',
    description: 'Explore the magical world of numbers and shapes',
    icon: 'calculator',
    color: '#4285F4',
    level: 1,
    position: { x: 200, y: 150 },
    subject: 'math',
    ageRange: { min: 5, max: 12 }
  },
  {
    name: 'Science Lab',
    description: 'Discover the wonders of science through experiments',
    icon: 'flask',
    color: '#0F9D58',
    level: 1,
    position: { x: 400, y: 200 },
    subject: 'science',
    ageRange: { min: 6, max: 14 }
  },
  {
    name: 'Reading Forest',
    description: 'Journey through stories and boost your reading skills',
    icon: 'book-open',
    color: '#F4B400',
    level: 1,
    position: { x: 300, y: 350 },
    subject: 'reading',
    ageRange: { min: 5, max: 10 }
  },
  {
    name: 'Writing Castle',
    description: 'Learn the art of writing in this magical castle',
    icon: 'pen',
    color: '#DB4437',
    level: 2,
    position: { x: 500, y: 300 },
    subject: 'writing',
    ageRange: { min: 7, y: 12 }
  },
  {
    name: 'History Tower',
    description: 'Travel back in time and explore historical events',
    icon: 'clock',
    color: '#9C27B0',
    level: 2,
    position: { x: 150, y: 400 },
    subject: 'history',
    ageRange: { min: 8, max: 14 }
  },
  {
    name: 'Coding Valley',
    description: 'Learn programming concepts in a fun interactive way',
    icon: 'code',
    color: '#00BCD4',
    level: 3,
    position: { x: 600, y: 150 },
    subject: 'coding',
    ageRange: { min: 8, max: 16 }
  }
];

const users = [
  {
    username: 'sarah_student',
    email: 'sarah@example.com',
    password: 'password123',
    parentEmail: 'parent@example.com',
    age: 10,
    role: 'student'
  },
  {
    username: 'parent_user',
    email: 'parent@example.com',
    password: 'password123',
    role: 'parent'
  },
  {
    username: 'teacher_jane',
    email: 'teacher@example.com',
    password: 'password123',
    role: 'educator'
  }
];

const achievements = [
  {
    name: 'Math Novice',
    description: 'Complete 5 activities in Math Kingdom',
    icon: 'badge-math-novice',
    type: 'activity_completion',
    threshold: 5,
    xpReward: 50,
    rarity: 'common'
  },
  {
    name: 'Science Explorer',
    description: 'Complete 5 activities in Science Lab',
    icon: 'badge-science-explorer',
    type: 'activity_completion',
    threshold: 5,
    xpReward: 50,
    rarity: 'common'
  },
  {
    name: 'Quest Master',
    description: 'Complete 10 quests',
    icon: 'badge-quest-master',
    type: 'quest_completion',
    threshold: 10,
    xpReward: 100,
    rarity: 'uncommon'
  },
  {
    name: 'Learning Enthusiast',
    description: 'Spend 2 hours in the learning kingdom',
    icon: 'badge-time',
    type: 'time_spent',
    threshold: 7200, // 2 hours in seconds
    xpReward: 75,
    rarity: 'uncommon'
  },
  {
    name: 'Perfect Score',
    description: 'Get a perfect score on 3 quizzes',
    icon: 'badge-perfect',
    type: 'high_score',
    threshold: 3,
    xpReward: 150,
    rarity: 'rare'
  }
];

// Seed data function
const seedData = async () => {
  try {
    // Clear existing data
    await Zone.deleteMany();
    await Activity.deleteMany();
    await Quiz.deleteMany();
    await User.deleteMany();
    await Achievement.deleteMany();
    await Quest.deleteMany();

    console.log('Data cleaned');

    // Insert achievements
    const createdAchievements = await Achievement.insertMany(achievements);
    console.log(`${createdAchievements.length} achievements inserted`);

    // Insert zones
    const createdZones = await Zone.insertMany(zones);
    console.log(`${createdZones.length} zones inserted`);

    // Create activities for each zone
    const activities = [];
    for (const zone of createdZones) {
      // Create 3 activities per zone
      for (let i = 1; i <= 3; i++) {
        activities.push({
          title: `${zone.name} Activity ${i}`,
          description: `Fun activity for ${zone.name}`,
          type: ['game', 'video', 'interactive'][Math.floor(Math.random() * 3)],
          zoneId: zone._id,
          content: {
            instructions: `Instructions for activity ${i}`,
            mediaUrl: `https://example.com/activities/${zone.subject}${i}.mp4`,
            interactiveElements: ['element1', 'element2']
          },
          duration: 15 + Math.floor(Math.random() * 30),
          difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)],
          xpReward: 10 + Math.floor(Math.random() * 20)
        });
      }
    }

    const createdActivities = await Activity.insertMany(activities);
    console.log(`${createdActivities.length} activities inserted`);

    // Create quizzes for each zone
    const quizzes = [];
    for (const zone of createdZones) {
      quizzes.push({
        title: `${zone.name} Quiz`,
        description: `Test your knowledge of ${zone.subject}`,
        zoneId: zone._id,
        questions: [
          {
            question: `Sample question 1 for ${zone.subject}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0,
            points: 10
          },
          {
            question: `Sample question 2 for ${zone.subject}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 1,
            points: 10
          },
          {
            question: `Sample question 3 for ${zone.subject}?`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 2,
            points: 10
          }
        ],
        timeLimit: 10,
        passingScore: 60,
        xpReward: 30,
        difficulty: 'beginner'
      });
    }

    const createdQuizzes = await Quiz.insertMany(quizzes);
    console.log(`${createdQuizzes.length} quizzes inserted`);

    // Create family quests
    const quests = [
      {
        title: 'Family Math Challenge',
        description: 'Solve these math problems together as a family',
        category: 'family',
        subject: 'math',
        ageRange: { min: 6, max: 12 },
        questions: [
          {
            question: 'What is 5 + 7?',
            options: ['10', '12', '15', '17'],
            correctAnswer: 1,
            type: 'multiple_choice',
            points: 10
          },
          {
            question: 'Is 15 > 12?',
            options: ['True', 'False'],
            correctAnswer: 0,
            type: 'true_false',
            points: 5
          },
          {
            question: 'Explain how to solve 3 × 4 using addition',
            type: 'text',
            points: 15
          }
        ],
        expectedDuration: 20,
        xpReward: 50,
        difficulty: 'beginner'
      },
      {
        title: 'Backyard Science Experiment',
        description: 'Conduct a simple science experiment with your family',
        category: 'family',
        subject: 'science',
        ageRange: { min: 7, max: 14 },
        questions: [
          {
            question: 'What happens when you mix vinegar and baking soda?',
            options: ['Nothing', 'It gets hot', 'It bubbles', 'It changes color'],
            correctAnswer: 2,
            type: 'multiple_choice',
            points: 10
          },
          {
            question: 'Upload a photo of your experiment',
            type: 'file_upload',
            points: 20
          }
        ],
        expectedDuration: 45,
        xpReward: 75,
        difficulty: 'intermediate'
      }
    ];

    const createdQuests = await Quest.insertMany(quests);
    console.log(`${createdQuests.length} quests inserted`);

    // Insert users with hashed passwords
    for (const user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    
    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users inserted`);

    console.log('Database seeded successfully!');
    process.exit();
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
