import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { askGemini } from '../../services/api'; // unified call
import { auth } from '../../services/firebase';

const AskAI = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user] = useAuthState(auth); // Firebase user

  const handleAsk = async (e) => {
    e.preventDefault();
    setError('');
    setResponse('');
    setLoading(true);

    if (!user) {
      setError('You must be logged in to ask questions.');
      setLoading(false);
      return;
    }

    const finalPrompt = `User: ${user.email}\nQuestion: ${question}`;

    try {
      const result = await askGemini(finalPrompt);
      setResponse(result);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch response from Gemini.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '720px', marginTop: '4rem' }}>
      <h2>Fi Insight: Ask the AI</h2>
      <form onSubmit={handleAsk}>
        <label htmlFor="question">Ask your question</label>
        <textarea
          id="question"
          rows="3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Can I afford a ₹50L home loan by 2030?"
          required
        ></textarea>

        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Thinking…' : 'Ask AI'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {response && (
        <div
          style={{
            background: '#f6f6f6',
            marginTop: '2rem',
            padding: '1rem',
            borderRadius: '8px',
            whiteSpace: 'pre-line',
          }}
        >
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AskAI;
