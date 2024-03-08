import express, { Request, Response } from 'express';
const cors = require('cors');

import { connect } from './DBConnect';
import { errorHandler } from './extras/errorHandler';
import { router as UserRouter } from './routes/UserRouter';

const { PORT } = require('./extras/constants');

const app = express();

app.use(express.json());
app.use(cors());

const startApp = async () => {
    await connect();
}

app.use('/user', UserRouter);
app.use('/timesheet', UserRouter);
app.use('/assignment', UserRouter);


app.use(errorHandler);

startApp();
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
