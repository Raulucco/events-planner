import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';

render((
<Router history="browserHistory">
    <Route path="/" component="{Login}"/>
</Router>), document.getElementById('app'));
