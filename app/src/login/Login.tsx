import { Component } from 'react';

export interface CredentialsProps {
    username: string;
    password: string;
}

export class Login extends Component<CredentalsProps, any> {
    render () {
        return (<div > Login </div>);
    }
}
