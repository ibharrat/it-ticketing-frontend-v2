import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard'
import ITDashboard from './pages/ITDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userdash" element={<UserDashboard />} />
        <Route path="/itdash" element={<ITDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;