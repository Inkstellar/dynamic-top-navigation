import React from 'react';
import './style.css';
import Topmenu from './Topmenu';
import { Provider } from 'react-redux';
import store from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <Topmenu />
    </Provider>
  );
}
