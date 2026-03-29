import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { notFound } from "./middlewares/index.js";
import { handleError } from "./middlewares/index.js";
import {
    countryRouter,
    regionRouter,
    districtRouter,
    townRouter
} from "./routes/index.js";


const app = express();

app.use(helmet());
app.use(cors({
    origin: '*',
    credential: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/health", (req, res)=>{
    res.status(200).json({
        status: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now().toISOString()
    })
})


app.use('/api', countryRouter);
app.use('/api', regionRouter);
app.use('/api', districtRouter);
app.use('/api', townRouter);

app.use(notFound);
app.use(handleError);

export { app };
export default app;

/* #0243663361 */