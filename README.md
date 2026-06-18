# Habit Tracker Frontend

A modern, responsive React application for tracking daily habits and building positive behavioral patterns. Built with React, Vite, and connected to a Supabase backend for data persistence and authentication.

## 🎯 Features

- **Track Habits**: Create, monitor, and manage daily habits
- **Dashboard**: Visual overview of habit completion status
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Real-time Sync**: Data syncs automatically with Supabase backend
- **User Authentication**: Secure sign-in with Supabase

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Build Tool**: Vite (with HMR for fast development)
- **Backend**: Supabase (PostgreSQL)
- **Styling**: CSS
- **API Communication**: REST API with CORS support
- **Linting**: ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AngelinaMaryGeorge/habit-tracker-frontend.git
cd habit-tracker-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Use PORT 5000 of the backend of the Habit Tracker
```
http://localhost:5000
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

### 6. Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/         # Reusable React components
├── pages/             # Page-level components
│   ├── Dashboard.jsx  # Main dashboard view
│   └── HabitForm.jsx  # Habit creation/editing form
├── services/
│   └── api.js         # API calls to Supabase backend
├── assets/            # Static assets (images, fonts)
├── styles/            # Global and component styles
├── App.jsx            # Root component
├── main.jsx           # Entry point
├── App.css            # App-level styles
└── index.css          # Global styles
```

## 🔗 Backend Integration

This frontend connects to a Supabase backend. Make sure to:

1. **Enable CORS** on your backend to allow requests from `http://localhost:5173` (development) and your production domain
2. **Set up Supabase tables** for:
   - Users (handled by Supabase Auth)
   - Habits (custom table)
   - Habit logs/completions (custom table)

3. **API Endpoints** expected:
   - `GET /api/habits` - Fetch user habits
   - `POST /api/habits` - Create new habit
   - `PUT /api/habits/:id` - Update habit
   - `DELETE /api/habits/:id` - Delete habit
   - `POST /api/habit-logs` - Log habit completion


---

