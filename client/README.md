# Portfolio Website

A professional portfolio website built with React, Tailwind CSS, and React Router.

## Features

- **Multi-page Portfolio**: Home, About, Projects, and Contact pages
- **Admin Panel**: Protected admin portal for managing projects and tracking visitors
- **Authentication System**: Secure login/register for admin access
- **Project Management**: Add, delete, and manage portfolio projects
- **Visitor Tracking**: Track and display visitor count
- **Responsive Design**: Modern, mobile-friendly interface
- **Dark Theme**: Sleek dark theme with blue accents

## Admin Authentication

The admin panel is protected with a secure authentication system:

### First Time Setup
1. Navigate to `/register` to create your admin account
2. Fill in your name, email, and password (minimum 6 characters)
3. You'll be redirected to the login page after successful registration

### Login
1. Navigate to `/login` to access the admin panel
2. Enter your registered email and password
3. You'll be redirected to the admin dashboard upon successful login

### Admin Features
- **Dashboard**: View visitor statistics and recent projects
- **Project Management**: Add new projects with thumbnails, technologies, and features
- **Logout**: Secure logout functionality

### Security
- Admin credentials are stored in localStorage (for demo purposes)
- Protected routes prevent unauthorized access
- Session management with automatic logout

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Admin.jsx
│   ├── Login.jsx
│   └── Register.jsx
└── routes/
    └── App.jsx
```

## Technologies Used

- React 18
- React Router v6
- Tailwind CSS
- Vite
- LocalStorage for data persistence

## Customization

- Update personal information in the Home and About pages
- Modify the color scheme by editing Tailwind classes
- Add more admin features as needed
- Integrate with a backend API for production use
