
const { Record } = require('immutable');
const {
  REGISTER,
} = require('../../lib/constants').default;

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  state: REGISTER,
  disabled: false,
  error: null,
  isValid: false,
  isFetching: false,
  token: null,
  fields: new (Record({
    username: '',
    usernameHasError: false,
    password: '',
    passwordHasError: false,
  })),
});

/**
 * ## InitialState
 * The form is set
 */
const InitialState = Record({
  form: new Form(),
});
export default InitialState;
