const router = require('express').Router();
const streamSchema  = require('../models/stream')
const authenticate = require('../middleware/authtoken')



router.post('/createstream/:id',authenticate,(req,res)=>{
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
router.get('/getstreams/:user?',(req,res)=>{
    if(req.query.list){
        const data = JSON.parse(req.query.list);
        let finalStreams  = []
        streamSchema.find()
            .then(streams=>{
                finalStreams = streams.filter((s=>data[`${s.key}`]!==undefined))
                 res.status(200).json(finalStreams)
            })
            .catch(err=>{
                console.log(err);
                res.sendStatus(500);
            })
            return;
    }
    if(req.params.user){
        streamSchema.find({email:req.params.user})
            .then(data=>{
                 res.status(200).json(data);
            })
            .catch(err=>{
                console.log(err);
                 res.sendStatus(500);
            })
            return ;
    }
    streamSchema.find().
        then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.sendStatus(500)
        })
})


router.put('/update/:key',authenticate,(req,res)=>{
    streamSchema.findOneAndUpdate({ 
            key:req.params.key
        },
        {
            title : req.body.title,
            description : req.body.description
        },{
            new:true
        },function(err,data){
            if(err){
                console.log(err);
                return res.status(500).json(false);
            }
            if(data===null){
                return res.status(404).json(false)
            }
            return  res.status(200).json(true)
        })
        
})

router.delete('/delete/:key',authenticate,(req,res)=>{
    streamSchema.findOneAndDelete({key:req.params.key})
        .then(data=>{
            if(data === null)
                return res.status(404).json(false)
            res.status(200).json(true);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(false);
        })
})

module.exports = router