const Users = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

	const foundUser = await Users.findOne({ username: username }).exec();
	if (!foundUser) return res.sendStatus(401).json({"message": "You should sign up first."}); 
	
	const match = await bcrypt.compare(password, foundUser.password);

	if (match) {
		const roles = Object.values(foundUser.roles).filter(Boolean);
		
		const accessToken = jwt.sign(
			{
				"UserInfo": {
						"username": foundUser.username,
						"roles": roles
				}
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m'}
		);
		const refreshToken = jwt.sign(
				{ "username": foundUser.username },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: '30d' }
		);
		
		foundUser.refreshToken = refreshToken;
		const result = await foundUser.save();
		res.cookie('jwt', refreshToken, { 
			httpOnly: true, 
			sameSite: "None",
			secure: true,
			maxAge: 30 * 24 * 60 * 60 * 1000}); 
		
		const {username, _id} = foundUser 
		res.json({_id, username, accessToken });

	} else {
			res.sendStatus(401);
	}
}

module.exports = { handleLogin };