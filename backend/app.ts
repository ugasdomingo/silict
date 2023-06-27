//Import Tools
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//Import Routes
import userRouter from './src/routes/userRouter';
import serviceRouter from './src/routes/serviceRouter';
import saveRouter from './src/routes/saveRouter';
import providerRouter from './src/routes/providerRouter';
import enrollmentRouter from './src/routes/enrollmentRouter';
import paymentRouter from './src/routes/paymentRouter';

//Define app
const app = express();

const allowedOrigins = [
    process.env.ORIGIN1 as string,
    process.env.ORIGIN2 as string,
    process.env.ORIGIN3 as string,
];

//Middleware
app.use(
    cors({
        origin: function (origin: any, callback: any) {
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                'Error CORS, origin: ' + origin + ', No autorizado'
            );
        },
        credentials: true,
    })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/v1/', userRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/saves', saveRouter);
app.use('/api/v1/provider', providerRouter);
app.use('/api/v1/enrollment', enrollmentRouter);
app.use('/api/v1/payment', paymentRouter);

//Export app
export default app;
