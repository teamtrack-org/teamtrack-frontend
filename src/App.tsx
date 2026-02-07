import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="features" element={<div>Features Page Placeholder</div>} />
            <Route path="about" element={<div>About Page Placeholder</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
