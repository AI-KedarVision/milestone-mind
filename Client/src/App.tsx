import { useEffect, useState } from 'react';
import './App.css';

type HealthResponse = {
  status: string;
  message: string;
};

function App() {
  const [apiStatus, setApiStatus] = useState('Checking...');
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Backend request failed');
        }
        return (await response.json()) as HealthResponse;
      })
      .then((data) => {
        setApiStatus(data.status === 'success' ? 'Connected' : 'Unavailable');
        setApiMessage(data.message);
      })
      .catch(() => {
        setApiStatus('Disconnected');
        setApiMessage('Could not connect to the backend.');
      });
  }, []);

  return (
    <main className="dashboard">
      <header className="topbar">
        <a className="brand" href="/">MilestoneMind</a>
        <span className="status">
          <span className={`status-dot ${apiStatus === 'Connected' ? 'online' : ''}`} />
          API: {apiStatus}
        </span>
      </header>

      <section className="hero">
        <p className="eyebrow">YOUR GOALS, WITH A PLAN</p>
        <h1>Turn big ambitions into <span>small wins.</span></h1>
        <p className="subtitle">
          Plan your milestones, track your progress, and keep moving forward
          with a clearer path to your goals.
        </p>
        <div className="hero-actions">
          <button onClick={() => document.getElementById('milestones')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore your workspace
          </button>
          <span className="api-message">{apiMessage}</span>
        </div>
      </section>

      <section className="overview" id="milestones">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h2>Milestone overview</h2>
          </div>
          <span className="coming-soon">Workspace setup</span>
        </div>

        <div className="cards">
          <article className="metric-card">
            <span className="card-icon">◎</span>
            <p className="metric-label">Total milestones</p>
            <h3>—</h3>
            <p className="metric-note">Ready to be added</p>
          </article>

          <article className="metric-card">
            <span className="card-icon">◷</span>
            <p className="metric-label">In progress</p>
            <h3>—</h3>
            <p className="metric-note">Your active goals</p>
          </article>

          <article className="metric-card">
            <span className="card-icon">✓</span>
            <p className="metric-label">Completed</p>
            <h3>—</h3>
            <p className="metric-note">Celebrate every win</p>
          </article>
        </div>

        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <h3>Your next milestone starts here</h3>
          <p>
            Your dashboard is ready. Next, we'll connect Supabase and build
            the functionality to create and track real milestones.
          </p>
        </div>
      </section>

      <footer>MilestoneMind · Make progress measurable.</footer>
    </main>
  );
}

export default App;