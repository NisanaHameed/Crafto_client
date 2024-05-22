import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'
import store from './Store/Store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_Client_id} >
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
)
