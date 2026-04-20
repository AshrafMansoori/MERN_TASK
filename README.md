# MERN Task Management Application

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Overview

This application allows users to create, read, update, and delete tasks. It provides a clean and intuitive interface for managing daily tasks and organizing workflow.

## Tech Stack

### Frontend
- **React** - UI library
- **CSS** - Styling
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## Project Structure

```
task_management/
├── frontend/                    # React frontend application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   └── button.js
│   │   ├── services/
│   │   │   └── api.js         # API service
│   │   ├── App.js             # Main App component
│   │   ├── App.css
│   │   └── index.js           # Entry point
│   └── package.json
│
└── backend/                     # Express backend server
    ├── config/
    │   └── db.js              # Database configuration
    ├── controllers/
    │   └── taskController.js   # Task controller logic
    ├── models/
    │   └── task.js            # Task model schema
    ├── routes/
    │   └── taskRoutes.js       # Task routes
    ├── server.js              # Server entry point
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure database connection in `config/db.js`

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000` (or your configured port)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start the Backend Server**
```bash
cd backend
npm start
```

3. **Start the Frontend Application** (in another terminal)
```bash
cd frontend
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Features

- ✅ Create new tasks
- ✅ View all tasks
- ✅ Update existing tasks
- ✅ Delete tasks
- ✅ Task completion status tracking

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

Create a `.env` file in the backend directory:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

MIT License

## Contact

For questions or suggestions, please reach out to [AshrafMansoori](https://github.com/AshrafMansoori)

## 😎😎 Author
**Ashraful Haq Aamir**
*Github:  https://github.com/AshrafMansoori
*LinkedIn: www.linkedin.com/in/ashraful-haq-aamir-ba1635313
*LeetCode: https://leetcode.com/u/AshrafMansoori/

---
⭐ If You Like This Project,Don't Forget To Star The Repo!

