import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import Home from './pages/home'

export default function AppRouter() {
    return (
        <Router basename="/Portfolio">
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/home" element={<Home />}></Route>
            </Routes>
        </Router>
    );
}