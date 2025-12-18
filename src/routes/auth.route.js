// import modules ---------------------------------------->
import express from 'express';
import authSignupController from '../controllers/auth.signup.controller.js';
import authSignInController from '../controllers/auth.signin.controller.js';
import authSignOutController from '../controllers/auth.signout.controller.js';

// router ------------------------------------------------>
const router = express.Router();

// route ------------------------------------------------->
router.route('/sign_up').post(authSignupController);
router.route('/sign_in').post(authSignInController);
router.route('/sign_out').get(authSignOutController);

// export modules ---------------------------------------->
export default router;
