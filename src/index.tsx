import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Middleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import App from './components/app/App';
import './index.css';
import { rootReducer } from './reducers';
import registerServiceWorker from './registerServiceWorker';
 
const middleware: Middleware[] = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    collapsed: true
  });
  
  middleware.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
