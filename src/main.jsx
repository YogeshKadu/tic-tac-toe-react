import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { UserProvider } from './context/user.context.jsx';
import { PeerProvider } from './context/peer.context.jsx';
import { Toaster } from 'react-hot-toast';
import RequestModal from './components/RequestModal.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PeerProvider>
        <App />
        <Toaster position='bottom-center' />
        <RequestModal />
      </PeerProvider>
    </BrowserRouter>
  </StrictMode>,
)
