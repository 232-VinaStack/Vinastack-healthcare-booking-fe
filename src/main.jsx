import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={{ token: { colorPrimary: '#2297be' } }}>
      <Provider store={store}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ClerkProvider>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
);
