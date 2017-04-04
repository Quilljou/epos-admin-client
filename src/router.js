import React from 'react';
import { Router, Route, IndexRoute, hashHistory,IndexRedirect } from 'dva/router';
import App from './routes/App';
import Dashboard from './routes/Dashboard'
import Android from './routes/Android';
import Version from './routes/Version'
import Tenant from './routes/Tenant'
import Login from './routes/Login'
import Auth from './utils/auth';
import NotFound from './routes/NotFound'
import Log from './routes/Log'



function requireAuth ({ params }, replace) {
    console.log(Auth.isLoggedIn());
    if(!Auth.isLoggedIn()) {
        replace('/login');
    }
}

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route path="/login" component={ Login }></Route>
            <Route path="/" component={ App }>
                {/* <IndexRoute component={ Dashboard } /> */}
                <IndexRedirect to="/tenant" ></IndexRedirect>

                <Route path="/tenant" component={Tenant} onEnter={requireAuth}></Route>
                <Route path="/android" component={Android} onEnter={requireAuth}></Route>
                <Route path="/version/:id" component={Version} onEnter={requireAuth}></Route>
                <Route path="/log" component={Log} onEnter={requireAuth}></Route>

            </Route>
            <Route path="*" component={NotFound}></Route>
        </Router>
    )
}

export default RouterConfig
