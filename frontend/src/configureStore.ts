import { connectRouter, routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createEpicMiddleware } from "redux-observable";
import { ApplicationState, rootEpic, rootReducer, RootAction } from "./store";

export default function configureStore(
  history: History,
  initialState: ApplicationState
): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, ApplicationState, void>();

  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
