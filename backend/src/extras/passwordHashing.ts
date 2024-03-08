import { Response } from 'express';
const bcrypt = require('bcrypt');
const CONSTANTS = require('./constants');


export const hashedPassword = async (password: string) => {
    return bcrypt.hash(password, CONSTANTS.SALT_ROUNDS)
        .then((hashedPassword: any) => {
            return hashedPassword
        })
        .catch((error: Error) => {
            throw Error(CONSTANTS.INTERNAL_SERVER);
        });
}


export const hashCompare = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword)
        .then((response: Response) => {
            return response;
        })
        .catch((error: Error) => {
            throw Error(CONSTANTS.BAD_REQUEST);
        });
}