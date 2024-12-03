import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { store } from './redux/store';

import './App.css';
import { ErrorBoundary } from './pages/loginFolder/ErrorBoundry';
import ChangePasswordModal from './Components/ChangePasswordModal';



ReactDOM.render(
  <Provider store={store}>
    < BrowserRouter >
      <HashRouter>

        <ErrorBoundary>
          <div className="red_overlay">
            <App />
          </div>
        </ErrorBoundary>
      </HashRouter>
    </BrowserRouter >
  </Provider >
  ,
  document.getElementById("root")
);
reportWebVitals();
