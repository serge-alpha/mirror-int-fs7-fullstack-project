const express = require('express');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const cors = require("cors");
const createError= require('http-errors')
const cookieParser=require('cookie-parser');



const dev = require('./config');
const userRouter = require('./routes/user');
const connectDB = require('./config/db');
const bookRouter = require('./routes/books');


const app = express();
const port = dev.app.serverPort;
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(cors({
  origin:['http://localhost:3000','http://127.0.0.1:3000'],
  credentials:true
}));

app.use(cookieParser());


app.get('/', (req, res) => {
  res.send('test');
});

app.use('/api/user',userRouter);


app.use('/api/book',bookRouter);


app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  connectDB();
});

app.use((req,res,next)=>{
  next(createError(404,'Route Not Found'));
})

app.use((err,req,res,next)=>{
  res.status(err.status||500).json({
    error:{
      status:err.status,
      ok:false,
      message:err.message,
    }
  })
})