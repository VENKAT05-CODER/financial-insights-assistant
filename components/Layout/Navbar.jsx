import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase';



const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        backgroundColor: '#f4f4f4',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Link to="/" style={{ fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none' }}>
        Fi Insight
      </Link>

      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0 }}>
        {user ? (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/ask">Ask AI</Link>
            </li>
            <li>
              <Link to="/networth">Net Worth</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
