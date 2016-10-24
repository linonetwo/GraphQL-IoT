import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';
// import devTools from 'remote-redux-devtools';
import apolloClient from '../graphQL/REST2GraphQLInterface';

import reducer from '../reducers';

// const logger = createLogger();

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(thunk,
    apolloClient.middleware()
    // , logger
    )
  //   devTools({
  //     name: 'Power51', realtime: true, hostname: 'localhost', port: 5678,
  //   }),
  );

  const store = createStore(reducer, initialState, enhancer);
  // devTools.updateStore(store);

  return store;
}
