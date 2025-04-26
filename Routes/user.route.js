import express from "express";
import { forgotPassward, login, logout, profile, resetPassward, userRegister, verifyUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
 
const userRoutes=express.Router()

userRoutes.post('/register',userRegister)
userRoutes.get('/verify/:token',verifyUser)
userRoutes.post('/login',login)
userRoutes.get('/logout',isLoggedIn,logout)
userRoutes.get('/profile',isLoggedIn,profile)
userRoutes.get('/forgotPassword',forgotPassward)
userRoutes.get('/resetPassword/:Token',resetPassward)

export default userRoutes