
# Lovable Quest Backend

This is the backend server for the Lovable Quest learning platform, providing API endpoints for the frontend application.

## Features

- User authentication and authorization
- Kingdom zones and interactive learning activities
- Quests and quizzes for children
- Progress tracking and achievements
- Family mode support
- Educator tools

## Technology Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/lovable_quest
   JWT_SECRET=your_jwt_secret_key_change_in_production
   ```

### Running the Server

Development mode:
```
npm run dev
```

Production mode:
```
npm start
```

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login a user

### Users
- GET /api/users/profile - Get user profile (requires auth)
- PUT /api/users/profile - Update user profile (requires auth)
- GET /api/users/achievements - Get user achievements (requires auth)

### Kingdom
- GET /api/kingdom/zones - Get all kingdom zones
- GET /api/kingdom/zones/:id - Get a specific zone
- GET /api/kingdom/zones/:id/activities - Get activities for a zone
- GET /api/kingdom/zones/:id/quizzes - Get quizzes for a zone
- POST /api/kingdom/zones/:id/progress - Track user progress in a zone (requires auth)

### Quests
- GET /api/quests - Get all quests
- GET /api/quests/category/:category - Get quests by category
- GET /api/quests/:id - Get a specific quest
- POST /api/quests/:id/start - Start a quest (requires auth)
- POST /api/quests/:id/submit - Submit a quest (requires auth)

### Progress
- GET /api/progress - Get user progress (requires auth)
- POST /api/progress - Update user progress (requires auth)
- GET /api/progress/leaderboard - Get leaderboard

## License

This project is licensed under the MIT License.
