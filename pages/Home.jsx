import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

const Home = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="container" style={{ maxWidth: '960px', marginTop: '4rem' }}>
      <h1>Welcome to Fi Insight</h1>
      <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
        Your personalized financial assistant — powered by AI and built for privacy, clarity, and control.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h3>💡 What can Fi Insight do?</h3>
        <ul>
          <li>Track your net worth, assets, and liabilities</li>
          <li>Ask natural questions like “Can I retire by 50?” or “How’s my SIP doing?”</li>
          <li>Simulate financial scenarios and get AI-driven projections</li>
          <li>Keep your data secure with Firebase authentication and full export control</li>
        </ul>
      </div>

      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
        {user ? (
          <Link to="/dashboard">
            <button>Go to Dashboard</button>
          </Link>
        ) : (
          <>
            <Link to="/signup">
              <button>Create an Account</button>
            </Link>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </>
        )}
        <Link to="/ask">
          <button style={{ backgroundColor: '#4CAF50', color: 'white' }}>Ask AI</button>
        </Link>
      </div>

      <footer style={{ marginTop: '4rem', fontSize: '0.9rem', color: '#888' }}>
        <p>
          Built with 🔐 Firebase + 🤖 Gemini + 💰 Fi’s MCP
        </p>
      </footer>
    </div>
  );
};

export default Home;
