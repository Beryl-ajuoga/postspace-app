import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App.js';
import FollowingPage from './FollowingPage';



const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/following" component={FollowingPage} />
      </Switch>
    </Router>
  );
};

export default Routes;
