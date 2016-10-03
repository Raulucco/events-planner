import * as React from 'react';

export interface CredentialsProps {
    username: string;
    password: string;
}

export class Login extends React.Component<CredentialsProps, any> {
    render () {
        return (<div > Login </div>);
    }
}
