import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserFinancials } from '../../services/api';
import { auth } from '../../services/firebase';

const Financial = () => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const result = await getUserFinancials(user.uid);
        setData(result);
      } catch (err) {
        console.error(err);
        setError('Failed to load financial data.');
      }
    };

    fetchData();
  }, [user]);

  if (!user) {
    return <p style={{ marginTop: '2rem' }}>Please log in to view your financial summary.</p>;
  }

  if (error) {
    return <p style={{ color: 'red', marginTop: '2rem' }}>{error}</p>;
  }

  if (!data) {
    return <p style={{ marginTop: '2rem' }}>Loading your financial data...</p>;
  }

  const totalAssets = data.assets.reduce((sum, item) => sum + item.value, 0);
  const totalLiabilities = data.liabilities.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
      <h2>Financial Overview</h2>

      <div style={{ marginTop: '2rem' }}>
        <h3>Net Worth: ₹{data.netWorth.toLocaleString()}</h3>
        <h3>Credit Score: {data.creditScore}</h3>
      </div>

      <hr />

      <div style={{ marginTop: '2rem' }}>
        <h4>Assets</h4>
        <ul>
          {data.assets.map((item, index) => (
            <li key={index}>
              {item.name}: ₹{item.value.toLocaleString()}
            </li>
          ))}
        </ul>
        <strong>Total Assets: ₹{totalAssets.toLocaleString()}</strong>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h4>Liabilities</h4>
        <ul>
          {data.liabilities.map((item, index) => (
            <li key={index}>
              {item.name}: ₹{item.value.toLocaleString()}
            </li>
          ))}
        </ul>
        <strong>Total Liabilities: ₹{totalLiabilities.toLocaleString()}</strong>
      </div>
    </div>
  );
};

export default Financial;
