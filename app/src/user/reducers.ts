import { combineReducers } from 'react-redux';
import { Map } from 'immutable';

import { UserState } from './user-state';

interface BaseAction {
    type: string;
    payload: any;
}

function log(state: Map<string, UserState>) {
    return state.setIn(['user', 'log'], true);
}

export function login(state: Map<string, UserState>, action: BaseAction) {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user.username !== action.payload.username ||
        user.password !== action.payload.password
    ) {
        return state;
    }

    state.setIn(['user', 'username'], action.payload.username);
    state.setIn(['user', 'password'], action.payload.password);

    return log(state);
}


export function register(state: Map<string, UserState>, action: BaseAction) {
    state.setIn(['user', 'username'], action.payload.username);
    state.setIn(['user', 'password'], action.payload.password);
    state.setIn(['user', 'email'], action.payload.email);
    state.setIn(['user', 'bio'], action.payload.bio);

    sessionStorage.setItem('user', JSON.stringify({ user: state.get('user').toJS() }));

    return log(state);
}

// export const loginStore = createStore(login);
// export const registerStore = createStore(register);

export const userReducers = combineReducers(login, register);
