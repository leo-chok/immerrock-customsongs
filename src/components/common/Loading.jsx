import { useState, useEffect } from 'react';
import './Loading.css';

const Loading = () => {
  const [slowLoading, setSlowLoading] = useState(false);

  useEffect(() => {
    // If it takes more than 3 seconds (e.g. database or backend cold start / wake-up)
    const timer = setTimeout(() => {
      setSlowLoading(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-container">
      <div className="loading-flame-wrapper">
        <div className="flame-glow-effect"></div>
        <img 
          src="/mediator.png" 
          alt="Loading..." 
          className="loading-mediator"
        />
      </div>
      <p className="loading-text">
        Loading
        <span className="loading-dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      </p>
      {slowLoading && (
        <p className="loading-subtext">
          Waking up database, please hold on...
        </p>
      )}
    </div>
  );
};

export default Loading;
