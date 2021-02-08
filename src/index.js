import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from 'screens/Login';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/landing">
          landing
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("root"));
