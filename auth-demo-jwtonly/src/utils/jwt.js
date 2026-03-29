import jwt from 'jsonwebtoken';
import { config } from "../config/config.js";

const JWT_SECRET = config.jwt_secret;


const generateAccessToken =  (userId) => {
    return jwt.sign(
        {userId: userId},
        JWT_SECRET,
        {expiresIn: '7d'}
    );
};


const verifyAccessToken = (token) =>{
    return jwt.verify(
        token,
        JWT_SECRET
    )
}
export { generateAccessToken, verifyAccessToken };
export default { generateAccessToken, verifyAccessToken };