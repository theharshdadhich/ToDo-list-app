import express from "express";
import auth from "../middleware/auth.js";
import { registerUserController,emailVarification,loginUserController,logoutController,updateUserDetails,forgetPassword,verifyOtpContoller,resetpasswordController,userDetails } from "../Controllers/user.controller.js";

const userRouter = express.Router();




userRouter.post('/register', registerUserController);
userRouter.post('/verifyEmail', emailVarification);
userRouter.post('/Login', loginUserController);
userRouter.post('/Logout', auth, logoutController);
userRouter.put('/:id',auth,updateUserDetails);
userRouter.post('/forgetpassword',forgetPassword);
userRouter.post('/verifyOtp',verifyOtpContoller);
userRouter.post('/resetpassword',resetpasswordController);
userRouter.post('/user-details',auth,userDetails);

export default userRouter;
