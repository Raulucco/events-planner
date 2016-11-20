import { assign } from 'lodash';
import { combineReducers } from 'react-redux';

function getEvents(state: any) {
    return state.getIn(['events']).toJS();
}

function createEvent(state: any, action: any) {
    const events = <any[]>getEvents(state);
    events.push(action.payload.event);
    return state.setIn(['events' ], events);
}

function deleteEvent(state: any, action: any) {
    const events = <any[]>getEvents(state);
    return state.setIn(['events'], events.filter(event => event.id !== action.payload.event.id));
}

function editEvent(state: any, action: any) {
    const events = <any[]>getEvents(state).map((event: { id: number|string }) => {
        if (event.id === action.payload.event.id) {
            return assign(event, action.payload.event);
        }

        return event;
    });

    return state;
}

export const eventReducers = combineReducers(createEvent, deleteEvent, editEvent);
