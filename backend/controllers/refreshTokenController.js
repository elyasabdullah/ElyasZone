const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    
    if (!refreshToken) {
        const cookie = req.headers.cookie;
        refreshToken = cookie && cookie.split('jwt=')[1];
        if(!refreshToken) {
            return res.sendStatus(401);
        }
    }

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET, 
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            res.json({ roles, accessToken });
        }
    );
}

module.exports = { handleRefreshToken }