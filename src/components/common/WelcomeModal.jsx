import { useState, useEffect } from "react";
import "./WelcomeModal.css";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Vérifier si c'est la première visite
    const hasVisited = localStorage.getItem("hasVisitedImmerock");

    if (!hasVisited) {
      // Petit délai pour l'animation d'entrée
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Marquer que l'utilisateur a visité le site
    localStorage.setItem("hasVisitedImmerock", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-modal-overlay" onClick={handleClose}>
      <div
        className="welcome-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        

        <div className="welcome-modal-header">
          <h2>Welcome!</h2>
        </div>

        <div className="welcome-modal-body">
          <p>
            Welcome to the ultimate spot to find and master your favorite songs!
          </p>
          <p>
            Here you can browse our community-created library. If you can't find
            a song you're looking for, feel free to join our <a href="https://discord.com/invite/SP4tumnEx6" target="_blank" rel="noopener noreferrer">Discord</a> to make a
            request.
          </p>
          <p>
            For our talented creators, thank you for contributing! Please use
            the form below to share your custom songs with the community.
          </p>
        </div>

        <div className="welcome-modal-footer">
          <button className="welcome-modal-button" onClick={handleClose}>
            Let's Rock! 🔥
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
