const express=require('express')
const app=express()
const bp=require('body-parser')
const bc=require('bcrypt')
const http=require('http')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const {client,hotels,bookings}=require('./schemas.js')
const {errorCheck}=require('./utils.js')
const router=express.Router()
const auth=require('./authentication.js')
const multer=require('multer')
const fs=require('fs')
const path=require('path')
const request=require('request')
const { Console } = require('console')
const upload=multer({dest:'backend/uploads/'})
async function checkAdmin(email){
let user=await client.findOne({email:email})
if(!user)return false;
return(user.adminState)


}
app.use(bp.urlencoded({extended:'false'}))
app.use(bp.json())
app.use('/auth',auth)
app.use(cors( {
    origin: 'https://resazenb2b.com', // Allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow   
  }))
  
const socketIo=require("socket.io")
const { DESTRUCTION } = require('dns')
const server=http.createServer(app)
const io=socketIo(server,{  cors: {
  origin: 'https://resazenb2b.com', // Your React client URL
  methods: ['GET', 'POST'],
  credentials: true
}})

async function  updateReservations(){
let books=await bookings.find({status:1})
let pendingBooks=await bookings.find({status:0})


await books.map(async(book)=>{
let checkout=new Date(book.checkOut)
let now =new Date()
let out=checkout.getDate()<now.getDate()&&checkout.getFullYear()<=now.getFullYear()&&checkout.getMonth()<=now.getMonth()



//returning booked rooms after echeckout
if(out){
  //exceeded
  try{
    await bookings.findOneAndUpdate({_id:book._id},{status:5}) 
   
    await client.updateOne({email:book.id,"reservations._id":book._id},{$set:{"reservations.$.status":5}})
    returnRooms(book._doc)

    io.emit(book._id,5)
  }
  catch(e){
    console.log(e)
  }
 // console.log(res)
}
})
//************************************ */






await pendingBooks.map(async(book)=>{
  let checkin=(new Date(book.checkIn))
  let now =(new Date())
    
let incheck=checkin.getDate()<now.getDate()&&checkin.getFullYear()<=now.getFullYear()&&checkin.getMonth()<=now.getMonth()

  
  //returning booked rooms after checkin
  if(incheck){
    //exceeded
    try{
      await bookings.findOneAndUpdate({_id:book._id},{status:4}) 
     
      await client.updateOne({email:book.id,"reservations._id":book._id},{$set:{"reservations.$.status":4}})
      returnRooms(book._doc)
      io.emit(book._id,5)
  
    }
    catch(e){
      console.log(e)
    }
   // console.log(res)
  }
  })
  //************************************ */



console.log("updated bookings")
}
setInterval(()=>{
  request.get('http://localhost:3000')
  updateReservations()
},3000000)

async function returnRooms(booking){
  console.log("retttttttttttttttttttttttttttttttt")
  let hotel=await hotels.findById({_id:booking.hotelId})
  for(let room in booking.bookedRooms){
    console.log(hotel.rooms)
    let theRoom=booking.bookedRooms[room]
    console.log(theRoom)
          if(theRoom.status){
            hotel.rooms[room].units+=theRoom.units
            console.log(theRoom.units)
            console.log(hotel.rooms[room])
            if(hotel.rooms[room].units>0)
            hotel.rooms[room].status=true
          }
  }
  console.log(hotel.rooms)
  await hotels.findOneAndUpdate({_id:booking.hotelId},{rooms:hotel.rooms})
}


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
function isNotFull(h){
  for(let room in h.rooms){
    let theRoom=h.rooms[room]
    if(theRoom.status&&theRoom.units>0)return true;
  }return false;
}
async function stringDate(){
  let now=new Date()
  let day=now.getDate()
  let month=now.getMonth()+1
  let year=now.getFullYear()
  return year+"-"+month+"-"+day
}


app.get('/getAuth',async(req,res)=>{
    try{
      
    
  verify(req);
  if(req.user){
   let user=await client.findOne({email:req.user})
   return res.json({status:true,message:"",auth:true,user:{firstName:user.firstName,age:user.age,lastName:user.lastName,nationality:user.nationality}})
  }
  return res.json({status:true,message:"",auth:false})}
  catch(e){
    
  return res.json({status:false,message:"Internal Error",auth:false})}
  
})
server.listen((3000),()=>{console.log('listening on port 3000')})
app.post('/logout',async(req,res)=>{
  verify(req)
  
  if(req.user){

    res.json({status:true,logoutStatus:true})
  }
  else{
    res.json({status:false,logoutStatus:false})
  }
})
app.post('/isAdmin',async(req,res)=>{
  verify(req)
  console.log("admin check")
  if(req.user){
    const admin=await client.findOne({email:req.user})
  
      res.json({status:true,logoutStatus:true,isAdmin:admin.adminState})
    
  }
  else{
    res.json({status:false,logoutStatus:false})
  }
})


function extractExtension(s){
  let extension=""
  for(let p=s.length-1;p>-1;p--){
    if(s[p]=='.')break
    extension=s[p]+extension
  }
  return extension
 }
app.post('/file',upload.array('image'),async(req,res)=>{
  verify(req)
  if(req.user){
    let check=await checkAdmin(req.user)

    
  const file=req.files
  const {seasons,hotelDescription,hotelLocation,hotelName,hotelPhone,hotelEmail,hotelResponsible,region,stars,parking,wifi,singleRoom,doubleRoom,tripleRoom,quadrupleRoom,familyRoom,commission,PCStatus,PCPStatus,DPStatus,DPPStatus,LOStatus,LPDStatus,ALLINStatus,ALLINSOFTStatus}=await req.body
  const {
    PC,PCP,DP,DPP,LO,LPD,ALLIN,ALLINSOFT,
  }=await req.body


  const {
    SS,SSStatus,
    SVM,SVMStatus,
    SVP,SVPStatus,
  }=await req.body

  
  const {
    RAC,RACStatus,
    RPC,RPCStatus,
    RSR,RSRStatus,
    RTF,RTFStatus,
    RCAges
  }=await req.body
  if(file){
    try{

    
    let fileNames=[]
    for(let image of file){
      const name=image.originalname
      fileNames.push(name)
      const extension=extractExtension(name).toLowerCase()
      if(extension!='png'&&extension!="jpg"){
        return res.json({status:false,message:'Wrong File Format'})

      }
        
    }
    const imageLinks=[]
    for(let image of file){
      console.log("path")
      const newPath =path.join(__dirname, 'images', image.originalname);
      imageLinks.push(newPath)
      const oLPDath=path.join(__dirname,'uploads',image.filename)
     
    fs.renameSync(oLPDath,newPath)}
    let rooms={}
    if(singleRoom){
      rooms["singleRoom"]={...JSON.parse(singleRoom),status:true}

    }
    if(doubleRoom){
      rooms["doubleRoom"]={...JSON.parse(doubleRoom),status:true}

    }
    if(tripleRoom){
      rooms["tripleRoom"]={...JSON.parse(tripleRoom),status:true}

    }
    if(quadrupleRoom){
      rooms["quadrupleRoom"]={...JSON.parse(quadrupleRoom),status:true}

    }
    if(familyRoom){
      rooms["familyRoom"]={...JSON.parse(familyRoom),status:true}

    }
    let additionalImages=[]
    //extracting addictional images
    for(let imgIndex=2;imgIndex<fileNames.length;imgIndex++){
         additionalImages.push(fileNames[imgIndex])
    }
    for(let imgIndex=fileNames.length;imgIndex<6;imgIndex++){
         additionalImages.push("")
    }
    let seasonal=JSON.parse(seasons)
    let seasonsObject=[]
    console.log(seasonal)
    seasonal.map((season)=>{
      let obj={from:season.fromDate,to:season.toDate,
        LPDStatus:season.LPDStatus,
        PCStatus:season.PCStatus,
        PCPStatus:season.PCPStatus,
        DPStatus:season.DPStatus,
        DPPStatus:season.DPPStatus,
        ALLINStatus:season.ALLINStatus,
        ALLINSOFTStatus:season.ALLINSOFTStatus,
      }
    if(season.LOStatus){
      console.log("done")
      obj.LO={price:season.LO}}
    if(season.LPDStatus){
      console.log("done")
      console.log(LPDStatus)
      obj.LPD={price:season.LPD}}
    if(season.ALLINStatus){
      obj.ALLIN={price:season.ALLIN}}
    if(season.PCStatus){
      console.log("done")
      obj.PC={price:season.PC}}
    if(season.DPStatus){
      obj.DP={price:season.DP}}
    if(season.ALLINSOFTStatus){
      obj.ALLINSOFT={price:season.ALLINSOFT}}
    if(season.PCPStatus){
      obj.PCP={price:season.PCP}}
    if(season.DPPStatus){
      obj.DPP={price:season.DPP}}
   seasonsObject.push(obj)

    })
    const newHotel={
      hotelLocation:hotelLocation,
      hotelDescription:hotelDescription,
      hotelName: hotelName,
      hotelPhone: hotelPhone,
      hotelEmail: hotelEmail,
      hotelResponsible: hotelResponsible,
      region: region,
      stars: stars,
      parking: parking,
      wifi: wifi,
      rooms:rooms,
      commission: commission,
      mainImage:fileNames[0],
      firstImage:fileNames[1],
      additionalImages:additionalImages,
      status:true,
      LOStatus:LOStatus,
      LPDStatus:LPDStatus,
      DPPStatus:DPPStatus,
      PCPStatus:PCPStatus,
      PCStatus:PCStatus,
      DPStatus:DPStatus,
      ALLINStatus:ALLINStatus,
      ALLINSOFTStatus:ALLINSOFTStatus,
      seasons:seasonsObject,

      SSStatus:SSStatus,
      SVMStatus:SVMStatus,
      SVPStatus:SVPStatus,
      RPCStatus:RPCStatus,
      RACStatus:RACStatus,
      RSRStatus:RSRStatus,
      RCAges:JSON.parse(RCAges),
      RTFtatus:RTFStatus,
    }


    if(SVMStatus=="true"){
      newHotel.SVM=SVM}
    if(SVPStatus=="true"){
      newHotel.SVP=SVP}
    if(SSStatus=="true"){
      newHotel.SS=SS}

      
    if(RPCStatus=="true"){
      newHotel.RPC=RPC}
      if(RTFStatus=="true"){
        newHotel.RTF=RTF}
    if(RACStatus=="true"){
      newHotel.RAC=RAC}
    if(RSRStatus=="true"){
      newHotel.RSR=RSR}

    if(LOStatus=="true"){
      console.log("done")
      newHotel.LO={price:LO}}
    if(LPDStatus=="true"){
      console.log("done")
      console.log(LPDStatus)
      newHotel.LPD={price:LPD}}
    if(ALLINStatus=="true"){
      newHotel.ALLIN={price:ALLIN}}
    if(PCStatus=="true"){
      console.log("done")
      newHotel.PC={price:PC}}
    if(DPStatus=="true"){
      newHotel.DP={price:DP}}
    if(ALLINSOFTStatus=="true"){
      newHotel.ALLINSOFT={price:ALLINSOFT}}
    if(PCPStatus=="true"){
      newHotel.PCP={price:PCP}}
    if(DPPStatus=="true"){
      newHotel.DPP={price:DPP}}
   




    let hotelObject=new hotels(newHotel)
    await hotelObject.save()
    res.json({status:true,message:"Hotel Added Successfully"})}
    catch(e){
      console.log(e.message+" "+e.stack)
      res.json({status:false,message:'Internal Error'})
    }

  }else{
    
    res.json({status:false,message:"Not Authorized"})
  }
  }
  else{
    res.json({status:false,message:"Pictures Not Existing"})

  }

})
function cmp(a,b){
  if(a.rating<b.rating)return 1;
  if(a.rating>b.rating)return -1;
  return 0
}
app.post("/getHotels",async(req,res)=>{
  verify(req);


  if(req.user){
    //authed
      try{
        
      let allHotels=await hotels.find()
      let hotelArray=[]
      for(let h of allHotels){
        let hotel=JSON.parse(JSON.stringify(h))
       if(isNotFull(hotel)&&hotel.status){
        let seasonObj=[]
        hotel.seasons.map((season)=>{
          seasonObj.push({
            ...season,
            toDate:(season.to),
            fromDate:(season.from),
            ALLIN:season.ALLIN.price,
            ALLINSOFT:season.ALLINSOFT.price,
            LPD:season.LPD.price,
            DP:season.DP.price,
            DPP:season.DPP.price,
            PC:season.PC.price,
            PCP:season.PCP.price,
            ALLINStatus:season.ALLINStatus,
            ALLINSOFTStatus:season.ALLINSOFTStatus,
            LPDStatus:season.LPDStatus,
            DPStatus:season.DPStatus,
            DPPStatus:season.DPPStatus,
            PCStatus:season.PCStatus,
            PCPStatus:season.PCPStatus,

          })
        })
        hotel.seasons=seasonObj
        console.log(hotel)
        hotelArray.push(hotel)

       }
      }
      hotelArray=hotelArray.sort(cmp)
      console.log(hotelArray.length)
      res.json({status:true,hotels:hotelArray})
      }
      catch(e){
        res.json({status:false,message:"Internal Error"})

      }
    
      //not admin

    

  }
  else{
    res.json({status:false,message:"Unauthorized"})
  }

})




app.post("/getHotelsNow",async(req,res)=>{
  verify(req);


  if(req.user){
    //authed
      try{
        
      let allHotels=await hotels.find()
      let hotelArray=[]
      for(let h of allHotels){
        let hotel=JSON.parse(JSON.stringify(h))
       if(isNotFull(hotel)&&hotel.status){
        let seasonObj=[]
        hotel.seasons.map((season)=>{
          const from=new Date(season.from).getTime()
          const to=new Date(season.to).getTime()
          const now=new Date().getTime()
          if(now>=from&&now<=to){
            //current accomodations
            hotel.LPDStatus=season.LPDStatus
            if(hotel.LPDStatus)
            hotel.LPD=season.LPD
            hotel.DPStatus=season.DPStatus
            if(hotel.DPStatus)
            hotel.DP=season.DP
            hotel.DPPStatus=season.DPPStatus
            if(hotel.DPPStatus)
            hotel.DPP=season.DPP
            hotel.PCPStatus=season.PCPStatus
            if(hotel.PCPStatus)
            hotel.PCP=season.PCP
            hotel.PCStatus=season.PCStatus
            if(hotel.PCStatus)
            hotel.PC=season.PC
            hotel.ALLINStatus=season.ALLINStatus
            if(hotel.ALLINStatus)
            hotel.ALLIN=season.ALLIN
            hotel.ALLINSOFTStatus=season.ALLINSOFTStatus
            if(hotel.ALLINSOFTStatus)
            hotel.ALLINSOFT=season.ALLINSOFT

          }
          seasonObj.push({
            ...season,
            toDate:(season.to),
            fromDate:(season.from),
            ALLIN:season.ALLIN.price,
            ALLINSOFT:season.ALLINSOFT.price,
            LPD:season.LPD.price,
            DP:season.DP.price,
            DPP:season.DPP.price,
            PC:season.PC.price,
            PCP:season.PCP.price,
            ALLINStatus:season.ALLINStatus,
            ALLINSOFTStatus:season.ALLINSOFTStatus,
            LPDStatus:season.LPDStatus,
            DPStatus:season.DPStatus,
            DPPStatus:season.DPPStatus,
            PCStatus:season.PCStatus,
            PCPStatus:season.PCPStatus,

          })
        })
        hotel.seasons=seasonObj
        console.log(hotel)
        //updated hotel accomodation
        
        //***************************** */
        hotelArray.push(hotel)

       }
      }
      hotelArray=hotelArray.sort(cmp)
      console.log(hotelArray.length)
      res.json({status:true,hotels:hotelArray})
      }
      catch(e){
        res.json({status:false,message:"Internal Error"})

      }
    
      //not admin

    

  }
  else{
    res.json({status:false,message:"Unauthorized"})
  }

})








app.post('/saveUpdates',upload.array('image'),async(req,res)=>{
  verify(req)
  if(req.user){
    let check=await checkAdmin(req.user)

  
  const file=req.files
  const {seasons,mainImageStatus,firstImageStatus,addImage1Status,addImage2Status,addImage3Status,addImage4Status,hotelDescription,hotelId,hotelLocation,hotelName,hotelPhone,hotelEmail,hotelResponsible,region,stars,parking,wifi,singleRoom,doubleRoom,tripleRoom,quadrupleRoom,familyRoom,commission,PCStatus,PCPStatus,DPStatus,DPPStatus,LOStatus,LPDStatus,ALLINStatus,ALLINSOFTStatus}=await req.body
  const {
    PC,PCP,DP,DPP,LO,LPD,ALLIN,ALLINSOFT,
  }=await req.body
  const {
    SS,SSStatus,
    SVM,SVMStatus,
    SVP,SVPStatus,
  }=await req.body
  
  const {
    RAC,RACStatus,
    RPC,RPCStatus,
    RSR,RSRStatus,
    RTF,RTFStatus,
    RCAges
  }=await req.body

  console.log(addImage1Status)
  console.log(addImage2Status)
  console.log(addImage3Status)
  console.log(addImage4Status)
  console.log(mainImageStatus)
  console.log(firstImageStatus)
  console.log("seasons")
  console.log(seasons)
  if(file){
    try{

    
    let fileNames=[]
    console.log(file)
    for(let image of file){
      console.log("image in editor")
      console.log(image)
      const name=image.originalname
      fileNames.push(name)
      const extension=extractExtension(name).toLowerCase()
      if(extension!='png'&&extension!="jpg"){
        return res.json({status:false,message:'Wrong File Format'})

      }
        
    }
    const imageLinks=[]
    for(let image of file){
      console.log("path")
      const newPath =path.join(__dirname, 'images', image.originalname);
      imageLinks.push(newPath)
      const oLPDath=path.join(__dirname,'uploads',image.filename)
     
    fs.renameSync(oLPDath,newPath)}
    let rooms={}
    if(singleRoom){
      rooms["singleRoom"]={...JSON.parse(singleRoom),status:true}

    }
    else{
      rooms["singleRoom"]={status:false,units:0,price:0}

    }
    if(doubleRoom){
      rooms["doubleRoom"]={...JSON.parse(doubleRoom),status:true}

    }
    else{
            rooms["doubleRoom"]={status:false,units:0,price:0}
    }
    if(tripleRoom){
      rooms["tripleRoom"]={...JSON.parse(tripleRoom),status:true}

    }
    else{
            rooms["tripleRoom"]={status:false,units:0,price:0}
    }
    if(quadrupleRoom){
      rooms["quadrupleRoom"]={...JSON.parse(quadrupleRoom),status:true}

    }
    else{
            rooms["quadrupleRoom"]={status:false,units:0,price:0}
    }
    if(familyRoom){
      rooms["familyRoom"]={...JSON.parse(familyRoom),status:true}

    }
    else{
            rooms["familyRoom"]={status:false,units:0,price:0}
    }
    let additionalImages=[]

    let seasonal=JSON.parse(seasons)
    let seasonsObject=[]
    console.log(seasonal)
    seasonal.map((season)=>{
      let obj={from:season.fromDate,to:season.toDate,
        LPDStatus:season.LPDStatus,
        PCStatus:season.PCStatus,
        PCPStatus:season.PCPStatus,
        DPStatus:season.DPStatus,
        DPPStatus:season.DPPStatus,
        ALLINStatus:season.ALLINStatus,
        ALLINSOFTStatus:season.ALLINSOFTStatus,
      }
    if(season.LOStatus){
      console.log("done")
      obj.LO={price:season.LO}}
    if(season.LPDStatus){
      console.log("done")
      console.log(LPDStatus)
      obj.LPD={price:season.LPD}}
    if(season.ALLINStatus){
      obj.ALLIN={price:season.ALLIN}}
    if(season.PCStatus){
      console.log("done")
      obj.PC={price:season.PC}}
    if(season.DPStatus){
      obj.DP={price:season.DP}}
    if(season.ALLINSOFTStatus){
      obj.ALLINSOFT={price:season.ALLINSOFT}}
    if(season.PCPStatus){
      obj.PCP={price:season.PCP}}
    if(season.DPPStatus){
      obj.DPP={price:season.DPP}}
   seasonsObject.push(obj)

    })
    console.log("seasonsObject")
    console.log(seasonsObject)
    const newHotel={
      hotelLocation:hotelLocation,
      hotelDescription:hotelDescription,
      hotelName: hotelName,
      hotelPhone: hotelPhone,
      hotelEmail: hotelEmail,
      hotelResponsible: hotelResponsible,
      region: region,
      stars: stars,
      parking: parking,
      wifi: wifi,
      rooms:rooms,
      commission: commission,
      status:true,
      LOStatus:LOStatus,
      LPDStatus:LPDStatus,
      DPPStatus:DPPStatus,
      PCPStatus:PCPStatus,
      PCStatus:PCStatus,
      DPStatus:DPStatus,
      ALLINStatus:ALLINStatus,
      ALLINSOFTStatus:ALLINSOFTStatus,
      seasons:seasonsObject,
      SSStatus:SSStatus,
      SVMStatus:SVMStatus,
      SVPStatus:SVPStatus,
      RPCStatus:RPCStatus,
      RACStatus:RACStatus,
      RSRStatus:RSRStatus,
      RTFStatus:RTFStatus,
      RCAges:JSON.parse(RCAges),


    }

    if(SVMStatus){
      newHotel.SVM=SVM}
    if(SVPStatus){
      newHotel.SVP=SVP}
    if(SSStatus){
      newHotel.SS=SS}

      console.log("rpc")
      console.log(RPC)
      console.log(RAC)
      console.log(RSR)
        
      if(RPCStatus){
        newHotel.RPC=RPC}
      if(RACStatus){
        newHotel.RAC=RAC}
      if(RSRStatus){
        newHotel.RSR=RSR}
        if(RTFStatus){
          newHotel.RTF=RTF}

      console.log(SSStatus)
      console.log(SS)
      console.log(SVMStatus)
      console.log(SVM)
      console.log(SVPStatus)
      console.log(SVP)
    let hotel=await hotels.findById({_id:hotelId})
    let ind=0;
    console.log(hotel)
    if(mainImageStatus=='true'){
      newHotel.mainImage=fileNames[ind++]
    }
    if(firstImageStatus=='true'){
      newHotel.firstImage=fileNames[ind++]
    }
    if(addImage1Status=='true'){
      hotel.additionalImages[0]=fileNames[ind++]
    }
    if(addImage2Status=='true'){
      hotel.additionalImages[1]=fileNames[ind++]
    }
    if(addImage3Status=='true'){
      hotel.additionalImages[2]=fileNames[ind++]
    }
    if(addImage4Status=='true'){
      hotel.additionalImages[3]=fileNames[ind++]
    }
    console.log("hotel.additionalImages")
    console.log("hotel.additionalImages")
    console.log("hotel.additionalImages")
    console.log("hotel.additionalImages")
    console.log("hotel.additionalImages")
    console.log("hotel.additionalImages")
    console.log(hotel.additionalImages)
    newHotel.additionalImages=hotel.additionalImages

    if(LOStatus=="true"){
      console.log("done")
      newHotel.LO={price:LO}}
    if(LPDStatus=="true"){
      console.log("done")
      console.log(LPDStatus)
      newHotel.LPD={price:LPD}}
    if(ALLINStatus=="true"){
      newHotel.ALLIN={price:ALLIN}}
    if(PCStatus=="true"){
      console.log("done")
      newHotel.PC={price:PC}}
    if(DPStatus=="true"){
      newHotel.DP={price:DP}}
    if(ALLINSOFTStatus=="true"){
      newHotel.ALLINSOFT={price:ALLINSOFT}}
    if(PCPStatus=="true"){
      newHotel.PCP={price:PCP}}
    if(DPPStatus=="true"){
      newHotel.DPP={price:DPP}}
   
      console.log(newHotel)


    await hotels.findOneAndUpdate({_id:hotelId},newHotel)
    res.json({status:true,message:`Hotel ${hotelName} Updated Successfully`})


  }
    catch(e){
      console.log(e.message+" "+e.stack)
      res.json({status:false,message:'Internal Error'})
    }

  }else{
    
    res.json({status:false,message:"Not Authorized"})
  }
  }
  else{
    res.json({status:false,message:"Pictures Not Existing"})

  }

})





app.post('/updateHotelStatus',async(req,res)=>{
  verify(req)
  if(req.user){
    const checker=await checkAdmin(req.user)
    if(checker){
      try{
        await hotels.findOneAndUpdate({_id:req.body.hotelId},{status:!req.body.hotelStatus})
        const newState=(req.body.hotelStatus?"Disabled":"Enabled")
        res.json({status:true,message:"Hotel Status is "+newState})
      }
      catch(e){

        res.json({status:false,message:"Internal Error"})
      }

    }
    else{
      res.json({status:false,message:"not AUTHORIZED"})
    }
  }
  else{
    
    res.json({status:false,message:"not Authenticated"})
  }
})



app.post('/deleteHotel',async(req,res)=>{
  verify(req)
  if(req.user){
    const checker=await checkAdmin(req.user)
    if(checker){
      try{
        console.log(req.body.hotelId)
        await hotels.findOneAndDelete({_id:req.body.hotelId})
        res.json({status:true,message:"Hotel is Deleted"})
      }
      catch(e){

        res.json({status:false,message:"Internal Error"})
      }

    }
    else{
      res.json({status:false,message:"not AUTHORIZED"})
    }
  }
  else{
    
    res.json({status:false,message:"not Authenticated"})
  }
})

app.post('/rate',async(req,res)=>{
  console.log("rate")
  verify(req)
  if(req.user){
    try{
    let id=req.body.id
    let ratings=await client.findOne({email:req.user})
    ratings=await ratings.ratings
    let hotel=await hotels.findOne({_id:req.body.id})

    console.log(ratings)
    console.log(hotel)
    console.log(req.body.rating)
    let ratable=true;
    ratings.map((rating)=>{
      if(rating==req.body.id){
         ratable=false;
      }

    })
    if(ratable){
      
    await client.findOneAndUpdate({email:req.user},{ratings:[...ratings,id]})
    let newRate=parseFloat((parseFloat(hotel.rating)+parseFloat(req.body.rating))/2)
    newRate=newRate.toFixed(1)
    await hotels.findOneAndUpdate({_id:req.body.id},{raters:hotel.raters+1,rating:newRate.toString()})

    res.json({status:true,message:"Hotel Rated Successfully"})
    }
else{
  
  res.json({status:false,message:"You Already Rated This Hotel"})
}
  }

  catch(e){
    console.log(e.message+" "+e.stack)
    res.json({status:false,message:"Internal Error"})
      
  }
    }
  else{
    res.json({status:false,message:"Not Authenticated"})
  }
})

app.get('/getHotel',async(req,res)=>{
  console.log("here")
  verify(req)
  if(req.user){
    let hotel=await hotels.findById({_id:req.body.id})
    if(hotel){
      
    console.log(hotel)
    res.json({status:true,message:"Got hotel",hotel:hotel})
    }
    else{
      res.json({status:false,message:"Hotel Not Found"})

    }

  }
  else{
    res.json({status:false,message:"Not Authenticated"})
  }
})


app.post('/book',async(req,res)=>{
  verify(req)
  if(req.user){
    try{
    const {hotelId,data,booking,preferences,checkInDate,checkOutDate}=await req.body
    const hotel=await hotels.findOne({_id:hotelId})
    const rm=["singleRoom","doubleRoom","tripleRoom","quadrupleRoom","familyRoom"];
    let rooms={};
    for(let r of rm){
      if(booking.bookedRooms[r]){
        rooms[r]={
          status:true,
          units:booking.bookedRooms[r].units,
          price:booking.bookedRooms[r].price
        }
      }
      else{
        rooms[r]={
          status:false,
          units:0,
          price:0
        }
      }
    }

    //update hotel to reserve the rooms
   let reservable=true;
    for(let room in rooms){
      console.log(rooms[room])
       if(rooms[room].status){
        console.log("here")
        if(rooms[room].units>hotel.rooms[room].units){
             reservable=false;
             break;
        }
        hotel.rooms[room].units=Math.max(0,hotel.rooms[room].units-rooms[room].units)
        if(hotel.rooms[room].units==0){
          hotel.rooms[room].status=false;
        }
       }
    }
    if(!reservable){
       res.json({status:false,message:"hotel Updated And There Are No More Rooms , Try Again"})
    }
    else{

      //we can reserve
      console.log(rooms)
      let date=stringDate()
      let today=parseInt(new Date().getTime()/1000)
      const reservationObject={
        id:req.user,
        hotelId:hotelId,
        members:booking.members,
        accomodation:booking.currentAccomodation,
        commission:hotel.commission,
        totalPrice:parseFloat(booking.totalPrice).toFixed(2),
        reduction:parseFloat(booking.reduction).toFixed(2),
        totalSupp:parseFloat(booking.totalSupp).toFixed(2),
        bookedRooms:rooms,
        date:today,
        preferences:preferences,
        data:data,
        status:0,
        checkIn:checkInDate,
        checkOut:checkOutDate,
      }
      console.log(reservationObject)
      console.log(hotel.rooms)
      await hotels.findOneAndUpdate({_id:hotelId},{rooms:hotel.rooms})
      let newRes=await new bookings(reservationObject)
      await newRes.save()  
      let oldres=await   client.findOne({email:req.user})
     
      oldres=oldres.reservations
      reservationObject['_id']=newRes["_id"]
      oldres.push(reservationObject)
      await client.findOneAndUpdate({email:req.user},{reservations:oldres})
      reservationObject["hotel"]=hotel
      io.emit('newBooking',reservationObject)
      res.json({status:true,message:'Booked Successfully'})

    }
  }
  catch(e){
    console.log(e.message+" "+e.stack)
    res.json({status:false,message:'Internal Error'})
  }


  }
  else{
    res.json({status:false,message:"Not Authenticated"})
  }

})
app.post('/getBookings',async(req,res)=>{
  verify(req)
  if(req.user){
   let state=await checkAdmin(req.user)
   if(state){
    //admin
    let reservations=await bookings.find()
let allBookings=[]
    for(let ind in reservations){
       let reservation=reservations[ind]
      let hotel=await hotels.findById({_id:reservation.hotelId})
      if(hotel){
        
          allBookings.push(JSON.parse(JSON.stringify(reservation)))
          allBookings[allBookings.length-1].hotel=hotel
      }
    }
    res.json({status:true,reservations:allBookings})
   }
   else{
    //not admin
    let reservations=await client.findOne({email:req.user})
    
    reservations=reservations.reservations
    let allBookings=[]
    for(let ind in reservations){
      let reservation=reservations[ind]
     let hotel=await hotels.findById({_id:reservation.hotelId})
     if(hotel){
     
         allBookings.push(JSON.parse(JSON.stringify(reservation)))
         allBookings[allBookings.length-1].hotel=hotel}
   }
    res.json({status:true,reservations:allBookings})
   }

  }
  else{
    res.json({status:false,message:"Not Authenticated"})


  }
})

app.post('/removeBooking',async(req,res)=>{
  verify(req)
  console.log("remoooooooooooove")
  if(req.user){
    let ver=await checkAdmin(req.user)
    if(ver){
      const {id,clientId}=req.body
      console.log(id)
      
      let booking= await bookings.findById({_id:id})
      console.log(booking)
      if(booking&&(booking.status==2||booking.status==4)){/*
      await bookings.findOneAndDelete({_id:id})
      let bookingClient=await client.findOne({email:clientId})
      bookingClient.reservations=await bookingClient.reservations.filter((res)=>{
        return res._id!=id
      })
      //console.log(bookingClient.reservations)
      await client.findOneAndUpdate({email:clientId},{reservations:bookingClient.reservations})*/
      
      await bookings.findOneAndUpdate({_id:id},{status:5})
      let bookingClient=await client.findOne({email:clientId})
      bookingClient.reservations=await bookingClient.reservations.filter((res)=>{
        if(res){
          if(res._id==id){
          return {...res._doc,status:5}
          }
          else return res;

        }
      })
      //console.log(bookingClient.reservations)
      await client.findOneAndUpdate({email:clientId},{reservations:bookingClient.reservations})
      res.json({status:true,"message":"booking has been removed successfully"})
    
  io.emit(id,3)
    }
    else{
      res.json({status:false,"message":"Invalid Action"})


      }
    }
    else 
    res.json({status:false,"message":"Not Authorized"})

  }
  else{
    res.json({status:false,"message":"Not Authenticated"})

  }
})


app.post('/declineBooking',async(req,res)=>{
  verify(req)
  console.log(req.body)
  if(req.user){
    let ver=await checkAdmin(req.user)
    if(ver){
      const {id,clientId}=req.body
      let booking= await bookings.findById({_id:id})
      if(booking&&booking.status==0){
       
      await bookings.findOneAndUpdate({_id:id},{status:2})
      let bookingClient=await client.findOne({email:clientId})
      //return rooms
      
      await returnRooms(booking)
      //******* */


      let newRes=[]
      bookingClient.reservations.map((res)=>{
        console.log(res._id+' '+id)
        if( res._id==id)
          newRes.push( {...res._doc,status:2})
       else  newRes.push( res._doc)
      })
      console.log(bookingClient)
      await client.findOneAndUpdate({email:clientId},{reservations:newRes})
      res.json({status:true,"message":"booking has been declined successfully"})

      io.emit(id,2)
    }
      else{
        res.json({status:false,"message":"Invalid Action"})
  
  
        }
    }
    else 
    res.json({status:false,"message":"Not Authorized"})

  }
  else{
    res.json({status:false,"message":"Not Authenticated"})

  }
})


app.post('/acceptBooking',async(req,res)=>{
  verify(req)
  console.log(req.body)
  if(req.user){
    let ver=await checkAdmin(req.user)
    if(ver){
      const {id,clientId}=req.body
      let booking= await bookings.findById({_id:id})
      if(booking&&booking.status==0){
       
      await bookings.findOneAndUpdate({_id:id},{status:1})
      let bookingClient=await client.findOne({email:clientId})
      let newRes=[]
      await bookingClient.reservations.map((res)=>{
        if(res){
          console.log(res._id+" "+id)
          if( res._id==id)
            newRes.push( {...res._doc,status:1})
          else newRes.push( res._doc)

        }
      })
      
  console.log("req.bodyzzzzzzzzzzzzzz")

      console.log(newRes)
      await client.findOneAndUpdate({email:clientId},{reservations:newRes})
      res.json({status:true,"message":"booking has been accepted successfully"})
    
  io.emit(id,1)
      }
      else{
      res.json({status:false,"message":"Invalid Action"})


      }
     }
    else 
    res.json({status:false,"message":"Not Authorized"})

  }
  else{
    res.json({status:false,"message":"Not Authenticated"})

  }
})


app.post('/cancelBooking',async(req,res)=>{
  verify(req)
  console.log(req.body)
  if(req.user){
    let ver=await checkAdmin(req.user)
    if(!ver){
      const {id,clientId}=req.body
      let booking= await bookings.findById({_id:id})
      console.log(booking)
      if(booking&&booking.status==0){
       let age=parseInt(((new Date().getTime()/1000)))-parseInt(booking.date)
       console.log( age)
       if(age<=86400){
            //didnt exceed 24 hrs
      
      await bookings.findOneAndUpdate({_id:id},{status:4})
      let bookingClient=await client.findOne({email:clientId})


      //*******************************return rooms
      await returnRooms(booking)
      //********************* */

      console.log(bookingClient)
      let newRes=[];
      console.log(bookingClient.reservations)
      await bookingClient.reservations.map((res)=>{
        if(res){
          
        console.log(res._id+" "+id)
        if( res._id==id)
          newRes.push({...res._doc,status:4})
        else newRes.push(res._doc)
        }
      })
  console.log("req.bodyzzzzzzzzzzzzzz")

      console.log(newRes)
      await client.findOneAndUpdate({email:clientId},{reservations:newRes})
      
  io.emit(id,4)
      res.json({status:true,"message":"booking has been canceled successfully"})
    
       }
       else{
        
      res.json({status:false,"message":"Sorry Booking Exceeded 24 hours policy , it cant be canceled"})
       }
      }
      else{
      res.json({status:false,"message":"Invalid Action"})


      }
     }
    else 
    res.json({status:false,"message":"Not Authorized"})

  }
  else{
    res.json({status:false,"message":"Not Authenticated"})

  }
})



app.get('/getRevenue',async(req,res)=>{
  verify(req)
  if(req.user){
    let checker=checkAdmin(req.user);
    if(checker){

      let allRes=await bookings.find()
      allRes=allRes.filter((booking)=>{
        return booking.status==1||booking.status==5
      })
      console.log("******************************************************************************")
      console.log(allRes)
      let daily=0,monthly=0,weekly=0,total=0;
      let day=((new Date().getDate()))
      let month=((new Date().getMonth()+1))
      let year=((new Date().getFullYear()))
      let totalDays=((new Date(year,month,0).getDate()))
      let weekBrackets=[{begin:1,end:7},{begin:8,end:14},{begin:15,end:21},{begin:22,end:totalDays}]
      let theWeek={}
      for(let week of weekBrackets){
        if(week.end>=day&&week.begin<=day){
            theWeek=JSON.parse(JSON.stringify(week));break;
        }
      }
      allRes.map((res)=>{
        let date=new Date(res.date*1000)
        if(date.getMonth()+1==month){
            monthly+=parseFloat(parseFloat(res.totalPrice)*res.commission/100)
        }
        if(date.getDate()==day){
            daily+=parseFloat(parseFloat(res.totalPrice)*res.commission/100)
        }
        
        if(date.getDate()>=theWeek.begin&&date.getDate()<=theWeek.end){
            weekly+=parseFloat(parseFloat(res.totalPrice)*res.commission/100)
        }
        total+=parseFloat(parseFloat(res.totalPrice)*res.commission/100)

      })
      weekly=weekly.toFixed(2)
      monthly=monthly.toFixed(2)
      total=total.toFixed(2)
      daily=daily.toFixed(2)
      res.json({status:true,message:"Got Revenue Successfully",weekly,daily,total,monthly})


    }
    else{
      res.json({status:false,message:"Not Authorized"})

    }

  }
  else{
    res.json({status:false,message:"Not Authenticated"})

  }
})



function byDate(a,b){
  if(a.fromDate.length&&b.fromDate.length&&a.toDate.length&&b.toDate.length){console.log("here")
         const beginA=new Date(a.fromDate).getTime()
         const beginB=new Date(b.fromDate).getTime()
         if(a>b)return 1
         else return -1;
  }
  else if(!a.fromDate.length||!a.toDate.length){
    return -1
  }
  else return 1;
}
let v=async ()=>{
  /*
await hotels.deleteMany()
.then((d)=>console.log("deleted"))
.catch((d)=>console.log("error"))*/
//await client.findOneAndUpdate({email:"anasrabhi1@gmail.com"},{reservations:[]})
let dt=await stringDate()
console.log(new Date(parseInt(new Date().getTime())))

/*
await client.findOneAndUpdate({email:"anasrabhi1@gmail.com"},{reservations:[]})
await client.findOneAndUpdate({email:"anasrabhi0@gmail.com"},{reservations:[]})
await bookings.deleteMany()*/
//await hotels.findOneAndDelete({_id:"66c755476c133d4dd0d11b71"})
//await bookings.deleteMany()
let bookedRooms= {
  singleRoom: { status: true, units: 0, price: '20' },
  doubleRoom: { status: true, units: 2, price: '30' },
  tripleRoom: { status: false, units: 0, price: 0 },
  quadrupleRoom: { status: false, units: 0, price: 0 },        
  familyRoom: { status: false, units: 0, price: 0 }
};
let vv=[
  {
    fromDate:'2027-02-05',
    toDate:'2027-02-06',

  } , {
    fromDate:'2027-02-02',
    toDate:'2027-02-04',

  }
]


let checkout=new Date("09-10-2024").getDate()
let now =new Date().getTime()/1000
console.log(checkout)
console.log(now)
//hotels.findOneAndUpdate({_id:"66d0aa98c5844e3bfa4a19b1"},{RCAges:[]})
let vp={
}
console.log(vp)
}
v()
