# TeamTrack Frontend

A modern project management tool built with React, TypeScript, and Vite. This application interfaces with the TeamTrack Backend API.

## Features

- **Project Management**: Create, view, and manage projects.
- **Task Tracking**: Add tasks to projects and update their status (To Do, In Progress, Done).
- **Responsive Design**: Clean and modern UI using vanilla CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- TeamTrack Backend running on `http://localhost:8080`

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/teamtrack-org/teamtrack-frontend.git
    cd teamtrack-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── api/             # API client configuration
├── components/      # Reusable UI components
│   ├── layout/      # Layout components (Navbar, etc.)
│   ├── projects/    # Project-related components (Forms, etc.)
│   └── tasks/       # Task-related components
├── pages/           # Application pages (Home, Projects, Detail)
├── services/        # API service calls
├── types/           # TypeScript interfaces
└── App.tsx          # Main application entry
```

## Technologies

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

## Contributing

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'feat: Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request
