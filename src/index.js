import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from 'screens/Login';
import Registration from 'screens/Registration';

import App from './App';

const queryClient = new QueryClient();

const Init = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/registrate" component={Registration} />
                    <Route path="/landing">
                        landing
                    </Route>
                    <Route path="*" component={App}/>
                </Switch>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

render(<Init />, document.getElementById("root"));
