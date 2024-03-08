import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');


const CONSTANTS = require('./constants.json');
import { userData, RequestData } from './interfaces';

export const createToken = ({ UserId, RoleId }: userData) => {
    const accessToken = jwt.sign({ UserId, RoleId }, CONSTANTS.SECRET);
    return accessToken;
}


export const authenticateJWT = (request: RequestData, response: Response, next: NextFunction) => {
    const token = request.headers;

    if (token) {

        jwt.verify(token, CONSTANTS.SECRET, (error: Error, user: any) => {
            if (error) {
                throw Error(CONSTANTS.FORBIDDEN);
            }

            request.user = user;
            next();
        });
    } else {
        throw Error(CONSTANTS.UNAUTHORISED);
    }
};
