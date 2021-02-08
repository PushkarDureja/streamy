const   express = require('express'),
        app = express(),
        mongoose  = require('mongoose'),
        userRouter  = require('./routes/user'),
        streamRouter = require('./routes/stream'),
        authRouter = require('./routes/auth')
        request = require('request'),
        path = require("path"),
        job     = require('./helper/cron');
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const mongoURL = 'mongodb+srv://naman:samranaman@123@authprocluster.onzij.gcp.mongodb.net/streamy?retryWrites=true&w=majority'
const options = {useNewUrlParser:true,useUnifiedTopology: true};


const dbconnect = mongoose.connect(mongoURL,options);
dbconnect
    .then(()=>console.log("mongo initialised"))
    .catch((err)=>console.log(err))

    app.use('/images',express.static(path.join('./thumbnails')))


app.use('/api/user',userRouter);
app.use('/api/stream',streamRouter);
app.use('/api/auth',authRouter)

job.start()

app.listen(8000,()=>console.log("server started"))
