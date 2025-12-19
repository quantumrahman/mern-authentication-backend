// import modules ---------------------------------------->
import 'dotenv/config';
import authModel from '../models/auth.model.js';
import AppError from '../utils/constant/app.error.js';
import generateJwt from '../utils/generator/jwt.generator.js';
import sendWelcomeEmail from '../utils/email/welcome.email.js';
import emailValidator from '../utils/validator/email.validator.js';
import generateHashPassword from '../utils/generator/hashpass.generator.js';

// controller -------------------------------------------->
const signUpController = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new AppError('All fields is required!', {
            status: 400,
            code: 'VALIDATION_ERROR',
            details: { fields: ['name', 'email', 'password'] },
        });
    }

    const emailIsValid = emailValidator(email);
    if (!emailIsValid) {
        throw new AppError('Email is invalid!', {
            status: 400,
            code: 'VALIDATION_ERROR',
            details: { field: ['email'] },
        });
    }

    const passwordLength = 8;
    if (password.length < passwordLength) {
        throw new AppError('Password must be at least 8 Characters!', {
            status: 400,
            code: 'VALIDATION_ERROR',
            details: { field: ['password'] },
        });
    }

    try {
        const existingUser = await authModel.findOne({ email });
        if (existingUser) {
            throw new AppError('A user with this email already exists!', {
                status: 409,
                code: 'USER_ALREADY_EXISTS',
                details: null,
            });
        }

        const hashedPassword = await generateHashPassword(password);

        const user = new authModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await user.save();

        const token = generateJwt(user._id, email);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_DEV === 'production',
            sameSite: process.env.NODE_DEV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        await sendWelcomeEmail(name, email);

        return res.status(201).json({
            success: true,
            message: 'user register successfully!',
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
export default signUpController;
