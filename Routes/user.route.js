import express from "express";
import { login, userRegister, verifyUser } from "../controllers/user.controller.js";
 
const userRoutes=express.Router()

userRoutes.post('/register',userRegister)
userRoutes.get('/verify/:token',verifyUser)
userRoutes.get('/login',login)

export default userRoutes