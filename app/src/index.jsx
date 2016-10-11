import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import { Login } from 'login';
import { NotFound } from 'errors';

render((
<Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="*" component={NotFound} />
</Router>), document.getElementById('event-planner-application'));
