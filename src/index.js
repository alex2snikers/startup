import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';
function App() {
  
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/landing">landing</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </nav>
        
      <Switch>
        <Route exact path="/login">
          Login
        </Route>
        <Route path="/landing">
          landing
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById("root"));
