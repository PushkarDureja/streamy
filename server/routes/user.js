const router = require('express').Router();
const UserSchema = require('../models/user')
const jwt = require('jsonwebtoken')

router.get('/user',(req,res)=>{
    UserSchema.find({})
        .then(data=>{
            res.status(200).json(data);
    })
        .catch(err=>{
            res.sendStatus(500);
        })
})
router.post('/createuser',(req,res)=>{
    UserSchema.create({email : req.body.email})
    .then(()=>{
        console.log("saved");
        const token = jwt.sign({
            user : req.body
         },process.env.KEY)
    
         res.status(200).json({token})
    }
        )
    .catch((err)=>{console.log(err)
        res.sendStatus(404)
    })
})




module.exports = router