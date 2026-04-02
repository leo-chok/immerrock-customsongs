import FireParticles from '../effects/FireParticles';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <FireParticles />
      <main className="main-content">
        {children}
      </main>
      <footer className="app-footer">
        <p>© 2026 Immerrock Custom Songs - Made by Leochok</p>
      </footer>
    </div>
  );
};

export default Layout;
