import * as React from 'react';
import { connect } from 'react-redux';
import { get, partial } from 'lodash';
import { Map } from 'immutable';

import { passwordValidator, usernameValidator } from './credential-validators';
import { LoginCredential } from './credentials';
import { loginStore } from './stores';

export class BaseLogin extends React.Component<LoginCredential, any> {
    public username: HTMLInputElement;
    public password: HTMLInputElement;

    public static get PASSWORD_ID() {
        return 'password';
    }

    public static get USERNAME_ID() {
        return 'username';
    }

    public inputHandler(id: string, event: React.FormEvent<HTMLInputElement>) {
        if (id === BaseLogin.PASSWORD_ID) {
            this.validatePassword(event);
        } else if (id === BaseLogin.USERNAME_ID) {
            this.validateUsername(event);
        }
    }

    public validatePassword(event: React.FormEvent<HTMLInputElement>) {
        const { value } = this.password;

        this.password.setCustomValidity('');
        this.password.setCustomValidity(passwordValidator(value));
    }

    public validateUsername(event: React.FormEvent<HTMLInputElement>) {
        const { value } = this.username;

        this.username.setCustomValidity('');
        this.username.setCustomValidity(usernameValidator(value));
    }

    public submitHandler(event: React.FormEvent<HTMLFormElement>) {
        if (this.password.validationMessage.length ||
            this.username.validationMessage.length
        ) {
            return;
        }

        this.props.store.dispatch({
            type: 'login',
            payload: {
                username: this.username.value,
                password: this.password.value
            }
        });
    }

    public render() {
        const inputHandler = this.inputHandler.bind(this);
        const onPasswordInput = partial(inputHandler, BaseLogin.PASSWORD_ID);
        const onUsernameInput = partial(inputHandler, BaseLogin.USERNAME_ID);
        this.submitHandler = this.submitHandler.bind(this);

        return (<div className="login">
            <form name="login" autoComplete="true" onSubmit={this.submitHandler}>
                <div className="controls">
                    <label>
                        <span className="label">User name:</span>
                        <input type="text" id="username"
                            name="username" placeholder="john doe"
                            required autoFocus
                            ref={(input) => this.username = input}
                            onInput={onUsernameInput}
                        />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Password:</span>
                        <input type="password" name="password" required
                            ref={(input) => this.password = input}
                            onInput={onPasswordInput}
                        />
                    </label>
                </div>
                <div className="controls btn">
                    <button type="submit">Login</button>
                    <button type="reset">Reset</button>
                </div>
            </form>
        </div>);
    }
}

function mapStateToProps(state: Map<any, any>) {
    const { username, password } = state.getIn(['user'], { username: null, password: null });

    return { username, password, store: loginStore };
}

export const Login = connect(mapStateToProps)(BaseLogin);
