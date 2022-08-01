const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async(req, res)=>{
    try {
        const { username, password, mail } = req.body;

        // check user exists or not 
        const userExists = await User.exists({mail: mail.toLowerCase()});
        if(userExists){
            return res.status(409).send("E-mail already in use!");
        }

        // encrypt password 
        const encryptPassword = await bcrypt.hash(password, 10);

        // create user document & save in database
        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptPassword
        })

        // create JWT token 
        const token = jwt.sign({
            userId: user._id,
            mail
        },
        process.env.JWT_TOKEN, 
        {
            expiresIn: '24h'
        });
        
        res.status(201).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: username
            }
        });

    } catch (error) {
        return res.status(500).send("Please Try again!");
    }
};


module.exports = register;