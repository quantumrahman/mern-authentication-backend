// import modules ---------------------------------------->
import express from 'express';
import authSignupController from '../controller/auth.signup.controller.js';

// router ------------------------------------------------>
const router = express.Router();

// route ------------------------------------------------->
router.route('/sign_up').post(authSignupController);

// export modules ---------------------------------------->
export default router;
