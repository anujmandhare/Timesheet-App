import { NextFunction } from 'express';
import * as sql from 'mssql';

const config: sql.config = {
    user: 'TyneeBO',
    database: 'TyneeBackOffice_Dev',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

export const pool = new sql.ConnectionPool(config);

export async function connect() {
    try {
        await pool.connect();
        console.log('Connected to the database');
        // await pool.close();
    } catch (error) {
        console.error('Database connection error', error);
    }
}

export async function executeProdcedure(next: NextFunction, procedureName: string, inputParams?: Array<any>,) {
    try {

        await connect();
        const request = pool.request();

        let sqlQuery = `EXEC ${procedureName} `;

        if (inputParams) {
            inputParams.forEach((element: any) => {
                sqlQuery += '@' + element.name + '=' + element.value + ',';
            });
        }

        sqlQuery = sqlQuery.slice(0, -1) + ';';

        const result = await request.query(sqlQuery);
        console.log('\n******\nFor Procedure - \n ', procedureName, '\n\nResult is\n', result, '\n****** END ******');
        return result;

    } catch (error) {
        console.error('\nError while accessing DB\n', error);
        next();

    } finally {
        // await pool.close();
    }
}

export async function execute(query: any, next: NextFunction) {
    try {
        await connect();
        const result = await pool.request().query(query);
        console.log('\n******\nFor Query - \n ', query, '\nResult is\n', result, '\n****** END ******');
        return result;
    } catch (error) {
        console.error('\nError while accessing DB\n', error);
        next();
    } finally {
        // await pool.close();
    }
}
