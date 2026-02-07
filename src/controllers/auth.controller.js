const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const registerSchema = require('../validators/register.validator');
const loginSchema = require('../validators/login.validator');

async function userRegister(req, res) {
  try {
    
    const result = registerSchema.safeParse(req.body);

    if(!result.success){
      const formattedError = result.error.flatten().fieldErrors

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        error: formattedError
      })

    }

    const {username,email,password} = result.data;


    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const saveUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: saveUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: saveUser._id,
        username: saveUser.username,
        email: saveUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function userLogin(req, res) {
  try {
    
    const result = loginSchema.safeParse(req.body);

    if(!result.success){
      const formattedError = result.error.flatten().fieldErrors

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        error: formattedError
      })

    }
    const {email,password} = result.data;

    
    const user = await userModel.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password", 
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,{expiresIn: "1d"}
    );

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "none"
    });

    return res.status(200).json({
      message: "Login Successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function userLogout(req,res){
try {
   
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), 
      secure: true,        
      sameSite: "none",  
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { userRegister, userLogin,userLogout };
