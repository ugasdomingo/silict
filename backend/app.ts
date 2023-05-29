//Import Tools
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//Import Routes
import authRouter from './src/routes/authRouter';
import blogRouter from './src/routes/blogRouter';
import scholarshipRouter from './src/routes/scholarshipRouter';
import formationRouter from './src/routes/formationRouter';

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
app.use('/api/v1', authRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/scholarship', scholarshipRouter);
app.use('/api/v1/formation', formationRouter);

//Export app
export default app;
