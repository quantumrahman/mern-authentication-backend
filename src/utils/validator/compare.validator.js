// import modules ---------------------------------------->
import bcrypt from 'bcrypt';

// compare validator ------------------------------------->
const compareValidator = async (inputPassword, encryptPassword) => {
    return await bcrypt.compare(inputPassword, encryptPassword);
};

// export modules ---------------------------------------->
export default compareValidator;
