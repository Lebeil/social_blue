import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//dev tools
import {composeWithDevTools} from "redux-devtools-extension";
import {logger} from "redux-logger/src";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
