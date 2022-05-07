import React from "react";
import ReactDOM from "react-dom";
import "./app/scss/index.scss";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { Router } from "react-router-dom";
import history from "./app/utils/history";
import { Provider } from "react-redux";
import { createStore } from "./app/store/createStore";

const store = createStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
reportWebVitals();
