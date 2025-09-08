const jwt = require('jsonwebtoken')



const seceret='@acb123'

function createJwtToken(user){

    const payloads={
        _id:user._id,
        fullName:user.fullName,
        profileImageUrl:user.profileImageUrl
    }

    const jwtToken =jwt.sign(payloads,seceret)

    return jwtToken
}

function validateToken(token){
    const payload = jwt.verify(token,seceret)
    return payload
}

module.exports={createJwtToken, validateToken}