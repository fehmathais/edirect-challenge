import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import PanelPage from "./pages/panel";

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/panel" component={PanelPage} />
            </Switch>
        </Router>
    );
};

export default Routes;
