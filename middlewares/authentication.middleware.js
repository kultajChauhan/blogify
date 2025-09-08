const { validateToken } = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){

    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue){
          return  next()
        }

        try {
            const userpayloads = validateToken(tokenCookieValue)
            req.user=userpayloads
        } catch (error) {
            
        }
       return next()
    }
}

module.exports={checkForAuthenticationCookie}