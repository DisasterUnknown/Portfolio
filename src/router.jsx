import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './pages/home';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
