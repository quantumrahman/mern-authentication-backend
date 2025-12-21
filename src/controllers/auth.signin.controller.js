// import modules ---------------------------------------->
import 'dotenv/config';
import authModel from '../models/auth.model.js';
import AppError from '../utils/constant/app.error.js';
import generateJwt from '../utils/generator/jwt.generator.js';
import compareValidator from '../utils/validator/compare.validator.js';

// controller -------------------------------------------->
const signInController = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new AppError('All fields is required!', {
            status: 400,
            code: 'VALIDATION_ERROR',
            details: {
                fields: ['email', 'password'],
            },
        });
    }

    try {
        const user = await authModel.findOne({ email });
        if (!user) {
            throw new AppError('Invalid email!', {
                status: 400,
                code: 'INVALID_EMAIL_ADDRESS',
                details: {
                    fields: ['email'],
                },
            });
        }

        const isMatch = await compareValidator(password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid password!', {
                status: 400,
                code: 'INVALID_PASSWORD',
                details: {
                    fields: ['password'],
                },
            });
        }

        const token = generateJwt(user._id, email);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_DEV === 'production',
            sameSite: process.env.NODE_DEV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: 'user login successfull!',
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        next(error);
    }
};

// export modules ---------------------------------------->
export default signInController;
