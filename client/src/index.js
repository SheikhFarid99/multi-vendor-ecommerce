import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <Toaster toastOptions={{
      position: 'top-right',
      style: {
        background: 'white',
        color: 'black'
      }
    }} />
  </Provider>
);

reportWebVitals();
