
import { SongsProvider } from './contexts/SongsContext';
import { ToastProvider } from './components/common/ToastProvider';
import './components/common/ToastProvider.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <ToastProvider>
      <SongsProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Layout>
        </Router>
      </SongsProvider>
    </ToastProvider>
  );
}

export default App;

