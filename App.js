import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { auth } from './services/firebase';

// Layout
import Navbar from './components/Layout/Navbar';

// Auth
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

// Pages
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

// Dashboard Components (for direct route access if needed)
import AskAI from './components/Dashboard/AsKAI';
import NetWorth from './components/Dashboard/NetWorthChart';

// Optional UI (add if you want)
const Loading = () => <p style={{ padding: '2rem' }}>Loading...</p>;

function App() {
  const [user, loading] = useAuthState(auth);

  const PrivateRoute = ({ children }) => {
    if (loading) return <Loading />;
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ask"
          element={
            <PrivateRoute>
              <AskAI />
            </PrivateRoute>
          }
        />
        <Route
          path="/networth"
          element={
            <PrivateRoute>
              <NetWorth />
            </PrivateRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
