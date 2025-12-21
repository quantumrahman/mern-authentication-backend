// import modules ---------------------------------------->
import jwt from 'jsonwebtoken';
import AppError from '../utils/constant/app.error.js';

// middleware -------------------------------------------->
const authMiddleware = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new AppError('Not Authorized, Login Again!', {
            status: 401,
            message: 'NOT_AUTHORIZED',
        });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            throw new AppError('Not Authorized, Login Again!', {
                status: 401,
                message: 'NOT_AUTHORIZED',
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

// export modules ---------------------------------------->
export default authMiddleware;
