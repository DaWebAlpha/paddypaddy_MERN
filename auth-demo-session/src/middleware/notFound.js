// middleware/notfound.middleware.js
import { AppError } from "../errors/app.error.js";

const notFound = (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
};


export { notFound };
export default notFound;