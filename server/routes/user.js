const router = require('express').Router();
const UserSchema = require('../models/user')
const streamSchema  = require('../models/stream')


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
    UserSchema.create(req.body)
    .then(()=>{
        console.log("saved")
        res.sendStatus(200)
    }
    )
    .catch((err)=>{console.log(err)
        res.sendStatus(404)
    })
})


router.post('/createstream/:id',(req,res)=>{
    const {title,description,key} = req.body
    const streamObj = {
        email : req.params.id,
        key : key,
        title : title,
        description : description
    }

    streamSchema.create(streamObj)
        .then(done=>{
            res.sendStatus(200);
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(500);
        })

})
router.get('/streams',(req,res)=>{
    streamSchema.find().
        then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(500)
        })
})

module.exports = router