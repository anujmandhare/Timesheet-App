import { Request, Response, NextFunction } from "express";
import { execute, executeProdcedure } from "../DBConnect";

const CONSTANTS = require("../extras/constants.json");

// const addTimesheet = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { AssignmentId, PeriodEndDate, Status, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = req.body;

//         const query = `INSERT INTO dbo.Timesheet VALUES (${AssignmentId + ",'" + PeriodEndDate.substring(0, 10) + "'," + Status + ',' + Monday + ','
//             + Tuesday + ',' + Wednesday + ',' + Thursday + ',' + Friday + ',' + Saturday + ',' + Sunday})`;

//         const tempData = await execute(query, next);
//         let data = 'Timesheet submitted please reload to view';

//         if (!tempData) {
//             throw Error(CONSTANTS.BAD_REQUEST);
//         }

//         if (tempData?.rowsAffected.length) {
//             try {
//                 const query = `SELECT * FROM dbo.Timesheet WHERE AssignmentId=${AssignmentId} AND PeriodEndDate='${PeriodEndDate}'`;
//                 const tempData = await execute(query, next);
//                 data = tempData?.recordset[0];
//             } catch (error) {
//                 console.log('Error in fetching inserted data');
//             } finally {
//                 res.status(200).send(data);
//             }


//         } else {
//             throw Error(CONSTANTS.BAD_REQUEST);
//         }
//     } catch (error) {
//         next(error);
//     }
// };

const updateTimesheet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { TimesheetId, Status, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = req.body;
        const params = [{ name: 'TimesheetId', value: TimesheetId?.TimesheetId }, { name: 'Status', value: Status },
        { name: 'Monday', value: Monday },
        { name: 'Tuesday', value: Tuesday }, { name: 'Wednesday', value: Wednesday },
        { name: 'Thursday', value: Thursday }, { name: 'Friday', value: Friday },
        { name: 'Saturday', value: Saturday }, { name: 'Sunday', value: Sunday }, { name: 'Success', value: 10 }];


        const tempData = await executeProdcedure(next, CONSTANTS.PR_NAME.usp_SubmitTimesheet, params);
        const data = tempData?.recordset?.[0]?.Success;

        if (!data) {
            throw Error(CONSTANTS.BAD_REQUEST);
        }

        if (data) {
            res.status(CONSTANTS.STATUS_CODE.OK).send('Timesheet updated');
        } else {
            throw Error(CONSTANTS.BAD_REQUEST);
        }
    } catch (error) {
        next(error);
    }
};

const getTimesheet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { TimesheetId } = req.query;
        const params = [{ name: 'TimesheetId', value: TimesheetId }];

        const tempAssignmentData = await executeProdcedure(next, CONSTANTS.PR_NAME.usp_GetTimesheet, params);
        const data = tempAssignmentData?.recordset[0] || [];

        if (!data.length && (!TimesheetId)) {
            throw Error(CONSTANTS.BAD_REQUEST);
        }

        if (data) {
            res.status(CONSTANTS.STATUS_CODE.OK).send(data);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST);
        }
    } catch (error) {
        next(error);
    }
}

const generateMissingTimesheets = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const tempAssignmentData = await executeProdcedure(next, CONSTANTS.PR_NAME.usp_GenerateAllTimesheets);
        const data = tempAssignmentData?.recordset || [];

        if (!data.length) {
            throw Error(CONSTANTS.BAD_REQUEST);
        }

        if (data) {
            res.status(CONSTANTS.STATUS_CODE.OK).send(data);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTimesheet, updateTimesheet, generateMissingTimesheets
};
