const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const login = async(req, res)=>{
    try {
        const { password, mail } = req.body;

        // check user with req mail 
        const user = await User.findOne({mail: mail.toLowerCase()});
        if(user && ( await bcrypt.compare(password, user.password))){
            // send new token 

            const token = jwt.sign({
                userId: user._id,
                mail
            },
            process.env.JWT_TOKEN, 
            {
                expiresIn: '24h'
            });

            return res.status(200).json({
                userDetails: {
                    mail: user.mail,
                    token: token,
                    username: user.username
                }
            });
        }

        return res.status(400).send("Invalid credentials. Please Try again!");

    } catch (error) {
        return res.status(500).send("Please Try again!");
    }
};


module.exports = login;