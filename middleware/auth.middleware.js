import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export const isLoggedIn = async (req, res,next) => {
    console.log(req.cookies);
    
  const token = req.cookies?.token
  console.log('token : ',token);
  
  if (!token) {
    console.log('no token')
    return res.status(400).json({
      success: false,
      message: "Authentication failed",
    });
  }
  try {
    const decoded = await jwt.verify(token, process.env.JWT_KEY);

    console.log("decoded data : ", decoded);
    req.user = decoded;
    
    next();
} catch (error) {
    return res.status(400).json({
        success:false,
        message:'Internal server error'
    })
}
};
