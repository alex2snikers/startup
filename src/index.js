import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from 'screens/Login';
import Registration from 'screens/Registration';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registrate">
          <Registration />
        </Route>
        <Route path="/landing">
          landing
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("root"));
