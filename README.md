# Micheal Makuei Lueth Foundation (MMLF) Website

Welcome to the repository for the MMLF Website. This project is structured as a modern web application, divided into a frontend React interface and a powerful backend Laravel API with an administrative panel.

## Architecture

The project consists of three main directories:
- `frontend/`: The user-facing application built with React, Vite, and TailwindCSS.
- `backend/`: The Laravel REST API and a Filament-powered administrative panel for managing the site.
- `backend-stubs/`: Development stubs and configuration examples.

## Tech Stack

### Frontend
- **Framework:** React (v19)
- **Build Tool:** Vite
- **Styling:** TailwindCSS (v4)
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Framework:** Laravel (v12)
- **Admin Panel:** Filament (v3.3)
- **Authentication:** Laravel Sanctum
- **Database:** SQLite (default for development)
- **Requirements:** PHP 8.2+

## Prerequisites

To run this project locally, make sure you have the following installed:
- Node.js (v18 or higher)
- npm (Node Package Manager)
- PHP (v8.2 or higher)
- Composer

---

## Getting Started

### 1. Backend Setup

Navigate to the `backend` directory:
```bash
cd backend
```

Install PHP dependencies:
```bash
composer install
```

Set up your environment variables:
```bash
cp .env.example .env
php artisan key:generate
```

Run database migrations:
```bash
php artisan migrate
```

Start the backend server:
```bash
php artisan serve
```
The API and Filament Admin panel will now be running (usually at `http://localhost:8000`).

*(Optional)* Create an admin user for the Filament dashboard:
```bash
php artisan make:filament-user
```

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
```

Install Node dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend will now be running (usually at `http://localhost:5173`).

---

## Development Workflow

While developing, you will generally need two terminals open:
1. One running `php artisan serve` in the `backend` folder.
2. One running `npm run dev` in the `frontend` folder.

All API requests from the frontend should be directed to the backend's API routes (e.g., `http://localhost:8000/api/...`).
