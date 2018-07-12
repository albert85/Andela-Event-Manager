import express from 'express';

import userRoute from './userRoute';
import eventRoute from './eventRoute';
import centerRoute from './centerRoute';

const app = express.Router();

app.use('/api/v1', userRoute);
app.use('/api/v1', eventRoute);
app.use('/api/v1', centerRoute);


export default app;
