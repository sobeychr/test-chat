import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './component/element/header';
import Api from './component/page/Api';
import Index from './component/page/index';
import Page404 from './component/page/page404';

const Routes = () => (
    <Router>
        <div>
            <Header/>
            
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/api" component={Api} />
                <Route component={Page404} />
            </Switch>
        </div>
    </Router>
);

export default Routes;
