const express= require('express')
const app=express()
const authroute=require('./routes/auth')
const dataroute=require('./routes/fetchdata')
const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config();
//Connect_To_DB
mongoose.connect(process.env.DB_CONNECT
,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(data=>{
console.log('Connected to database')
app.listen(3000,()=>console.log('Server is up and running'))
});

app.use(express.json());

//middleware
app.use('/fetch',dataroute);
app.use('/', authroute);

