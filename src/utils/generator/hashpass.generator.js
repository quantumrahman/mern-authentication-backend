// import modules ---------------------------------------->
import bcrypt from 'bcrypt';

// generator --------------------------------------------->
const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// export modules ---------------------------------------->
export default generateHashPassword;
