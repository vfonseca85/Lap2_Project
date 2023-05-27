const bcrypt = require('bcrypt');

const User = require('../models/user');
const token = require('../models/token');

async function register (req, res) {
    try{
        const data = req.body
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
        data['password'] = await bcrypt.hash(data['password'], salt)
        const result = await User.create(data)
        res.status(200).json({
            success : true,
            result: result
        })
    }catch(err){
        res.status(400).json({
            success: false,
            error: err
        })
    }
};

async function login (req, res) {
    try{
        const data = req.body
        const user = await User.getOneByUsername(data.username) // username 
        const authenticated = await bcrypt.compare(data.password, user.password) // comparing passwords
        if (!authenticated){
            throw new Error('Incorrect credentials')
        }else{
            const token = await Token.create(user.id)
            res.status(200).json({
                success: true,
                authenticated: true,
                token: token
            })
        }

    }catch(err){
        res.status(403).json({
            success: false,
            error: err
        })
    }
}

module.exports = {
    register, login
}                           
