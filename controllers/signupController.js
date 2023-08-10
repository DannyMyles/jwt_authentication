const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require ('jsonwebtoken')


// set the jwt to expire in 3days
const maxAge = 3 * 24 * 60 * 60
// create a jsonwebtoken
const createToken = (id) =>{
	return jwt.sign({id}, process.env.JWTSECRET,{expiresIn: maxAge})
}
const getUsers = async(req, res) =>{
	try {
		const users = await User.find({})
		if(!users){
			res.status(404).json({msg : "No users found"})
		}
		res.status(200).json({ users: users });
	} catch (error) {
		return res.status(500).json({ err: error });
	}
}
const getSingleUser = async (req, res)=>{
	try {
	const {id: userId} = req.params;
	const user = await User.findById({_id: Object(userId)}).exec()
	if(!user){
		res.status(404).json({msg : `No user with id ${userId}`})
	}
	res.status(200).json({ user: user });

	} catch (error) {
		return res.status(500).json({ err: error });
		
	}
}
// Signup controller function for creating and saving new Users into MongoDB using Mongoose ORM with Bcrypt
const signUpController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
		return res.status(409).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
	  
    });
	// adding jwt and cokie
	const token = createToken(newUser._id)
	res.cookie('jwt', token , { httpOnly: true, maxAge:maxAge * 1000})
    // Save the user to database
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ err: error });
  }
};

module.exports = {signUpController, getUsers, getSingleUser};

