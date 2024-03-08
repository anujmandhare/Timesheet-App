import { Request, Response, NextFunction } from 'express';
const { STATUS_CODE, BAD_REQUEST, UNAUTHORISED, FORBIDDEN } = require('./constants.json');


export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    try {
        switch (true) {
            case error.message === BAD_REQUEST:
                res.status(STATUS_CODE.BAD_REQUEST).send(error);
                break;

            case error.message === UNAUTHORISED:
                res.status(STATUS_CODE.UNAUTHORISED).send('Unauthorised access');
                break;

            case error.message === FORBIDDEN:
                res.status(STATUS_CODE.FORBIDDEN).send('User not allowed');
                break;

            default:
                console.log("\nDefault Error in Handler **********  ", error);
                res.status(STATUS_CODE.INTERNAL_SERVER).send(error.message);
        }

    } catch (error) {
        console.log("\nError Handler Error **********  ", error);
        res.status(STATUS_CODE.INTERNAL_SERVER).send("Internal Server Error.");
    }
}