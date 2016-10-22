import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Login } from 'planner/login';
import { NotFound } from 'planner/errors';

render((
<Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="*" component={NotFound} />
</Router>), document.getElementById('event-planner-application'));
