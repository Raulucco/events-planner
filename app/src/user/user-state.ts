import { Map } from 'immutable';

export interface UserState extends Map<any, any> {
    username: string;
    password: string;
    email: string;
    bio?: string;
}
