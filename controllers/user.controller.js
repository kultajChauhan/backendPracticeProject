import User from "../module/user.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All field are required",
      });
    }
    const isUpperCase = (password) => password == password.toUpperCase();
    //const isLowerCase = (password) => password == password.toLowerCase();

    if (!password.length > 6 || !isUpperCase(password)) {
      return res.status(400).json({
        message: "Password should be greater than 6 letter and Upper Case ",
      });
    }

    const checkEmail = (email) => email.includes("@");

    if (!checkEmail(email)) {
      return res.status(400).json({
        message: "Email is not in currect format!",
      });
    }
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(409).json({ message: "User is already registered" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "Error! User not get register",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;

    await user.save();

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "e9c413f6bc010d",
        pass: "8b700b8b5f052c",
      },
    });
    const mailOption = {
      from: "sample@sample.com", // sender address
      to: user.email, // list of receivers
      subject: "email testing", // Subject line
      text: `Please click on below link http://localhost:8080/api/v1/user/verify/${user.verificationToken}`, // plain text body
    };

    await transporter.sendMail(mailOption);

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.log("err- ", error);
  }
};

const verifyUser = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token });
    console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid User",
      });
    }

    user.isVerfied = true;
    user.verificationToken = null;
    await user.save();

    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    console.log(`error : ${error}`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "email or password may be wrong",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Login not successfull!",
      });
    }

    jwt.sign({ id: user._id, role: user.role }, "shhhhhh", {
      expiresIn: "24h",
    });

    const cookieOption={
      httpOpen:true,
      secure:true,
      maxAge:1000*60*60*24
    }

    res.cookie("token",token,cookieOption)

  } catch (error) {}
  return res.status(200).json({
    message: "Login successfull!",
  });
};

const logout = async (req,res)=>{}
const profile = async (req,res)=>{}
const forgotPassward = async (req,res)=>{}
const resetPassward = async (req,res)=>{}


export { userRegister, verifyUser,login };
