import * as React from "react";
import * as ReactDOM from "react-dom";

import { ConnectedRouter } from "connected-react-router";
import { createHashHistory } from "history";
import { Provider } from "react-redux";

import configureStore from "./configureStore";
import Routes from "./routes";

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
