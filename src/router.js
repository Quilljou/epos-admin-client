import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'dva/router';
import App from './routes/App';
import Dashboard from './routes/Dashboard'
import Android from './routes/Android'
import Tenant from './routes/Tenant'
import Login from './routes/Login'
import Auth from './utils/auth';



function requireAuth ({ params }, replace) {
    if(!Auth.isLoggedIn()) {
        replace('/login');
    }
}

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route path="/login" component={ Login }></Route>
            <Route path="/" component={ App } onEnter={requireAuth}>
                {/* <IndexRoute component={ Dashboard } /> */}
                <IndexRoute component={Tenant}></IndexRoute>

                <Route path="/tenant" component={Tenant} onEnter={requireAuth}></Route>
                <Route path="/android" component={Android} onEnter={requireAuth}></Route>
            </Route>
        </Router>
    )
}

export default RouterConfig
