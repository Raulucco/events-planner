import * as React from 'react';
import { connect } from 'react-redux';
import { some } from 'lodash';
import { Map } from 'immutable';

import { passwordValidator, usernameValidator, emailValidator } from './credential-validators';
import { AccountCredential } from './credentials';
// import { registerStore } from './stores';

export class Register extends React.Component<AccountCredential, any> {
    password: HTMLInputElement;
    username: HTMLInputElement;
    verifyPassword: HTMLInputElement;
    email: HTMLInputElement;
    bio: HTMLTextAreaElement;

    forbidEvent(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        return false;
    }

    onRegister(event: React.KeyboardEvent<HTMLElement>) {
        const blackListedKeys: number[] = [13, 9];

        if (event.charCode && blackListedKeys.indexOf(event.charCode) < 0) {
            return;
        }

        const formHasErrors = some([
            this.username,
            this.password,
            this.verifyPassword,
            this.email
        ], (input: HTMLInputElement) => input.validationMessage.length > 0);

        if (formHasErrors) {
            return;
        }

        this.props.store.dispatch({
            type: 'create-account',
            payload: {
                username: this.username.value,
                password: this.password.value,
                bio: this.bio.value,
                email: this.email.value
            }
        });
    }

    validateUsername(event: React.FormEvent<HTMLInputElement>) {
        const { value } = this.username;

        this.username.setCustomValidity('');
        this.username.setCustomValidity(usernameValidator(value));
    }

    public validatePassword(event: React.FormEvent<HTMLInputElement>) {
        const { value } = this.password;

        this.password.setCustomValidity('');
        this.password.setCustomValidity(passwordValidator(value));
    }

    public validateVerifyPassword(event: React.FormEvent<HTMLInputElement>) {
        const { value } = this.verifyPassword;
        const password = this.password.value;
        this.verifyPassword.setCustomValidity('');

        if (value !== password) {
            this.verifyPassword.setCustomValidity('Passwords should match.');
        }
    }

    public validateEmail(event: React.FormEvent<HTMLInputElement>) {
        const { value } = this.email;

        this.email.setCustomValidity('');
        this.email.setCustomValidity(emailValidator(value));
    }

    render() {
        const register = this.onRegister.bind(this);
        const validatePassword = this.validatePassword.bind(this);
        const validateUsername = this.validateUsername.bind(this);
        const validateVerifyPassword = this.validateVerifyPassword.bind(this);
        const validateEmail = this.validateEmail.bind(this);

        return (<div className="create-account">
            <form name="login" autoComplete="true">
                <div className="controls">
                    <label>
                        <span className="label">User name:</span>
                        <input type="text" id="username" name="username" placeholder="john doe"
                            ref={(input) => this.username = input}
                            required autoFocus
                            onInput={validateUsername}
                        />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Email:</span>
                        <input type="text" name="email" required placeholder="john@doe.com"
                            ref={(input) => this.email = input}
                            onInput={validateEmail}
                        />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Password:</span>
                        <input type="password" name="password" required
                            onInput={validatePassword}
                            ref={(input) => this.password = input}
                         />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Re-type your password:</span>
                        <input type="password" name="verifyPassword" required
                            ref={(input) => this.verifyPassword = input}
                            onInput={validateVerifyPassword}
                            onCopy={this.forbidEvent}
                            onPaste={this.forbidEvent}
                         />
                    </label>
                </div>
                <div className="controls">
                    <label>
                        <span className="label">Tell us about you:</span>
                        <textarea name="bio"  ref={(input) => this.bio = input}></textarea>
                    </label>
                </div>
                <div className="controls btn">
                    <button type="submit" onClick={register} onKeyDown={register}>Login</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </div>);
    }
}

export const CreateAccount = connect((state: Map<any, any>) => {
    const {
        username,
        password,
        bio,
        email,
    } = state.getIn(['user'], {
        username: null,
        password: null,
        bio: null,
        email: null,
    });

    return {
        username,
        password,
        bio,
        email
        // ,store: registerStore
    };
})(Register);
