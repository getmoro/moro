import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Login } from './pages';
import { Theme } from './Theme';

export const App: FC = () => (
  <Theme>
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  </Theme>
);
