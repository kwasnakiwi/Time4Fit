import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LocationProvider } from './utils/LocationContext.jsx'
import { UserProvider } from './utils/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </UserProvider>
  </StrictMode>,
)
