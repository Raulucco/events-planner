export const PASSWORD_MIN_LENGTH = 9;
export const USERNAME_MAX_LENGTH = 15;

const especialCharsRegex = /[^A-z0-9\!\@\#\$\%\^\&\*]/g;

export function passwordValidator(password: string = '', minLength: number = PASSWORD_MIN_LENGTH): string {
    const errors: string[] = [];

    if (password.length < minLength) {
        errors.push(`Password should be at least ${minLength} long.`);
    }

    if (/[A-Z]/g.test(password)) {
        errors.push(`Password should contain at leats one capital letter.`);
    }

    if (/[a-z]/g.test(password)) {
        errors.push(`Password should contain at leats one lower case letter.`);
    }

    if (/[\!\@\#\$\%\^\&\*]/g.test(password)) {
        errors.push(`Password should contain at leats one character !, @, #, $, %, ^, & or *.`);
    }


    if (/\d/g.test(password)) {
        errors.push(`Password should contain at leats one number.`);
    }

    const notAllowedCharsMessage = validateNotAllowedCharacters(password);

    if (notAllowedCharsMessage) {
        errors.push(`Password ${notAllowedCharsMessage}`);
    }

    return errors.join('\n');
}

export function usernameValidator(username: string = '', maxLength: number = USERNAME_MAX_LENGTH): string {
    const errors: string[] = [];

    if (username.length > maxLength) {
        errors.push('Username can\'t be longer than ${maxLength}');
    }

    const notAllowedCharsMessage = validateNotAllowedCharacters(username);

    if (notAllowedCharsMessage) {
        errors.push(`Username ${notAllowedCharsMessage}`);
    }

   return errors.join('\n');
}

export function validateNotAllowedCharacters (str: string): string {
    if (especialCharsRegex.test(str)) {
        const matches = str.match(especialCharsRegex);
        return `can not contain special character: ${matches && matches.join(', ')}`;
    }

    return  null;
}

export function emailValidator(email: string): string {
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Invalid email address.';
    }
    return null;
}
