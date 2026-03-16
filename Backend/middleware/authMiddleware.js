const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){

    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.send(" token not provided")
    }

    const token = authHeader.split(" ")[1]

    try{

        const decoded = jwt.verify(token, "secretkey")

        req.user = decoded

        next()

    }catch(err){

        res.send("invalid token")

    }

}

module.exports = authMiddleware