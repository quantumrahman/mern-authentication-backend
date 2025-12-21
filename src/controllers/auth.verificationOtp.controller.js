// import modules ---------------------------------------->
import 'dotenv/config';
import authModel from '../models/auth.model.js';
import AppError from '../utils/constant/app.error.js';
import generatorVerificationOtp from '../utils/generator/verificationotp.generator.js';
import sendVerificationEmail from '../utils/email/verificationotp.email.js';

// controller -------------------------------------------->
const verificationOtpController = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const user = await authModel.findById(userId);
        if (user.is_verified) {
            throw new AppError('Account already verified!', {
                status: 400,
                message: 'ALREADY_VERIFIED',
            });
        }

        const verificationOtp = generatorVerificationOtp();

        user.verification_otp = verificationOtp;
        user.verification_otp_expires_at = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        await sendVerificationEmail(user.email, verificationOtp);

        res.status(200).json({
            success: true,
            message: 'Verification OTP Send!',
        });
    } catch (error) {
        next(error);
    }
};

// export modules ---------------------------------------->
export default verificationOtpController;
