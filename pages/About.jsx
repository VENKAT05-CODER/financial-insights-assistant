
const About = () => {
  return (
    <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
      <h2>About Fi Insight</h2>

      <p style={{ marginTop: '1.5rem' }}>
        <strong>Fi Insight</strong> is your personalized financial assistant powered by AI. We help you make smarter
        financial decisions by analyzing your assets, liabilities, net worth, credit score, and investment strategies
        — all in real-time.
      </p>

      <h3 style={{ marginTop: '2rem' }}>🔒 Privacy-First</h3>
      <p>
        Your data is yours. We don’t share or sell it — and we use secure cloud storage (via Firebase) to ensure
        everything is protected. Export your insights anytime, or delete your account completely.
      </p>

      <h3 style={{ marginTop: '2rem' }}>🤖 Built on AI + Fi’s MCP</h3>
      <p>
        Using Google Gemini and Fi’s MCP (Money Control Protocol), our system can answer questions like:
        <ul>
          <li>"How’s my net worth trending?"</li>
          <li>"What happens if I increase my SIP by ₹5,000?"</li>
          <li>"Can I afford a ₹50L home loan?"</li>
        </ul>
      </p>

      <h3 style={{ marginTop: '2rem' }}>🚀 Future-Proof Finance</h3>
      <p>
        Whether you're planning early retirement, debt optimization, or anomaly detection, Fi Insight evolves with you.
        Our AI can simulate scenarios, suggest investment moves, and help you project your financial life 10–20 years
        into the future.
      </p>

      <p style={{ marginTop: '2rem' }}>
        <strong>Fi Insight</strong> is where AI meets your money — securely, intelligently, and personally.
      </p>
    </div>
  );
};

export default About;
