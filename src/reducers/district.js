import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';

export const initState = {
    cabinetList: []
}
import { UPDATE_CABINET_LIST } from '../lib/constants';

const cabinetListReducer = handleActions({
    UPDATE_CABINET_LIST: (state, action) => {
        return  action.payload;
    }
}, initState.cabinetList);

export default combineReducers({
    cabinetList: cabinetListReducer
})

