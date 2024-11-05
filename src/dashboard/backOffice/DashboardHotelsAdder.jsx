import { useState,useRef,useEffect, useContext } from "react"
import HotelRoom from '../hotelRoom'
import WideInput from './wideInput'
import axios from 'axios'
import {notificationContext} from '../../App'
import CheckInOut from "../../Search form/checkinout"
import SeasonInput from "./seasonInput"
import AccomodationElement from "./AccomodationElement"
import AgeReduction from "./ageReduction/AgeReduction"

export default function DashboardHotelsAdder({setDashNavState}){
    const region=useRef(null)
    const [regions,setRegions]=useState(['Tunis','Djerba','Hammamet','ElHamma','Tataouin'])
    const [filteredRegions,setFilteredRegions]=useState(regions)
    const [parkingState,setParkingState]=useState(false)
    const [wifiState,setWifiState]=useState(false)
    const [singleState,setSingleState]=useState(false)
    const [doubleState,setDoubleState]=useState(false)
    const [tripleState,setTripleState]=useState(false)
    const [quadrupleState,setQuadrupleState]=useState(false)
    const [familyState,setFamilyState]=useState(false)
    const [search,setSearch]=useState('')
    const [stars,setStars]=useState(1)
    const starone=useRef(null)
    const startwo=useRef(null)
    const starthree=useRef(null)
    const starfour=useRef(null)
    const starfive=useRef(null)
    const starsArray=[starone,startwo,starthree,starfour,starfive]
    const searchInput=useRef(null)
    const parking=useRef(null)
    const wifi=useRef(null)
    const [mainImage,setMainImage]=useState(null)
    const [firstImage,setFirstImage]=useState(null)
    const [hotelName,setHotelName]=useState("")
    const [hotelResponsible,setHotelResponsible]=useState("")
    const [hotelEmail,setHotelEmail]=useState("")
    const [hotelPhone,setHotelPhone]=useState("")
    
    const [accomodations,setAccomodations]=useState([])

    const [LPD,setLPD]=useState("")
    const [DP,setDP]=useState("")
    const [PC,setPC]=useState("")
    const [ALLIN,setALLIN]=useState("")
    const [ALLINSOFT,setALLINSOFT]=useState("")
    const [DPP,setDPP]=useState("")
    const [PCP,setPCP]=useState("")
    /*
    const [LODouble,setLODouble]=useState("")
    const [LPDDouble,setLPDDouble]=useState("")
    const [DPDouble,setDPDouble]=useState("")
    const [PCDouble,setPCDouble]=useState("")
    const [ALLINDouble,setALLINDouble]=useState("")
    const [ALLINSOFTDouble,setALLINSOFTDouble]=useState("")
    const [DPPDouble,setDPPDouble]=useState("")
    const [PCPDouble,setPCPDouble]=useState("")
    
    const [LOTriple,setLOTriple]=useState("")
    const [LPDTriple,setLPDTriple]=useState("")
    const [DPTriple,setDPTriple]=useState("")
    const [PCTriple,setPCTriple]=useState("")
    const [ALLINTriple,setALLINTriple]=useState("")
    const [ALLINSOFTTriple,setALLINSOFTTriple]=useState("")
    const [DPPTriple,setDPPTriple]=useState("")
    const [PCPTriple,setPCPTriple]=useState("")
    
    const [LOQuadruple,setLOQuadruple]=useState("")
    const [LPDQuadruple,setLPDQuadruple]=useState("")
    const [DPQuadruple,setDPQuadruple]=useState("")
    const [PCQuadruple,setPCQuadruple]=useState("")
    const [ALLINQuadruple,setALLINQuadruple]=useState("")
    const [ALLINSOFTQuadruple,setALLINSOFTQuadruple]=useState("")
    const [DPPQuadruple,setDPPQuadruple]=useState("")
    const [PCPQuadruple,setPCPQuadruple]=useState("")
    
    const [LOFamily,setLOFamily]=useState("")
    const [LPDFamily,setLPDFamily]=useState("")
    const [DPFamily,setDPFamily]=useState("")
    const [PCFamily,setPCFamily]=useState("")
    const [ALLINFamily,setALLINFamily]=useState("")
    const [ALLINSOFTFamily,setALLINSOFTFamily]=useState("")
    const [DPPFamily,setDPPFamily]=useState("")
    const [PCPFamily,setPCPFamily]=useState("")
*/
    const [LPDStatus,setLPDStatus]=useState(false)
    const [DPStatus,setDPStatus]=useState(false)
    const [PCStatus,setPCStatus]=useState(false)
    const [ALLINStatus,setALLINStatus]=useState(false)
    const [ALLINSOFTStatus,setALLINSOFTStatus]=useState(false)
    const [DPPStatus,setDPPStatus]=useState(false)
    const [PCPStatus,setPCPStatus]=useState(false)


    const [commission,setCommission]=useState("")
    const [singlePrice,setSinglePrice]=useState(0)
    const [doublePrice,setDoublePrice]=useState(0)
    const [triplePrice,setTriplePrice]=useState(0)
    const [quadruplePrice,setQuadruplePrice]=useState(0)
    const [familyPrice,setFamilyPrice]=useState(0)
    const [adderState,setAdderState]=useState(false)
    const [hotelDescription,setHotelDescription]=useState("")
    const [hotelLocation,setHotelLocation]=useState("")
    const [RCAges,setRCAges]=useState([{id:crypto.randomUUID(),RCAgeBegin:"",RCAgeEnd:"",RC:"",RCStatus:false}])

    
    const [singleUnits,setSingleUnits]=useState(0)
    const [doubleUnits,setDoubleUnits]=useState(0)
    const [tripleUnits,setTripleUnits]=useState(0)
    const [quadrupleUnits,setQuadrupleUnits]=useState(0)
    const [familyUnits,setFamilyUnits]=useState(0)

    const [addImage1,setAddImage1]=useState(null)
    const [addImage2,setAddImage2]=useState(null)
    const [addImage3,setAddImage3]=useState(null)
    const [addImage4,setAddImage4]=useState(null)

    const [SVM,setSVM]=useState("")
    const [SVP,setSVP]=useState("")
    const [SS,setSS]=useState("")
    
    const [SVMStatus,setSVMStatus]=useState(false)
    const [SVPStatus,setSVPStatus]=useState(false)
    const [SSStatus,setSSStatus]=useState(false)

    
    const [RPC,setRPC]=useState("")
    const [RTF,setRTF]=useState("")
    const [RAC,setRAC]=useState("")
    const [RSR,setRSR]=useState("")
    const [RC,setRC]=useState("")
    
    const [RPCStatus,setRPCStatus]=useState(false)
    const [RTFStatus,setRTFStatus]=useState(false)
    const [RACStatus,setRACStatus]=useState(false)
    const [RSRStatus,setRSRStatus]=useState(false)

    const setMessage=useContext(notificationContext)

    function addAgeRed(){
      setRCAges((prev)=>{
        return [...prev,{id:crypto.randomUUID(),RCAgeBegin:'',RCAgeEnd:"",RC:"",RCStatus:false}]
      })
      }
   useEffect(()=>{console.log(accomodations)
    console.log(typeof accomodations)
    console.log( accomodations.length)
   },[accomodations])

    useEffect(()=>{
      for(let i =1;i<=stars;i++){
        starsArray[i-1].current.className="stars-btn active-star"
      }
      for(let i =stars+1;i<=5;i++){
        starsArray[i-1].current.className="stars-btn"
      }
  },[stars])

   function extractExtension(s){
    let extension=""
    for(let p=s.length-1;p>-1;p--){
      if(s[p]=='.')break
      extension=s[p]+extension
    }
    return extension
   }

   function handleMainImage(e){
    console.log(e.target.files[0].name)
    const fileName=e.target.files[0].name
    const extension=(extractExtension(fileName)).toLowerCase()
    console.log(extension)
    if(extension=='png'||extension=='jpg')
    setMainImage(e.target.files[0])
  else setMessage('Images Need To Be JPEG or PNG')
  }



  function handleFirstImage(e){
    console.log(e.target.files[0].name)
    const fileName=e.target.files[0].name
    const extension=(extractExtension(fileName)).toLowerCase()
    console.log(extension)
    if(extension=='png'||extension=='jpg')
    setFirstImage(e.target.files[0])
  else setMessage('Images Need To Be JPEG or PNG')
 }
 function handleAdditional(e,image=1){
   console.log(e.target.files[0].name)
   const fileName=e.target.files[0].name
   const extension=(extractExtension(fileName)).toLowerCase()
   console.log(extension)
   if(extension=='png'||extension=='jpg'){
    switch(image){
    case 1:setAddImage1(e.target.files[0]);break;
    case 2:setAddImage2(e.target.files[0]);break;
    case 3:setAddImage3(e.target.files[0]);break;
    case 4:setAddImage4(e.target.files[0]);break;
   }}
 else setMessage('Images Need To Be JPEG or PNG')
}


 function errorCheck(a=[]){
  for(let el of a){
    if(!el)return false;
    if(!el.length&& typeof el =="string")return false;
  }return true;
 }

  function addHotel(){  
    setAdderState(false)
    if(!errorCheck([hotelDescription,hotelLocation,hotelName,hotelEmail,hotelPhone,search,hotelResponsible,commission,mainImage,firstImage])){
   setMessage("Input Is Missing")
    }else{
      const values=[stars,commission]
      let ok=true;
      for(let value of values){
        if(isNaN(parseInt(value))){
          setMessage("Prices, Units And Percentages Should Be Numbers")
          ok=false;break;
        }
        else if(parseInt(value)<0){
          setMessage("Values Need To Be Positive Numbers")
          ok=false;break;
        }
      }
      for(let digit of hotelPhone){
        if(isNaN(parseInt(digit))){
          setMessage('Invalid Phone Number')
         ok=false
        }
      }
      if(hotelPhone.length!=8){

        setMessage('Phone Number Length is 8 Digits')
        ok=false
      }
      
     

      if(LPDStatus){
           if(LPD.length){
          if(isNaN(parseInt(LPD))){
            ok=false
            setMessage("Accomodation Prices Need To Be In Numbers")

          }
          else if(parseInt(LPD)<=0){
            ok=false
            setMessage("Accomodation Prices Need To Be Positive Values")

          }
        }
        else{
          
          ok=false
          setMessage("LPD Price Is Required")
        }
      }
     

      if(PCStatus){
          if(PC.length){
          
          if(isNaN(parseInt(PC))){
            ok=false
            setMessage("Accomodation Prices Need To Be In Numbers")

          }
          else if(parseInt(PC)<=0){
            ok=false
            setMessage("Accomodation Prices Need To Be Positive Values")

          }
        }
        else{
          
          ok=false
          setMessage("PC Price Is Required")
        }
      }

      
      if(DPStatus){
          if(DP.length){
          
          if(isNaN(parseInt(DP))){
            ok=false
            setMessage("Accomodation Prices Need To Be In Numbers")

          }
          else if(parseInt(DP)<=0){
            ok=false
            setMessage("Accomodation Prices Need To Be Positive Values")

          }
        }
        else{
          
          ok=false
          setMessage("DP Price Is Required")
        }
      }
     
      if(ALLINStatus){
             if(ALLIN.length){
          
          if(isNaN(parseInt(ALLIN))){
            ok=false
            setMessage("Accomodation Prices Need To Be In Numbers")

          }
          else if(parseInt(ALLIN)<=0){
            ok=false
            setMessage("Accomodation Prices Need To Be Positive Values")

          }
        }
        else{
          
          ok=false
          setMessage("ALLIN Price Is Required")
        }
      }

      
      if(ALLINSOFTStatus){

        if(ALLINSOFT.length){
          
          if(isNaN(parseInt(ALLINSOFT))){
            ok=false
            setMessage("Accomodation Prices Need To Be In Numbers")

          }
          else if(parseInt(ALLINSOFT)<=0){
            ok=false
            setMessage("Accomodation Prices Need To Be Positive Values")

          }
        }
        else{
          
          ok=false
          setMessage("ALLINSOFT Price Is Required")
        }
      }
      
      if(PCPStatus){
           if(PCP.length){
          
          if(isNaN(parseInt(PCP))){
            ok=false
            setMessage("Accomodation Prices Need To Be In Numbers")

          }
          else if(parseInt(PCP)<=0){
            ok=false
            setMessage("Accomodation Prices Need To Be Positive Values")

          }
        }
        else{
          
          ok=false
          setMessage("PCP Price Is Required")
        }
      }

      
      if(DPPStatus){
           if(DPP.length){
          
          if(isNaN(parseInt(DPP))){
            ok=false
            setMessage("Accomodation Prices Need To Be In Numbers")

          }
          else if(parseInt(DPP)<=0){
            ok=false
            setMessage("Accomodation Prices Need To Be Positive Values")

          }
        }
        else{
          
          ok=false
          setMessage("DPP Price Is Required")
        }
      }

      if(SSStatus){
        if(SS.length){
       
       if(isNaN(parseInt(SS))){
         ok=false
         setMessage("Supplements Prices Need To Be In Numbers")

       }
       else if(parseInt(SS)<=0){
         ok=false
         setMessage("Supplements Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("Single Supplement Price Is Required")
     }
      }


      if(SVMStatus){
        if(SVM.length){
       
       if(isNaN(parseInt(SVM))){
         ok=false
         setMessage("Supplements Prices Need To Be In Numbers")

       }
       else if(parseInt(SVM)<=0){
         ok=false
         setMessage("Supplements Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("Supplement Vue Mer Price Is Required")
     }
      }

      
      if(SVPStatus){
        if(SVP.length){
       
       if(isNaN(parseInt(SVP))){
         ok=false
         setMessage("Supplements Prices Need To Be In Numbers")

       }
       else if(parseInt(SVP)<=0){
         ok=false
         setMessage("Supplements Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("Supplement Vue Piscine Price Is Required")
     }
      }



      
      if(RSRStatus){
        if(RSR.length){
       
       if(isNaN(parseInt(RSR))){
         ok=false
         setMessage("Reduction Percentage Need To Be In Numbers")

       }
       else if(parseInt(RSR)<=0){
         ok=false
         setMessage("Reduction Percentage Need To Be Positive Values")

       }
       else if(parseInt(RSR)>100){
        ok=false;
        setMessage("Reduction Cant Exceed 100%")

       }
     }
     else{
       
       ok=false
       setMessage("Reduction 3rd and 4th bed is Required")
     }
      }


      if(RPCStatus){
        if(RPC.length){
       
       if(isNaN(parseInt(RPC))){
         ok=false
         setMessage("Reduction Percentage Need To Be In Numbers")

       }
       else if(parseInt(RPC)<=0){
         ok=false
         setMessage("Reduction Percentage Need To Be Positive Values")

       }
       else if(parseInt(RPC)>100){
        ok=false;
        setMessage("Reduction Cant Exceed 100%")

       }
     }
     else{
       
       ok=false
       setMessage("Reduction 2 Adult 1 CHild is Required")
     }
      }

      
      if(RTFStatus){
        if(RTF.length){
       
       if(isNaN(parseInt(RTF))){
         ok=false
         setMessage("Reduction Percentage Need To Be In Numbers")

       }
       else if(parseInt(RTF)<=0){
         ok=false
         setMessage("Reduction Percentage Need To Be Positive Values")

       }
       else if(parseInt(RTF)>100){
        ok=false;
        setMessage("Reduction Cant Exceed 100%")

       }
     }
     else{
       
       ok=false
       setMessage("Reduction 2 Adult 1 CHild is Required")
     }
      }

      
      if(RACStatus){
        if(RAC.length){
       
       if(isNaN(parseInt(RAC))){
         ok=false
         setMessage("Reduction Percentage Need To Be In Numbers")

       }
       else if(parseInt(RAC)<=0){
         ok=false
         setMessage("Reduction Percentage Need To Be Positive Values")

       }
       else if(parseInt(RAC)>100){
        ok=false;
        setMessage("Reduction Cant Exceed 100%")

       }
     }
     else{
       
       ok=false
       setMessage("Reduction 1 Adult 1 CHild is Required")
     }
      }

      

      //condition seasonals*******************************


      for(let season of accomodations){
        if(!season.fromDate.length||!season.toDate.length){
          ok=false;
          setMessage("Season Date input Is Missing")
          break;
        }
        
      if(season.LPDStatus){
        if(season.LPD.length){
       if(isNaN(parseInt(season.LPD))){
         ok=false
         setMessage("season Prices Need To Be In Numbers")

       }
       else if(parseInt(season.LPD)<=0){
         ok=false
         setMessage("season Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("season LPD Price Is Required")
     }
   }
  

   if(season.PCStatus){
       if(season.PC.length){
       
       if(isNaN(parseInt(season.PC))){
         ok=false
         setMessage("season Prices Need To Be In Numbers")

       }
       else if(parseInt(season.PC)<=0){
         ok=false
         setMessage("season Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("season PC Price Is Required")
     }
   }

   
   if(season.DPStatus){
       if(season.DP.length){
       
       if(isNaN(parseInt(season.DP))){
         ok=false
         setMessage("season Prices Need To Be In Numbers")

       }
       else if(parseInt(season.DP)<=0){
         ok=false
         setMessage("season Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("season DP Price Is Required")
     }
   }
  
   if(season.ALLINStatus){
          if(season.ALLIN.length){
       
       if(isNaN(parseInt(season.ALLIN))){
         ok=false
         setMessage("season Prices Need To Be In Numbers")

       }
       else if(parseInt(season.ALLIN)<=0){
         ok=false
         setMessage("season Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("season ALLIN Price Is Required")
     }
   }

   
   if(season.ALLINSOFTStatus){

     if(season.ALLINSOFT.length){
       
       if(isNaN(parseInt(season.ALLINSOFT))){
         ok=false
         setMessage("season Prices Need To Be In Numbers")

       }
       else if(parseInt(season.ALLINSOFT)<=0){
         ok=false
         setMessage("season Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("season ALLINSOFT Price Is Required")
     }
   }
   
   if(season.PCPStatus){
        if(season.PCP.length){
       
       if(isNaN(parseInt(season.PCP))){
         ok=false
         setMessage("season Prices Need To Be In Numbers")

       }
       else if(parseInt(season.PCP)<=0){
         ok=false
         setMessage("season Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("season PCP Price Is Required")
     }
   }

   
   if(season.DPPStatus){
        if(season.DPP.length){
       
       if(isNaN(parseInt(season.DPP))){
         ok=false
         setMessage("season Prices Need To Be In Numbers")

       }
       else if(parseInt(season.DPP)<=0){
         ok=false
         setMessage("season Prices Need To Be Positive Values")

       }
     }
     else{
       
       ok=false
       setMessage("season DPP Price Is Required")
     }
   }

      }


    if(ok){
      if(commission<1){
        setMessage("Agency Commissiion Need To Be At Least 1%")
        
      }
      else{
        //check rooms
        if(singleState||doubleState||tripleState||quadrupleState||familyState){
    
    const formdata= new FormData()

    if(singleState){
      if(singlePrice>0)
    formdata.append('singleRoom',JSON.stringify({units:singleUnits,price:singlePrice}))
  else setMessage("Single Rooms Price Needs To Be Positive")
    }
    
    if(doubleState){
      if(doublePrice>0)
      formdata.append('doubleRoom',JSON.stringify({units:doubleUnits,price:doublePrice}))
      else setMessage("Double Rooms Price Needs To Be Positive")
      }
      
    if(tripleState){
      if(triplePrice>0)
      formdata.append('tripleRoom',JSON.stringify({units:tripleUnits,price:triplePrice}))
      else setMessage("Triple Rooms Price Needs To Be Positive")
         
    }
      
    if(quadrupleState){
      if(quadruplePrice>0)
      formdata.append('quadrupleRoom',JSON.stringify({units:quadrupleUnits,price:quadruplePrice}))
      else setMessage("Quadruple Rooms Price Needs To Be Positive")
        
    }
      
    if(familyState){
      if(familyPrice>0)
      formdata.append('familyRoom',JSON.stringify({units:familyUnits,price:familyPrice}))
      else setMessage("Family Rooms Price Needs To Be Positive")
      
    }
    formdata.append('image',mainImage)
    formdata.append('image',firstImage)
    if(addImage1)
    formdata.append('image',addImage1)
    if(addImage2)
    formdata.append('image',addImage2)
    if(addImage3)
    formdata.append('image',addImage3)
    if(addImage4)
    formdata.append('image',addImage4)

    formdata.append('hotelName',hotelName)
    formdata.append('hotelEmail',hotelEmail)
    formdata.append('hotelPhone',hotelPhone)
    formdata.append('hotelResponsible',hotelResponsible)
    formdata.append('stars',stars)
    formdata.append('parking',parkingState)
    formdata.append('wifi',wifiState)
    formdata.append('commission',commission)
    formdata.append('region',search)

    formdata.append('LPD',LPD)
    formdata.append('DP',DP)
    formdata.append('PC',PC)
    formdata.append('ALLIN',ALLIN)
    formdata.append('ALLINSOFT',ALLINSOFT)
    formdata.append('DPP',DPP)
    formdata.append('PCP',PCP)
    /*
    formdata.append('LODouble',LODouble)
    formdata.append('LPDDouble',LPDDouble)
    formdata.append('DPDouble',DPDouble)
    formdata.append('PCDouble',PCDouble)
    formdata.append('ALLINDouble',ALLINDouble)
    formdata.append('ALLINSOFTDouble',ALLINSOFTDouble)
    formdata.append('DPPDouble',DPPDouble)
    formdata.append('PCPDouble',PCPDouble)
    
    formdata.append('LOTriple',LOTriple)
    formdata.append('LPDTriple',LPDTriple)
    formdata.append('DPTriple',DPTriple)
    formdata.append('PCTriple',PCTriple)
    formdata.append('ALLINTriple',ALLINTriple)
    formdata.append('ALLINSOFTTriple',ALLINSOFTTriple)
    formdata.append('DPPTriple',DPPTriple)
    formdata.append('PCPTriple',PCPTriple)
    
    formdata.append('LOQuadruple',LOQuadruple)
    formdata.append('LPDQuadruple',LPDQuadruple)
    formdata.append('DPQuadruple',DPQuadruple)
    formdata.append('PCQuadruple',PCQuadruple)
    formdata.append('ALLINQuadruple',ALLINQuadruple)
    formdata.append('ALLINSOFTQuadruple',ALLINSOFTQuadruple)
    formdata.append('DPPQuadruple',DPPQuadruple)
    formdata.append('PCPQuadruple',PCPQuadruple)
    
    formdata.append('LOFamily',LOFamily)
    formdata.append('LPDFamily',LPDFamily)
    formdata.append('DPFamily',DPFamily)
    formdata.append('PCFamily',PCFamily)
    formdata.append('ALLINFamily',ALLINFamily)
    formdata.append('ALLINSOFTFamily',ALLINSOFTFamily)
    formdata.append('DPPFamily',DPPFamily)
    formdata.append('PCPFamily',PCPFamily)
    */
    formdata.append('LPDStatus',LPDStatus)
    formdata.append('DPStatus',DPStatus)
    formdata.append('PCStatus',PCStatus)
    formdata.append('ALLINStatus',ALLINStatus)
    formdata.append('ALLINSOFTStatus',ALLINSOFTStatus)
    formdata.append('DPPStatus',DPPStatus)
    formdata.append('PCPStatus',PCPStatus)

    formdata.append('hotelLocation',hotelLocation)
    formdata.append('hotelDescription',hotelDescription)
    formdata.append('singleState',singleState)
    formdata.append('doubleState',doubleState)
    formdata.append('tripleState',tripleState)
    formdata.append('quadrupleState',quadrupleState)
    formdata.append('familyState',familyState)

    formdata.append('seasons',JSON.stringify(accomodations))
    formdata.append('SVM',SVM)
    formdata.append('SVP',SVP)
    formdata.append('SS',SS)
    formdata.append('SVMStatus',SVMStatus)
    formdata.append('SVPStatus',SVPStatus)
    formdata.append('SSStatus',SSStatus)

    
    formdata.append('RPC',RPC)
    formdata.append('RAC',RAC)
    formdata.append('RSR',RSR)
    formdata.append('RTF',RTF)
    formdata.append('RTFStatus',RTFStatus)
    formdata.append('RPCStatus',RPCStatus)
    formdata.append('RACStatus',RACStatus)
    formdata.append('RSRStatus',RSRStatus)
    formdata.append('RCAges',JSON.stringify(RCAges))



    //conditioning
    axios.post('https://api-travelio.onrender.com/file',formdata)
    .then((res)=>{if(res.status){
      localStorage.setItem('dashNavCount',2)
      setDashNavState((prev)=>!prev)

    }
    setMessage(res.data.message)
    })
    .catch((e)=>{
      setMessage(e.message)
    })
        }
        else{
          setMessage(hotelName+" Hotel Need To Have At Least One Room")

        }
      }

    }

    }
    
    setAdderState(false)

  }

  function handleParking(){
    if(!parkingState){
      parking.current.className="stars-btn active-nec"
    }
    else
      parking.current.className="stars-btn"
    setParkingState(!parkingState)
  }

  function handleWifi(){
    if(!wifiState){
      wifi.current.className="stars-btn active-nec"
    }
    else
      wifi.current.className="stars-btn"
    setWifiState(!wifiState)
  }


    function popSearch(){
        region.current.style.opacity="1"
       region.current.style.height="10em"
        
      }
      function cleanSearch(){
        region.current.style.opacity="0"
       setTimeout(()=>{
       region.current.style.height="0em"
      },200)
        
      }

    
    function searcher(e){
        console.log(e.target.value)
        const currentSearch=e.target.value;
        setSearch(currentSearch)
        if(currentSearch.length){
          //open popup
          setFilteredRegions((prev)=>{
            let fr= regions.filter((r)=>{
              if(r.length>=currentSearch.length){
                
                return (r.toLowerCase().indexOf(currentSearch.toLowerCase())!=-1)
              }
            })
            return fr
          })
    
    
        }
        else {setFilteredRegions(regions)}
      }


      function addAcc(){
        setAccomodations((prev)=>{
          return [...prev,{id:crypto.randomUUID()
            ,
            fromDate:"",
            toDate:"",
            from:"",
            to:"",
            LPDStatus:false,
            PC:"",
            PCStatus:false,
            PCP:"",
            PCPStatus:false,
            DP:"",
            DPStatus:false,
            DPP:"",
            DPPStatus:false,
            ALLIN:"",
            ALLINStatus:false,
            ALLINSOFT:"",
            ALLINSOFTStatus:false,

          }]
        })
      }
    return (
        <div>
            <form id="hotel-form">
              <h4 className="hotel-add-header">General Information</h4>
                
                 <WideInput value={hotelName} onChange={(val)=>setHotelName(val)} title="Hotel Name" placeholder="Radisson Blu" type="text"/>
                
                <span className="dashboard-home-input" >
                <label htmlFor='region'>Region</label>
                <input onFocus={popSearch}  onBlur={cleanSearch}  required={true} id='region' placeholder="Region" type="text" ref={searchInput} value={search} onChange={(e)=>searcher(e)}/>
                </span>
                <span id='hotelRegions'  ref={region}>
                  <ol>
                    {
                      filteredRegions.map((region)=>{
                        return <li><button type="button" value={region} onClick={(e)=>{searcher(e)}}>{region}</button></li>
                      })
                    }
                  </ol>
                </span>
                <WideInput value={hotelDescription} onChange={(val)=>setHotelDescription(val)} title="Hotel Description" placeholder="A concise overview of the hotel's key features and amenities." type="text"/>
                <WideInput value={hotelLocation} onChange={(val)=>setHotelLocation(val)} title="Location" placeholder="Paris ,135 Street Avenue" type="text"/>
                
                <span id="dashboard-hotel-spanner">
                 
                 <WideInput value={hotelPhone} onChange={(val)=>setHotelPhone(val)}  title="Hotel Telephone" placeholder="+216 xxx-xxx-xx" type="Number"/>
                 <WideInput value={hotelEmail} onChange={(val)=>setHotelEmail(val)}  title="Hotel Email" placeholder="Email@hotel.com" type="email"/>
              


              </span>

               <WideInput value={hotelResponsible} onChange={(val)=>setHotelResponsible(val)}  title="Hotel Responsible Name" placeholder="John Doe" type="text"/>

               
              <span className="dashboard-home-input" id="hotel-stars">
              <label>Number Of Stars</label>
              <button ref={starone} onClick={()=>setStars(1)} className="stars-btn active-star" id="one-btn" type="button"></button>
              <button ref={startwo} onClick={()=>setStars(2)} className="stars-btn" id="two-btn" type="button"></button>
              <button ref={starthree} onClick={()=>setStars(3)} className="stars-btn" id="three-btn" type="button"></button>
              <button ref={starfour} onClick={()=>setStars(4)} className="stars-btn" id="four-btn" type="button"></button>
              <button ref={starfive} onClick={()=>setStars(5)} className="stars-btn" id="five-btn" type="button"></button>
              </span>

              <span id="dashboard-hotel-spanner">
              <span className="dashboard-home-input" id="hotel-stars">
              <label>Parking</label>
              <button ref={parking}  onClick={handleParking} className="stars-btn" id="one-btn" type="button"></button>
              </span>
              <span className="dashboard-home-input" id="hotel-stars">
              <label>Wi-Fi</label>
              <button ref={wifi}  onClick={handleWifi} className="stars-btn" id="one-btn" type="button"></button>
              </span>
             

              </span>

              <h4 className="hotel-add-header2">Rooms Details</h4>
              <span id="dashboard-hotel-spanner" className="scrollable">
                <HotelRoom price={singlePrice} setPrice={setSinglePrice} setUnits={setSingleUnits} units={singleUnits} confirmation={singleState} setConfirmation={setSingleState} title="Single Room"/>
                <HotelRoom price={doublePrice} setPrice={setDoublePrice} setUnits={setDoubleUnits} units={doubleUnits} confirmation={doubleState} setConfirmation={setDoubleState} title="Double Room"/>
                <HotelRoom price={triplePrice} setPrice={setTriplePrice} setUnits={setTripleUnits} units={tripleUnits} confirmation={tripleState} setConfirmation={setTripleState} title="Triple Room"/>
                <HotelRoom price={quadruplePrice} setPrice={setQuadruplePrice} setUnits={setQuadrupleUnits} units={quadrupleUnits} confirmation={quadrupleState} setConfirmation={setQuadrupleState} title="Quadruple Room"/>
                <HotelRoom price={familyPrice} setPrice={setFamilyPrice} setUnits={setFamilyUnits} units={familyUnits} confirmation={familyState} setConfirmation={setFamilyState} title="Family Room"/>
              </span>

              
            <h4 className="hotel-add-header">Supplements</h4>
                 <WideInput status={SVMStatus} value={SVM} onChange={(val)=>setSVM(val)} title="Supplement Vue Sur Mer" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setSVMStatus((prev)=>!prev)}>{!SVMStatus?"Confirm":"Revoke"}</button>
                 
                 <WideInput status={SVPStatus} value={SVP} onChange={(val)=>setSVP(val)} title="Supplement Vue Sur Piscine" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setSVPStatus((prev)=>!prev)}>{!SVPStatus?"Confirm":"Revoke"}</button>

                 <WideInput status={SSStatus} value={SS} onChange={(val)=>setSS(val)} title="Supplement Room Single" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setSSStatus((prev)=>!prev)}>{!SSStatus?"Confirm":"Revoke"}</button>
                 

                 
            <h4 className="hotel-add-header">Reductions</h4>
                 <WideInput status={RPCStatus} value={RPC} onChange={(val)=>setRPC(val)} title="Reduction 2 adults 1 child" placeholder="90%" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setRPCStatus((prev)=>!prev)}>{!RPCStatus?"Confirm":"Revoke"}</button>
                 
                 <WideInput status={RACStatus} value={RAC} onChange={(val)=>setRAC(val)} title="Reduction 1 adult 1 child" placeholder="90%" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setRACStatus((prev)=>!prev)}>{!RACStatus?"Confirm":"Revoke"}</button>

                 <WideInput status={RSRStatus} value={RSR} onChange={(val)=>setRSR(val)} title="Reductions Saperate Room " placeholder="90%" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setRSRStatus((prev)=>!prev)}>{!RSRStatus?"Confirm":"Revoke"}</button>
                  
                 <WideInput status={RTFStatus} value={RTF} onChange={(val)=>setRTF(val)} title="Reduction 3rd and 4th Bed " placeholder="90%" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setRTFStatus((prev)=>!prev)}>{!RTFStatus?"Confirm":"Revoke"}</button>
                 
               
                 <div id="age-red-adder">
                  <button style={{margin:"0 !important"}} className="blue-btn" type="button" onClick={addAgeRed}>+</button>
                  {RCAges.map((rc,index)=>{
                    console.log("RC")
                    console.log(rc)
                    console.log(rc.RCStatus)
                    return <AgeReduction RCAges={RCAges} index={index} setRCAges={setRCAges} rc={rc} key={rc.id} />

                  })}



                </div>
                 
              <div className="accomodations">
                <button style={{margin:"0 !important"}} className="blue-btn" type="button" onClick={addAcc}>+</button>



              <div className="accomodation-element">
              <h4 className="hotel-add-header2">Default Accomodation</h4>
                 
                 <h4>LPD Accomodation</h4>
                 <WideInput status={LPDStatus} value={LPD} onChange={(val)=>setLPD(val)} title="LPD Price" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setLPDStatus((prev)=>!prev)}>{!LPDStatus?"Confirm":"Revoke"}</button>
                 
                 <h4>DP Accomodation</h4>
                 <WideInput status={DPStatus} value={DP} onChange={(val)=>setDP(val)} title="DP Price" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setDPStatus((prev)=>!prev)}>{!DPStatus?"Confirm":"Revoke"}</button>
                 
                 <h4>PC Accomodation</h4>
                 <WideInput status={PCStatus} value={PC} onChange={(val)=>setPC(val)} title="PC Price" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setPCStatus((prev)=>!prev)}>{!PCStatus?"Confirm":"Revoke"}</button>
                 
                 <h4>ALL IN Accomodation</h4>
                 <WideInput status={ALLINStatus} value={ALLIN} onChange={(val)=>setALLIN(val)} title="ALL IN Price" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setALLINStatus((prev)=>!prev)}>{!ALLINStatus?"Confirm":"Revoke"}</button>
                 
                 <h4>ALL IN SOFT Accomodation</h4>
                 <WideInput status={ALLINSOFTStatus} value={ALLINSOFT} onChange={(val)=>setALLINSOFT(val)} title="ALL IN SOFT Price" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setALLINSOFTStatus((prev)=>!prev)}>{!ALLINSOFTStatus?"Confirm":"Revoke"}</button>
                 
                 <h4>DP+ Accomodation</h4>
                 <WideInput status={DPPStatus} value={DPP} onChange={(val)=>setDPP(val)} title="DP+ Price" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setDPPStatus((prev)=>!prev)}>{!DPPStatus?"Confirm":"Revoke"}</button>
                 
                 <h4>PC+ Accomodation</h4>
                 <WideInput status={PCPStatus} value={PCP} onChange={(val)=>setPCP(val)} title="PC+ Price" placeholder="100$" type="Number"/>
                 <button type="button" className="blue-btn" onClick={()=>setPCPStatus((prev)=>!prev)}>{!PCPStatus?"Confirm":"Revoke"}</button>
                 
                 </div>
                 {accomodations.map((acc,index)=>{
                  return (<AccomodationElement accomodations={accomodations} key={acc.id} setAccomodations={setAccomodations} index={index}/>)
                 })
                }

                 </div>
                 
                 
                 <h4 className="hotel-add-header2">Agency</h4>
                 <WideInput value={commission} onChange={(val)=>setCommission(val)} title="Agency Commission (In %)" placeholder="10%" type="Number"/>

                  
                     
                 <h4 className="hotel-add-header2">Hotel Main Images</h4>
        <span className="dashboard-home-input" >
        <label>Main Image</label>
        <input accept=".png,.jpg" onChange={handleMainImage} type="file" placeholder="{placeholder}"/>
         </span>
         <span className="dashboard-home-input" >
        <label>First Image</label>
        <input accept=".png,.jpg"  onChange={handleFirstImage} type="file" placeholder="{placeholder}"/>
         </span>
{/*adding additional pics*/}

<h4 className="hotel-add-header2">Additional Images (Optional)</h4>
         <span className="dashboard-home-input" >
        <label>Additional Image 1</label>
        <input accept=".png,.jpg"  onChange={(e)=>handleAdditional(e,1)} type="file" placeholder="{placeholder}"/>
         </span>

         <span className="dashboard-home-input" >
        <label>Additional Image 2</label>
        <input accept=".png,.jpg"  onChange={(e)=>handleAdditional(e,2)} type="file" placeholder="{placeholder}"/>
         </span>

         <span className="dashboard-home-input" >
        <label>Additional Image 3</label>
        <input accept=".png,.jpg"  onChange={(e)=>handleAdditional(e,3)} type="file" placeholder="{placeholder}"/>
         </span>

         <span className="dashboard-home-input" >
        <label>Additional Image 4</label>
        <input accept=".png,.jpg"  onChange={(e)=>handleAdditional(e,4)} type="file" placeholder="{placeholder}"/>
         </span>

                 
               <button className={adderState&&"disabled"} disabled={adderState} onClick={addHotel} type="button" id="hotel-add-btn">Add Hotel</button>
            </form>
        </div>
    )
}