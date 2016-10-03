import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Login } from './login';
import { NotFound } from './errors';

render((
<Router>
    <Route path="/" component="{Login}"/>
    <Route path="*" component={NotFound} />
</Router>), document.getElementById('app'));
