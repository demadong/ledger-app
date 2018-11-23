import { applyMiddleware, createStore } from 'redux';
import rootReducer from './rootReducer';
import logger from './middleware/logger';

import { composeWithDevTools } from 'redux-devtools-extension';

export default (initialState = {}) => {
  const middlewares = [ logger ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const composedEnhancers = composeWithDevTools(...[middlewareEnhancer]);

  return createStore(rootReducer, initialState, composedEnhancers);
}
