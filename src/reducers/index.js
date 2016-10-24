import { combineReducers } from 'redux';

import device from './device/deviceReducer';
import global from './global/globalReducer';

import districtReducer from './district';

import apolloClient from '../graphQL/REST2GraphQLInterface';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  device,
  global,
  apollo: apolloClient.reducer(),
  district: districtReducer,
});

export default rootReducer;
