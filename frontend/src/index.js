import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import './index.css';

let store = configureStore({});

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);