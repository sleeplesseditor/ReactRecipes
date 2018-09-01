import React from 'react';
import { Mutation } from 'react-apollo'; 
import { SIGNUP_USER } from '../../queries';

class Signup extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event, signUpUser) => {
        event.preventDefault();
        signUpUser().then(data => {
            console.log(data);
        });
    };

    render() {
        const { username, email, password, passwordConfirmation } = this.state;

        return (
            <div className="App">
                <h2 className="App">Sign Up</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
                    {( signUpUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, signUpUser)}>
                                <input 
                                    type="text" 
                                    name="username"
                                    placeholder="Username"
                                    value={username} 
                                    onChange={this.handleChange}
                                />
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="Email Address"
                                    value={email}  
                                    onChange={this.handleChange}
                                />
                                <input 
                                    type="password" 
                                    name="password"
                                    placeholder="Password"
                                    value={password} 
                                    onChange={this.handleChange} 
                                />
                                <input 
                                    type="password" 
                                    name="passwordConfirmation"
                                    placeholder="Confirm Password"
                                    value={passwordConfirmation} 
                                    onChange={this.handleChange} 
                                />
                                <button type="submit" className="button-primary">
                                    Submit
                                </button>
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default Signup;