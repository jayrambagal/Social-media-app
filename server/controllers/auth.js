import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* *****************************************    REGISTER USER   **************************************   */
export const register = async (req, res) => {
  const {firstName,lastName,email,password,picturePath,friends,location,occupation,} = req.body;
  try {
    if (!email || !password){
      res.status(400).json({message:"plz provide email and password"})
    }

    // encrypt the password 
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // save the users registration data in database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*  ***************** LOGGING IN  ********************************************************  */   
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      // if user email is not present in databse then gives the 400
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
      
      // checking the users password is equal to database password or not
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
      
      // generating the jwt tokans
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };