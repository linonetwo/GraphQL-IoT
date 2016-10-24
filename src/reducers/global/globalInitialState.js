import { Record } from 'immutable';

const InitialState = Record({
  currentUser: null,
  showState: false,
  currentState: null,
  store: null,
  selectDistrict: null,
});
export default InitialState;
