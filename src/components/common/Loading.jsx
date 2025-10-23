import './Loading.css';

const Loading = () => {
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
    </div>
  );
};

export default Loading;
