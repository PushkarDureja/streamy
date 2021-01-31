const router = require('express').Router();
const UserSchema = require('../models/stream')
const {nanoid} = require('nanoid')


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


router.put('/createstream/:id',(req,res)=>{
    const {title,description} = req.body
    const streamObj = {
        key : nanoid(),
        title : title,
        description : description
    }
    UserSchema.findOneAndUpdate({email:req.params.id},{
        $push : {
            Streams : streamObj
        }
    })
        .then(done=>{
            if(done){
                console.log("success");
                res.sendStatus(200);
            }
            else {
                console.log("email not found in db");
                res.sendStatus(404)
            }
    })
        .catch(err=>{
            console.log(err);
            res.sendStatus(500)
        })
})


router.get('/streams',(req,res)=>{
    UserSchema.find().
        then(data=>{
            
            const finalData = data.filter(stream=>stream.Streams.length!=0)
            res.status(200).json(finalData)
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(500)
        })
})

module.exports = router