//Import Tools
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//Import Routes
import userRouter from './src/routes/userRouter';
import serviceRouter from './src/routes/serviceRouter';
import courseRouter from './src/routes/courseRouter';
import saveRouter from './src/routes/saveRouter';
import providerRouter from './src/routes/providerRouter';
import enrollmentRouter from './src/routes/enrollmentRouter';
import affiliateRouter from './src/routes/affiliateRouter';

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
app.use('/v1/api/', userRouter);
app.use('/v1/api/services', serviceRouter);
app.use('/v1/api/courses', courseRouter);
app.use('/v1/api/saves', saveRouter);
app.use('/v1/api/provider', providerRouter);
app.use('/v1/api/enrollment', enrollmentRouter);
app.use('/v1/api/affiliate', affiliateRouter);

//Export app
export default app;
