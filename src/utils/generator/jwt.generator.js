// import modules ---------------------------------------->
import jwt from 'jsonwebtoken';

// generator --------------------------------------------->
const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// export modules ---------------------------------------->
export default generateJwt;
