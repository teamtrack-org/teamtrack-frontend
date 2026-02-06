import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="features" element={<div>Features Page Placeholder</div>} />
          <Route path="about" element={<div>About Page Placeholder</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
