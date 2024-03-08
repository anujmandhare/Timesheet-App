import { Request, Response, NextFunction } from "express";

import { executeProdcedure, execute } from '../DBConnect';
import { hashCompare } from '../extras/passwordHashing';
import { createToken } from '../extras/authenticateToken';
const CONSTANTS = require("../extras/constants.json");
// const { sendVerificationMail } = require("../otherFiles/emailVerification");

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { Email, Password } = req.body;
		const params = [{ name: 'Email', value: "'" + Email + "'" }];

		const tempData = await executeProdcedure(next, CONSTANTS.PR_NAME.usp_LoginUser, params);
		const data = tempData?.recordset[0];

		if (!data) {
			throw Error(CONSTANTS.BAD_REQUEST);
		}

		const passwordCheck = await hashCompare(Password, data.Password);

		if (passwordCheck) {
			const token = createToken({ UserId: data.UserId, RoleId: data.RoleId });
			res.status(CONSTANTS.STATUS_CODE.OK).json({
				token,
				UserId: data.UserId,
				RoleId: data.RoleId,
			});
		} else {
			throw Error(CONSTANTS.BAD_REQUEST);
		}
	} catch (error) {
		next(error);
	}
};

// const register = async (req: Request, res: Response, next: NextFunction) => {
// 	try {

// 		const { Email, Password, RoleId } = req.body;
// 		const searchQuery = `SELECT Email FROM dbo.UserSecurity WHERE Email='${Email}'`;

// 		const tempData = await execute(searchQuery, next);
// 		const data = tempData.recordset[0];

// 		const hashedpassword = await hashedPassword(Password);

// 		if (!data) {

// 			// await sendVerificationMail(payload.username);

// 			const query = `INSERT INTO dbo.UserSecurity VALUES ('${Email + "','" + hashedpassword + "'," + RoleId})`;
// 			const temp = await execute(query, next);
// 			const data1 = temp.recordset[0];

// 			res.send(`User ${Email} registered!`);

// 		} else {
// 			throw Error(CONSTANTS.BAD_REQUEST);
// 		}
// 	} catch (error) {
// 		next(error);
// 	}
// }

// const update = async (req: Request, res: Response, next: NextFunction) => {
// 	try {

// 		const { UserId, Email, Password, RoleId } = req.body;

// 		const hashedpassword = await hashedPassword(Password);
// 		const query = `UPDATE dbo.UserSecurity SET Email='${Email}',Password='${hashedpassword}',RoleId=${RoleId} WHERE UserId=${UserId}`;
// 		const temp = await execute(query, next);
// 		const data = temp.rowsAffected[0];

// 		if (data) {
// 			res.status(CONSTANTS.STATUS_CODE.OK).send('Profile Updated Successfully!');
// 		} else {
// 			throw Error(CONSTANTS.BAD_REQUEST);
// 		}

// 	} catch (error) {

// 		next(error);
// 	}
// };

module.exports = {
	login
};
