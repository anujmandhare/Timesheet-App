import { Request, Response, NextFunction } from "express";
import { format } from 'date-fns';
import { executeProdcedure, execute } from '../DBConnect';

const CONSTANTS = require("../extras/constants.json");

const getAssignments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { UserId } = req.query;
        let params = [{ name: 'UserId', value: UserId }];

        const tempAssignmentData = await executeProdcedure(next, CONSTANTS.PR_NAME.usp_GetUserAssignments, params);
        const tempData = tempAssignmentData?.recordset;

        const data = tempData?.map((ele: any) => {
            return {
                label: ele.ClientName + ' : ' + format(new Date(ele.StartDate), 'dd/MM/yy') + " - " + format(new Date(ele.EndDate), 'dd/MM/yy'),
                AssignmentId: ele.AssignmentId, UserId: ele.UserId, Email: ele.Email, StartDate: ele.StartDate, EndDate: ele.EndDate
            };
        });

        if (!data) {
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
};

const getDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { AssignmentId } = req.query;

        let params = [{ name: 'AssignmentId', value: AssignmentId }];

        const tempAssignmentData = await executeProdcedure(next, CONSTANTS.PR_NAME.usp_GetAssignmentTimesheets, params);
        const tempData = tempAssignmentData?.recordset;

        const data = tempData?.map((ele: any) => {
            let label = '';
            let tempDate = new Date(ele.PeriodEndDate)
            label += ele.PeriodEndDate ? format(tempDate.setDate(ele.PeriodEndDate.getDate() - 6), 'dd/MM/yy') : '';
            label += ' - ';
            label += ele.PeriodEndDate ? format(new Date(ele.PeriodEndDate), 'dd/MM/yy') : '';
            return ({
                label,
                TimesheetId: ele.TimesheetId, Status: ele.Status
            });
        });

        if (data) {
            res.status(CONSTANTS.STATUS_CODE.OK).send(data);
        } else {
            throw Error(CONSTANTS.BAD_REQUEST);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAssignments, getDates
};
