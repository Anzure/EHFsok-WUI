import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Search from './views/Search.jsx';

function Routes(props) {
    return (
        <Router>
            <Switch>
                <Route path="/" strict exact>
                    <Search />
                </Route>
            </Switch>
        </Router>
    );
}

export default Routes;