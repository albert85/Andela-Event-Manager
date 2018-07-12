import express from 'express';
import userDetails from '../controllers/UserController';
import validator from '../controllers/Validator';
import loginController from '../controllers/LoginController';
import auth from '../controllers/CheckAuth';

const app = express.Router();

// create a new user
app.post('/users/signUp', validator.signUpValidator, userDetails.signUp);

// creating a secure API for login
app.post('/user/login', validator.loginValidator, loginController.signIn);

// change user's role (Admin-user or vice versa)
app.put('/admin-role/:userId', validator.validateUserChangeRole, auth.checkIfAuthorize, auth.checkIfAuthToManage, userDetails.changeRole);

// get Users email address
app.get('/user/email/:userId', validator.validateParamsUserId, loginController.userEmail);

// send email notification
app.post('/user/recipientEmail', validator.validateMailData, auth.checkIfAuthorize, loginController.sendEmailNotifications);

export default app;
