import React from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router, 
    Redirect,
    Route, 
    Switch 
} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './components/App';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql'
});

const Root = () => (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/" />
        </Switch>
    </Router>
);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>, 
    document.getElementById('root')
);
