import bcrypt from 'bcryptjs';

const saltRounds = 12
const hashPassword = async (password) => {

    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
}

const verifyPassword = async (plainPassword, hashedPassword) => {
    const verify = await bcrypt.compare(plainPassword, hashedPassword);
    return verify;
}

export { hashPassword, verifyPassword };
export default { hashPassword, verifyPassword };