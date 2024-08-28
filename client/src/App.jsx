import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} />
                <Route path="/video" element={<ProtectedRoute element={<Home />} />} />
                <Route path="/about" element={<ProtectedRoute element={<About />} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
