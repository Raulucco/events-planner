import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Login } from 'user/login';
import { CreateAccount } from 'user/create-account';
import { NotFound } from 'error-messages';

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
<Router history={hashHistory}>
    <Route path="/" component={Root}/>
    <Route path="/login" component={Login}/>
    <Route path="/create-account" component={CreateAccount} />
    <Route path="/*" component={NotFound} />
</Router>), document.getElementById('app'));
