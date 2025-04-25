import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userModel = {
  name: String,
  email: String,
  password: String,
  role: {
    type: "String",
    enum: ["user", "admin"],
    default: "user",
  },
  isVerfied: {
    type: Boolean,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: String,
  },
  verificationToken: {
    type: String,
  },
};

const userSchema = new mongoose.Schema(userModel, { timestamps: true });

userSchema.pre('save',async function(next) {
  if(this.isModified('password')){
    
    this.password=await bcrypt.hash(this.password,10)
  }
  next()
})


const User = mongoose.model("User", userSchema);

export default User;
