import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux/es/exports';
import { store, persistor } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import './firebaseConfig.js'

import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/MovieSearch/'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
