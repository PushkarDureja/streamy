const router = require('express').Router();
const  jwt = require('jsonwebtoken')

router.post('/',(req,res)=>{
     const token = jwt.sign({
        user : req.body.user
     },process.env.KEY)

     res.status(200).json({token})
})

module.exports = router