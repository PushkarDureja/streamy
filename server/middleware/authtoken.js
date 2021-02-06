const jwt  = require('jsonwebtoken')

function authenticate (req,res,next){
    let header = req.headers['authorization'];
    let token;
    if(header){
        token = header.split(' ')[1];
    }
     
    if(token){
        jwt.verify(token,process.env.KEY,(err,done)=>{
            if(err){
                return res.status(401).json({error : "unauthorized"})
            }
            next();
        })
    }
    else {
        return res.status(401).json({error : "Unauthorized"})
    }
}
module.exports = authenticate