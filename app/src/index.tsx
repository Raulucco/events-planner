import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Login } from 'user/login';
import { CreateAccount } from 'user/create-account';
import { NotFound } from 'error-messages';
import { Events, CreateEvent, EditEvent } from 'event/index';
import { userReducers } from 'user/reducers';
import { eventReducers } from 'event/reducers';

const store = createStore(
    userReducers,
    eventReducers,
    applyMiddleware(store => next => action => {
        const state = store.getState();

        if (state.getIn(['user', 'log'])) {
            hashHistory.push('/events');
            return next(state);
        }

        return state;
    })
);

class Root extends React.Component<any, any> {
    public render() {
        return (<div className="welcome">
        <h1>Welcome to the event planner application.</h1>
        <p>
            To begin <a href="#/create-account" title="create a new account">create an account </a>
             or <a href="#/login" title="login" >login</a> if you already have an account.
              </p>
        </div>);
    }
}

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Root}/>
            <Route path="/login" component={Login} />
            <Route path="/create-account" component={CreateAccount} />
            <Route path="/events" component={Events} >
                <Route path="/create" component={CreateEvent} />
                <Route path="/edit/*" component={EditEvent} />
            </Route>
            <Route path="/*" component={NotFound} />
        </Router>
</Provider>), document.getElementById('app'));
