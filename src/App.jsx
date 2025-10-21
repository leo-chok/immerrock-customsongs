import { SongsProvider } from './contexts/SongsContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import './App.css';

function App() {
  return (
    <SongsProvider>
      <Layout>
        <Home />
      </Layout>
    </SongsProvider>
  );
}

export default App;

