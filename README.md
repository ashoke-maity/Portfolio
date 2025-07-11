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
- Cloud Database MongoDB

## Customization

- Update personal information in the Home and About pages
- Modify the color scheme by editing Tailwind classes
- Add more admin features as needed
- Integrate with a backend API for production use
