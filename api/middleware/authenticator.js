const Token = require('../models/token')

async function authenticator(req,res,next){
    try{
        const userToken = req.headers('authorization')

        if(userToken == 'null'){
            throw new Error('User not authorized')
        }else {
            const validToken = await Token.getOneByToken(userToken)
            if (validToken){
                next()
            }
        }

    }catch(err){
        res.status(403).json({
            error: err
        });
    }
}

module.exports = authenticator
