const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); 
const bodyParser = require('body-parser')
const url = 'mongodb+srv://lotusbiswas:lotusbiswas@cluster0.1zfsoap.mongodb.net/requesttalk'
// const url = 'mongodb://localhost:27017/newCollection'

// Initliaze express server 
const app = express();app.use(cors());
app.use(bodyParser.urlencoded({  useNewUrlParser: true,
    useUnifiedTopology: true
  }));

app.use(bodyParser.json())

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected');
})

// app.use('/', (req,res)=>{
//     res.json({
//      "status": "Live working fine !"
//     });
//  });

// Router 
const userRouter = require('./routes/user');
// const listing = require('./routes/listing');
// const requestRouter = require('./routes/request') 
// const freeBorrowListing = require('./routes/freeBorrowListing');
// const freeWantedListing = require('./routes/freeWantedListing');

app.use('/user', userRouter);
// app.use('/user/listing', listing);
// app.use('/user/request', requestRouter);
// app.use('/user/listing/freeBorrow', freeBorrowListing);
// app.use('/user/listing/freeWanted', freeWantedListing);


app.listen(9000, () => {
    console.log('Server is listening on port 9000')
})