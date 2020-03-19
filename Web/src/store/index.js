import { applyMiddleware, compose, createStore } from "redux";
import reducers from "../reducers/index";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/index";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routeMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saveToSessionStorage = state => {
  try {
    const newState = Object.assign(
      {},
      { auth: state.auth, workflow: state.workflow }
    );
    const serializedState = JSON.stringify(newState);
    sessionStorage.setItem("state", serializedState);
  } catch (e) {}
};

const loadFromSessionStorage = state => {
  try {
    const serializedState = sessionStorage.getItem("state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {}
};

export default function configureStore(initialState) {
  const persistedState = loadFromSessionStorage();

  const store = createStore(
    reducers(history),
    persistedState,

    composeEnhancers(applyMiddleware(...middlewares))
  );

  store.subscribe(() => saveToSessionStorage(store.getState()));

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/index", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
export { history };
