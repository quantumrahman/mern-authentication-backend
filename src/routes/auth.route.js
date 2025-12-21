// import modules ---------------------------------------->
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import authSignupController from '../controllers/auth.signup.controller.js';
import authSignInController from '../controllers/auth.signin.controller.js';
import authSignOutController from '../controllers/auth.signout.controller.js';
import authVerificationOtpController from '../controllers/auth.verificationOtp.controller.js';
import authVerifyOtpController from '../controllers/auth.verifyOtp.controller.js';

// router ------------------------------------------------>
const router = express.Router();

// route ------------------------------------------------->
router.route('/sign_up').post(authSignupController);
router.route('/sign_in').post(authSignInController);
router.route('/sign_out').get(authSignOutController);
router
    .route('/verification_otp')
    .post(authMiddleware, authVerificationOtpController);
router
    .route('/verify_email_account')
    .post(authMiddleware, authVerifyOtpController);
// export modules ---------------------------------------->
export default router;
