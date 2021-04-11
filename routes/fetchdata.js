const router= require('express').Router();
const verifytoken=require('./verifytoken')


router.get('/data',verifytoken,(req,res)=>{
    res.send("You can access the data");
});

module.exports=router;