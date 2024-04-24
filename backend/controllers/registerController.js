const User = require('../model/User');
const bcrypt = require('bcryptjs');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409);  

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const result = await User.create({
            "username": username,
            "password": hashedPwd
        });
        
        const userInfo = await User.findOne({ username: username }, {username: 1, _id: 1}).exec();
        res.status(201).json(userInfo);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };