import {Router} from 'express';
import { login, register, verifyEmail , logout} from '../controllers/auth.controller.js';
import { registerValidator } from '../validators/auth.validator.js';
import { authUser } from '../middleware/auth.middleware.js';
import { getMe } from '../controllers/auth.controller.js';

const authRouter = Router();
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public 
 * @body { username, email, password }
 */

authRouter.post('/register',registerValidator, register);


/**
 * @route POST /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public 
 * @body { token }
 */
authRouter.get('/verify-email',verifyEmail );


/**
 * 
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public 
 * @body { email, password }
 * 
 */
authRouter.post('/login', login);


/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 * @header { Authorization: Bearer <token> }
 */
authRouter.get('/get-me', authUser, getMe);


/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 * @header { Authorization: Bearer <token> }
 */
authRouter.post("/logout",logout)
export default authRouter; 