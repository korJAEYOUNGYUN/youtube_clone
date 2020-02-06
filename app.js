import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import {localsMiddleware} from './middlewares';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routes from './routes';
import './passport';
// import dotenv from "dotenv";

// dotenv.config();

const app = express();

const CookieStore = MongoStore(session);

app.set('view engine', 'pug');

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({
            mongooseConnection: mongoose.connection
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use('/static', express.static('static'));
app.use('/uploads', express.static('uploads'));
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.home, globalRouter);

export default app;
