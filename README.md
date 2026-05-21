Team Task Manager
A full-stack team productivity application that enables organizations to manage projects, assign tasks, and track progress — all in one place. Built with a role-based access system that separates Admin and Member capabilities.

Overview
Team Task Manager is designed for small to mid-sized teams who need a lightweight but functional project management tool. Admins can create projects, assign tasks to team members, and monitor overall progress. Members can view their assigned tasks and update statuses in real time. The application features a modern dark UI with teal accents, JWT-based authentication, and a RESTful API backend.

Features
Authentication & Security

User signup and login with encrypted passwords using bcryptjs
JWT-based authentication with a 7-day token expiry
Bearer token authorization on all protected routes
Role-based access control — Admin and Member roles
Protected frontend routes that redirect unauthenticated users to login

Admin Capabilities

Create and manage projects
Create tasks and assign them to team members
Set due dates for tasks
Full visibility over all projects and tasks

Member Capabilities

View all projects in the workspace
View tasks assigned across the team
Update task status — Pending, In Progress, or Completed

Dashboard

Real-time task statistics — Total, Completed, In Progress, Pending, and Overdue counts
Quick overview of the 5 most recent tasks with assignee and status

Tasks

Tasks linked to both a project and an assigned user
Due date tracking with overdue highlighting
Inline status updates without page reload
Populated dropdowns for users and projects (no manual ID entry)

UI / UX

Dark theme with vibrant teal accents
Sticky glassmorphism navbar with active route highlighting
Responsive project card grid
Color-coded status badges (Pending, In Progress, Completed)
Empty states for projects and tasks
Loading states and error feedback on all forms


Tech Stack
Frontend
TechnologyPurposeReact 19UI frameworkReact Router DOM 7Client-side routingAxiosHTTP requestsViteBuild tool and dev serverCSS VariablesTheming and dark modeInter (Google Fonts)Typography
Backend
TechnologyPurposeNode.jsRuntime environmentExpress 5Web frameworkMongoDBDatabaseMongooseODM for MongoDBbcryptjsPassword hashingjsonwebtokenJWT authenticationdotenvEnvironment variable managementnodemonDevelopment auto-restart

Project Structure
team-task-manager/
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── adminMiddleware.js    # Role-based access guard
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Project.js            # Project schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Signup, login, user listing
│   │   ├── projectRoutes.js      # Project CRUD
│   │   └── taskRoutes.js         # Task CRUD + status update
│   ├── .env                      # Environment variables (not committed)
│   └── server.js                 # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx         # Sticky navigation with logout
    │   ├── pages/
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Signup.jsx         # Signup page
    │   │   ├── Dashboard.jsx      # Stats overview
    │   │   ├── Projects.jsx       # Project listing and creation
    │   │   └── Tasks.jsx          # Task listing, creation, status update
    │   ├── api.js                 # Centralized API base URL
    │   ├── App.jsx                # Routes and PrivateRoute guard
    │   ├── index.css              # Global styles and design tokens
    │   └── main.jsx               # React entry point
    ├── .env                       # Frontend env variables (not committed)
    └── vite.config.js
