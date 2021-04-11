const router=require('express').Router()
const User=require('../model/User');
const joi=require('@hapi/joi');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');


const user_validate_Schema=joi.object({
    name:joi.string().min(6).required(),
    email:joi.string().min(6).email().required(),
    password:joi.string().min(6).required()
})


const login_user_validate_Schema=joi.object({
    email:joi.string().min(6).email().required(),
    password:joi.string().min(6).required()
})


router.post('/register',async (req,res)=>{
    const {error}=user_validate_Schema.validate(req.body);
  //  console.log(validUser);

  if(error)
  {
      return res.status(400).send("Not A Valid User"); 
  }
const userExist=await User.findOne({email:req.body.email});

if(userExist)
  {
      return res.status(400).send("User Already Exists"); 
  }

  const salt= await bcrypt.genSalt(10);
  const hashedpassword=await bcrypt.hash(req.body.password,salt);


    //res.send(validUser.error.details[0].message);
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    });
    
try{
    const createduser= await newUser.save()
    res.send(createduser);
}
catch(err)
{
res.status(400).send(err);
}

});

router.post('/login',async (req,res)=>{

const {error}=login_user_validate_Schema.validate(req.body);

if(error)
{
    return res.status(404).send(error.details[0].message);
}

const userexist=await User.findOne({email:req.body.email});
if(!userexist)
{
    return res.status(404).send("Email do not exist");
}

const validpass=await bcrypt.compare(req.body.password, userexist.password);
if(!validpass)
{
    return res.status(404).send("Password Incorrect");
}
 const token=jwt.sign({_id:userexist._id},process.env.SECRET_TOKEN);
    res.status(404).send({"message":"Logged in Successfully","token":token});

});



module.exports=router 