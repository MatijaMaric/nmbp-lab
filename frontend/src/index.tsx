import * as React from "react";
import * as ReactDOM from "react-dom";

import { ConnectedRouter } from "connected-react-router";
import { createHashHistory } from "history";
import { Provider } from "react-redux";

import configureStore from "./configureStore";
import Routes from "./routes";

import './index.css';
import 'node_modules/highlight.js/styles/atelier-lakeside-light.css';
import 'node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import 'node_modules/@blueprintjs/core/lib/css/blueprint.css';
import 'node_modules/@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import 'node_modules/@blueprintjs/table/lib/css/table.css';

const history = createHashHistory();
const initialState = window.initialReduxState;

const store = configureStore(history, initialState);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
