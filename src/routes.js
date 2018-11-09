import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Index from './component/page/index';
import Test from './component/page/test';
import Page404 from './component/page/page404';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/test" component={Test} />
            <Route component={Page404} />
        </Switch>
    </Router>
);

export default Routes;
