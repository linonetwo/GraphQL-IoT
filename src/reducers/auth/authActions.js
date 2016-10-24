import Promise from 'bluebird';

import { Actions } from 'react-native-router-flux';

const {
  LOGOUT,
  LOGIN,

  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  SESSION_TOKEN_REQUEST,
  SESSION_TOKEN_SUCCESS,
  SESSION_TOKEN_FAILURE,

  DELETE_TOKEN_REQUEST,
  DELETE_TOKEN_SUCCESS,

} = require('../../lib/constants').default;


const AppAuthToken = require('../../lib/AppAuthToken').default;

export function logoutState() {
  return {
    type: LOGOUT,
  };
}
export function loginState() {
  return {
    type: LOGIN,
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}
export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
}

export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}
export function loginSuccess(json) {
  return {
    type: LOGIN_SUCCESS,
    payload: json,
  };
}
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

export function sessionTokenRequest() {
  return {
    type: SESSION_TOKEN_REQUEST,
  };
}
export function sessionTokenRequestSuccess(token) {
  return {
    type: SESSION_TOKEN_SUCCESS,
    payload: token,
  };
}
export function sessionTokenRequestFailure(error) {
  return {
    type: SESSION_TOKEN_FAILURE,
    payload: typeof error === 'undefined' ? null : error,
  };
}

export function deleteTokenRequest() {
  return {
    type: DELETE_TOKEN_REQUEST,
  };
}
export function deleteTokenRequestSuccess() {
  return {
    type: DELETE_TOKEN_SUCCESS,
  };
}

export function deleteSessionToken() {
  return dispatch => {
    dispatch(deleteTokenRequest());
    return new AppAuthToken().deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess());
      });
  };
}
export function getSessionToken() {
  return dispatch => {
    dispatch(sessionTokenRequest());

    return new AppAuthToken().getSessionToken()
      .then((token) => {
        if (token) {
          dispatch(sessionTokenRequestSuccess(token.sessionToken));
          dispatch(logoutState());
        } else {
          dispatch(sessionTokenRequestFailure());
        }
      })

      .catch((error) => {
        dispatch(sessionTokenRequestFailure(error));
        dispatch(loginState());
        Actions.Login();
      });
  };
}

export function saveSessionToken(json) {
  new AppAuthToken().storeSessionToken(json);
  return json;
}

export function login(username, password) {
  return dispatch => {
    dispatch(loginRequest());
    return Mapi.login({
      username,
      password,
    })
    .then(json => json.data.code === -1 ? Promise.reject(json.data.message) : saveSessionToken(json.data))
    .then(json => {
      dispatch(loginSuccess(json.data));
      // 去首页
      Actions.Main();
      dispatch(logoutState());
    })
    .catch((error) => {
      dispatch(loginFailure(error));
    });
  };
}

export function logout() {
  return dispatch => {
    dispatch(logoutRequest());
    return Promise.try(() =>
      Mapi.logout()
    )
    .then(() => {
      dispatch(loginState());
      dispatch(logoutSuccess());
      Actions.Login();
    })
    .catch((error) => {
      dispatch(loginState());
      dispatch(logoutFailure(error));
    });
  };
}
