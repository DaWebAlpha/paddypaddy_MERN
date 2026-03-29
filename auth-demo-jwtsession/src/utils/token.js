import crypto from 'crypto';


const generateOpaqueToken = () => {
    return crypto.randomBytes(32).toString('hex');
}

export { generateOpaqueToken }
export default generateOpaqueToken;
