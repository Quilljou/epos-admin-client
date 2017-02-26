import React from 'react';
import { Router, Route, IndexRoute, history } from 'dva/router';
import App from './routes/App';
import Dashboard from './routes/Dashboard'
import Android from './routes/Android'
import Tenant from './routes/Tenant'


function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route path="/" component={ App }>
                <IndexRoute component={ Dashboard } />

                <Route path="tenant" component={Tenant}></Route>
                <Route path="android" component={Android}></Route>

            </Route>
        </Router>
    )
}

export default RouterConfig
