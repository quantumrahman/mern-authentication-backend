// import modules ---------------------------------------->
import AppError from '../utils/constant/app.error.js';
import authModel from '../models/auth.model.js';

// controller -------------------------------------------->
const verifyOtpController = async (req, res, next) => {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
        throw new AppError('Invalid credentials!', {
            status: 400,
            code: 'INVALID_CREDENTIALS',
            details: {
                field: ['otp'],
            },
        });
    }

    try {
        const user = await authModel.findById(userId);

        if (!user) {
            throw new AppError('User not found!', {
                status: 404,
                code: 'USER_NOT_FOUND',
            });
        }

        if (user.verification_otp === '' || user.verification_otp !== otp) {
            throw new AppError('Invalid OTP!', {
                status: 400,
                code: 'INVALID_OTP',
                details: {
                    field: ['otp'],
                },
            });
        }

        if (user.verification_otp_expires_at < Date.now()) {
            throw new AppError('OTP expired!', {
                status: 400,
                code: 'EXPIRED_OTP',
            });
        }

        user.is_verified = true;
        user.verification_otp = '';
        user.verification_otp_expires_at = 0;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Email verification successfully!',
        });
    } catch (error) {
        next(error);
    }
};

// export modules ---------------------------------------->
export default verifyOtpController;
