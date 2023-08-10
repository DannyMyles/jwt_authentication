const User = require("../models/User");

const loginUser = async (req, res) =>{
	console.log("object")
	const {email, password }= req.body
	try {
		console.log(" userr" , email )
		console.log(" pass" , password )
		
		const user = await User.login(email, password)
		res.status(200).json({user : user._id})
	} catch (error) {
		console.error('Error while logging in:', error);
		return res.status(500).json({ err: 'An error occurred while logging in', error });
	}
}

module.exports = {loginUser}