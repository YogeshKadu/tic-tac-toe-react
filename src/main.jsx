import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './context/user.context.jsx'
import { Toaster } from 'react-hot-toast'
import RequestModal from './components/RequestModal.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
        <Toaster position='bottom-center' />
        <RequestModal />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
