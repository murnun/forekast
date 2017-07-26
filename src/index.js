import 'bootstrap/dist/css/bootstrap.css';
import './styles/css/owfont-regular.min.css';
import './styles/css/App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { store } from "./store.js";
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
