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
import withSession from './components/withSession';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        }) 
    },
    onError: ({ networkError }) => {
        if(networkError) {
            console.log('Network Error', networkError);
        }
    }
});

const Root = ({ refetch }) => (
    <Router>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/login" render={() => <Login refetch={refetch} />} />
            <Route path="/signup" render={() => <Signup refetch={refetch} />} />
            <Redirect to="/" />
        </Switch>
    </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>, 
    document.getElementById('root')
);
