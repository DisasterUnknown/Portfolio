import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import Home from './pages/home'

export default function AppRouter() {
    return (
        <Router basename="/Portfolio">
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/home" element={<Home />}></Route>
            </Routes>
        </Router>
    );
}