import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserNetWorth } from '../../services/api';
import { auth } from '../../services/firebase';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const NetWorth = () => {
  const [user] = useAuthState(auth);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      try {
        const data = await getUserNetWorth(user.uid);
        setHistory(data);
      } catch (err) {
        console.error(err);
        setError('Could not load net worth history.');
      }
    };

    loadData();
  }, [user]);

  if (!user) return <p>Please log in to view your net worth.</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!history.length) return <p>Loading net worth data...</p>;

  const labels = history.map((item) => item.date);
  const values = history.map((item) => item.value);

  const growth =
    values.length >= 2
      ? ((values[values.length - 1] - values[0]) / values[0]) * 100
      : 0;

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Net Worth (₹)',
        data: values,
        fill: false,
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return '₹' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
      <h2>Net Worth Over Time</h2>
      <Line data={chartData} options={chartOptions} />

      <div style={{ marginTop: '2rem' }}>
        <strong>Latest Net Worth: ₹{values[values.length - 1].toLocaleString()}</strong>
        <br />
        <strong>Growth: {growth.toFixed(2)}%</strong>
      </div>
    </div>
  );
};

export default NetWorth;
