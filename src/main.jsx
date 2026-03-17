import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer  from './components/Pakclassified/redux/slices/userSlice.js';
import adsReducer from './components/Pakclassified/redux/slices/adSlice.js';
import categoriesReducer from './components/Pakclassified/redux/slices/categorySlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
    ads: adsReducer,
    categories: categoriesReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
