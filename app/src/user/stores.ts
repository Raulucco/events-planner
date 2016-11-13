import { createStore } from 'react-redux';
import { Map } from 'immutable';

import { UserState } from './user-state';

interface BaseAction {
    type: string,
    payload: any;
}

export function login(state: Map<string, UserState>, action: BaseAction) {
    state.setIn(['user', 'username'], action.payload.username);
    state.setIn(['user', 'password'], action.payload.password);

    return state.setIn(['user', 'log'], true);
}


export function register(state: Map<string, UserState>, action: BaseAction) {
    state.setIn(['user', 'username'], action.payload.username);
    state.setIn(['user', 'password'], action.payload.password);
    state.setIn(['user', 'email'], action.payload.email);
    state.setIn(['user', 'bio'], action.payload.bio);

    return state.setIn(['user', 'log'], true);
}

export const loginStore = createStore(login);
export const registerStore = createStore(register);
