import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from "./routes/auth/auth.js";
import { notFound } from "./middleware/notFound.js";
import { handleError } from "./middleware/handleError.js";



const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/health", (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime()
    })
})

app.use('/api', authRouter)

app.use(notFound);
app.use(handleError);
export { app };
export default app;
