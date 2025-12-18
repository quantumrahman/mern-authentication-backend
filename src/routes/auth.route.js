// import modules ---------------------------------------->
import express from 'express';
import authSignupController from '../controllers/auth.signup.controller.js';
import authSignInController from '../controllers/auth.signin.controller.js';

// router ------------------------------------------------>
const router = express.Router();

// route ------------------------------------------------->
router.route('/sign_up').post(authSignupController);
router.route('/sign_in').post(authSignInController);

// export modules ---------------------------------------->
export default router;
