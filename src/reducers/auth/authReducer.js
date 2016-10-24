const InitialState = require('./authInitialState').default;
const formValidation = require('./authFormValidation').default;

/**
 * ## Auth actions
 */
const {
  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

  LOGOUT,
  LOGIN,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} = require('../../lib/constants').default;

const initialState = new InitialState();
/**
 * ## authReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function authReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);

  switch (action.type) {

    case SESSION_TOKEN_REQUEST:
    case LOGOUT_REQUEST:
    case LOGIN_REQUEST: {
      const nextState = state.setIn(['form', 'isFetching'], true)
      .setIn(['form', 'error'], null);
      return nextState;
    }

    case LOGOUT:
      return formValidation(
      state.setIn(['form', 'state'], action.type)
        .setIn(['form', 'error'], null)
    );

    case LOGIN:
      return formValidation(
      state.setIn(['form', 'state'], action.type)
        .setIn(['form', 'error'], null)
    );

    case LOGIN_SUCCESS:
    case SESSION_TOKEN_SUCCESS:
      return state.setIn(['form', 'token'], action.payload.token)
              .setIn(['form', 'isFetching'], false);

    case SESSION_TOKEN_FAILURE:
    case LOGOUT_SUCCESS:
      return state.setIn(['form', 'token'], 'notoken')
              .setIn(['form', 'isFetching'], false);

    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
      return state.setIn(['form', 'isFetching'], false)
      .setIn(['form', 'error'], action.payload);

    case DELETE_TOKEN_REQUEST:
    case DELETE_TOKEN_SUCCESS:
      return state;

    default:
      return state;
  }
}
