const express=require('express')
const router=express.Router()
const bp=require('body-parser')
const bc=require('bcrypt')
const http=require('http')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const {client}=require('./schemas.js')
const {errorCheck}=require('./utils.js')

router.use(cors( {
    origin: 'http://localhost:5173', // Allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow   
  }))
  async function verify(req){
    try{
      
    const token=req.headers.auth
    if(token&& token.length){
    req.user=jwt.verify(token,process.env.JWT_KEY)
    req.user=req.user.user
    }
    }
    catch(e){
      console.log(e.message)
    }
  }
router.post('/login',async(req,res)=>{
verify(req)
  




    console.log("login")
    
    try{
    
      
    
      if(req.user){
        res.json({status:false,message:"You Are Already Connected"})
      }
      else{
        //not logged
        let em=await req.body.email;
        let pass= await req.body.password;
        if(errorCheck([em,pass])){
    
    
    
          let dt=null;
        await client.findOne({email:em})
        .then((data)=>{dt=data})
        .catch(()=>{console.log("error while finding one")})
       if(dt){
        let authed=await bc.compare(pass,dt.password)
        if(authed){
        const token=await jwt.sign({user:em},process.env.JWT_KEY,{expiresIn:'30d'})
        req.user=em;
        res.json({status:true,message:"Connected Successfully",token:token})
    
    
        }
        else{
          
        res.json({status:false,message:"Wrong Password"})
        }
        
       }
       
       else{
        res.json({status:false,message:"Email Not Existing \n Please Register"})
    
    
    
    
    }
    
    }
    
    else{
      //input error
      console.log("d")
    res.json({status:false,message:"Input Error"})
    }
      }
    
    
    }
    catch(e){
      console.log("error "+e.message+" "+e.stack)
      res.json({status:false,message:"Internal Error"}).status(500)
    }
    
    
        
    
    })
    
    router.post('/register',async(req,res)=>{
    
    verify(req)
    
    
    console.log("attempt")
    
    try{
    
      
    
      if(req.user){
        res.json({status:false,message:"You Are Already Connected"})
      }
      else{
        //not logged
        let em=await req.body.email;
        let pass= await req.body.password;
        let cpass= await req.body.confirmPassword;
        let ep=await(cpass==pass)
        let age=await req.body.age;
        let fn=await req.body.firstName;
        let ln=await req.body.lastName;
        let nationality=await req.body.nationality;
        let dt;
        if(errorCheck([em,pass,cpass,age,fn,ln])&&!isNaN(parseInt(age))){
    
    
    
          
        await client.findOne({email:em})
        .then((data)=>{dt=data})
        .catch(()=>{console.log("error while finding one")})
       if(dt){
        res.json({status:false,message:"Email Already Used \n If its yours Proceed to Login"})
        
       }
       else if(pass.length<6){
        res.json({status:false,message:"Password minimum length is 6 characters"})
    
       }
       else if(!ep){
           res.json({status:false,message:"Passwords Dont Match"})
       }
       else if(age<18||age>200){
    
        res.json({status:false,message:"Invalid age (At least 18)"})
    
       }
       
       else{
            
          
    
         
    
        let ps= await bc.hash(req.body.password,10);
        let newClient=await new client({email:em,password:ps,age:parseInt(age),firstName:fn,lastName:ln,nationality:nationality,age:age})
       // console.log(usere)
        await newClient.save()
         res.json({status:true,message:"Your account is registered successfully, Please Proceed To Login"});
      }
    
    
        }
    
        else{
          //input error
        res.json({status:false,message:"Input Error",status:false})
        }
      }
    
    
    
    
    }
    catch(e){
      console.log("error "+e.message+" "+e.stack)
      res.json({status:false,message:"Internal Error"}).status(500)
    }
    
        
    })

console.log("routing")

module.exports=router