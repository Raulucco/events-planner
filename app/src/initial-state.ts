import { Map } from 'immutable';

export const initialState = Map({
    user: {},
    events: {
        actuals: [],
        previous: []
    }
});
