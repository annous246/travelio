import BookingHotel from "../bookingHotel/bookingHotel"
import BookingRooms from "../bookingRooms/bookingRooms"
import BookingAccomodations from "../bookingAccomodations/bookingAccomodations"
import BookingController from "../bookingController/bookingController"
import "./bookingPanel.css"
import { useEffect,useState,useRef, useContext } from "react"
import BookingMembers from "../bookingMembers/bookingMembers"
import BookingInfo from "../bookingInfo/bookingInfo"
import BookingConditions from '../bookingConditions/bookingConditions'
import BookingRequests from '../bookingRequests/bookingRequests'
import { notificationContext } from "../App"
import axios from "axios"
import DepCheckInOut  from "./depcheckinout" 
import  ImageShow from "./imageShow.jsx"


export default function BookingPanel({state,setState,currentHotel}){
    const bookingContainer=useRef(null)
    const [pageCount,setPageCount]=useState(1)
    const [submit,setSubmit]=useState(false)
    const [availableRooms,setAvailableRooms]=useState({})
    const [loading,setLoading]=useState(true)
    const [confirmation,setConfirmation]=useState(false)
    const [image,setImage]=useState("")
    const [imageState,setImageState]=useState(false)


    const setMessage=useContext(notificationContext)

    const [nights,setNights]=useState('')
    const [checkInDate,setCheckInDate]=useState(null)
    const [checkOutDate,setCheckOutDate]=useState(null)
    
    const [firstName,setFirstName]=useState("")
    const [lastName,setLastName]=useState("")
    const [phoneNumber,setPhoneNumber]=useState("")
    const [nationality,setNationality]=useState("")

    const [firstNames,setFirstNames]=useState({})
    const [lastNames,setLastNames]=useState({})
    const [nationalities,setNationalities]=useState({})
    const [ages,setAges]=useState({})

    const [honeyMoon,setHoneyMoon]=useState(false)
    const [pillows,setPillows]=useState(false)
    const [blankets,setBlankets]=useState(false)
    const [pet,setPet]=useState(false)
    const [birthDay,setBirthDay]=useState(false)
    const [person,setPerson]=useState(false)
    const [supplements,setSupplements]=useState({
        SVM:0,
        SVP:0,
        SS:0
    })
    const [members,setMembers]=useState({
        adults:1,
        children:0,
        babies:0,
    })
    const [currentAccomodation,setCurrentAccomodation]=useState(
        {
            LS:true,
            LPD:false,
            PC:false,
            PDP:false,
            DP:false,
            DPP:false,
            ALLIN:false,
            ALLINSOFT:false,
        }
    )
    const [hotel,setHotel]=useState(null)
    const page1=useRef(null)
    const page2=useRef(null)
    const page3=useRef(null)

    useEffect(()=>{
        setHotel(currentHotel)
    },[])
    useEffect(()=>{
        if(hotel)setLoading(false)
    },[hotel])
    function abortBooking(){
      if(state){setState(false);}
    }
    useEffect(()=>{
        if(state){
            bookingContainer.current.className=""
        }
        else{bookingContainer.current.className="shift"

        }
    })
    useEffect(()=>{
        if(!page1.current)return
        if(pageCount==1){
            page1.current.className='tester'
            page2.current.className='tester'
            page3.current.className='tester'
        }
        else if(pageCount==2){
            page1.current.className='tester slider1'
            page2.current.className='tester slider1'
            page3.current.className='tester slider1'
        }
        else{
            page1.current.className='tester slider2'
            page2.current.className='tester slider2'
            page3.current.className='tester slider2'
        }
    },[pageCount])
    useEffect(()=>{
        if(submit){
        let bookedRooms={}
        for(let room in availableRooms){
            if(hotel.rooms[room]){
                if(hotel.rooms[room].status){
                    console.log(hotel.rooms[room].units)
                    console.log(availableRooms[room].units)
                    bookedRooms[room]={units:hotel.rooms[room].units-availableRooms[room].units,price:hotel.rooms[room].price}
                }

            }
        }
        let acc="LS";
    if(!currentAccomodation["LS"]){
        //added services
       
        for(let ac in currentAccomodation){
         if(currentAccomodation[ac]){
                acc=ac;break;
         }}
     }
        axios.post('https://api-travelio.onrender.com/book',{hotelId:hotel._id,data:{firstName:firstName,lastName:lastName,nationality:nationality,nationalities:nationalities,firstNames:firstNames,lastNames:lastNames},preferences:{honeyMoon:honeyMoon,blankets:blankets,birthDay:birthDay,person:person,pet:pet,pillows:pillows},booking:{bookedRooms:bookedRooms,members:members,currentAccomodation:acc,totalSupp:totalSupplements(),totalPrice:((totalPrice())).toFixed(1),reduction:getReduction()},checkInDate:checkInDate,checkOutDate:checkOutDate})
        .then((res)=>{
            setMessage(res.data.message)
            if(res.data.status)
            setState(false)
            setSubmit(false)
        })
        .catch((e)=>{
            
            setMessage(e.message)
            setSubmit(false)
        })
        }

    },[submit])
    /*
    hotelName:"Radisson Blue",
    stars:5,
    description:"azdh iauzd uaizhdi hazhazdaz azd azd azd azd azd azdazd id hiazhd hazhd hoazduiahzudhahzazdazidbiuaz",
    mainImage:"100lc.png",
    firstImage:"AI.png",
    additionalImages:["app due..png","app due..png","app due..png","app due..png"],
    rating:4.8,
    region:"Djerba",
    address:"Avenue HB 14 azd zssssssssss dzaddzdzdzdzdzzdaa",
    rooms:{
        singleRoom:{
            price:210,
            units:2,
            status:true
        },
        doubleRoom:{
            price:10,
            units:10,
            status:false
        },
        tripleRoom:{
            price:220,
            units:1,
            status:true
        },
        quadrupleRoom:{
            price:10,
            units:10,
            status:false
        },
        familyRoom:{
            price:10,
            units:10,
            status:false
        }
    },
    LPDStatus:true,
    LPD:{
        price:20
    }*/

        
function totalPrice(){
    let roomsPrice=0;

    //calculating rooms price without services
    let singleRooms=0
    for(let room in availableRooms){
        if(hotel.rooms[room]){
            if(hotel.rooms[room].status==true){
                const numberOfBooks=hotel.rooms[room].units-availableRooms[room].units
                let totalMembers=1;
                switch(room){
                    case "doubleRoom" : totalMembers=2;break;
                    case "tripleRoom" : totalMembers=3;break;
                    case "quadrupleRoom" : totalMembers=4;break;
                    case "familyRoom" : totalMembers=5;break;
                }
                roomsPrice+=hotel.rooms[room].price*numberOfBooks*totalMembers
                if(room=="singleRoom")
                singleRooms=numberOfBooks
                    
                
            }
            
        }
    }
    //adding services if exists
    let serviceCosts=0
    if(!currentAccomodation["LS"]){
       //added services
       let acc='LS'
       for(let ac in currentAccomodation){
        if(currentAccomodation[ac]){
               acc=ac;break;
        }}
       let servicePerPerson=hotel[acc].price
       serviceCosts=servicePerPerson*members["adults"]+servicePerPerson*members["children"]
     
    }  //adding supplements
    let suppPrice=0
    if(hotel.SVMStatus){
            suppPrice+=supplements.SVM*hotel.SVM
    }
    if(hotel.SVPStatus){
            suppPrice+=supplements.SVP*hotel.SVP
    }
    if(hotel.SSStatus){
            suppPrice+=hotel.SS*singleRooms
    }
    return (serviceCosts+roomsPrice+suppPrice)*nights

}
function totalSupplements(){
    let roomsPrice=0;
    let singleRooms=0
    for(let room in availableRooms){
        if(hotel.rooms[room]){
            if(hotel.rooms[room].status==true){
                const numberOfBooks=hotel.rooms[room].units-availableRooms[room].units
                roomsPrice+=hotel.rooms[room].price*numberOfBooks
                if(room=="singleRoom")
                singleRooms=numberOfBooks
                    
                
            }
            
        }
    }
    let suppPrice=0
    if(hotel.SVMStatus){
            suppPrice+=supplements.SVM*hotel.SVM
    }
    if(hotel.SVPStatus){
            suppPrice+=supplements.SVP*hotel.SVP
    }
    if(hotel.SSStatus){
            suppPrice+=hotel.SS*singleRooms
    }
    return (suppPrice)*nights

}


function getReduction(){
    let parentingReduction=0

    let servicePerPerson=0
    if(!currentAccomodation["LS"]){
        //added services
        let acc='LS'
        for(let ac in currentAccomodation){
         if(currentAccomodation[ac]){
                acc=ac;break;
         }}
         servicePerPerson=hotel[acc].price
      
     }
     
     //adding supplements
     console.log("servicePerPerson")
     console.log(servicePerPerson)

     let totalPromo=0
        console.log('sqdazd')
        let ageMapping={

        }
                        for(let elemet in ages){
                            let age=ages[elemet]
                            if(age>11||age<2)continue
                            for(let rc in hotel.RCAges){
                                let element=hotel.RCAges[rc]
                                console.log('*************************************')
                                console.log(element)
                                console.log(age)
                                console.log(ageMapping)
                                if(!element.RCStatus)continue;
                                let ageBegin=element.RCAgeBegin
                                let ageEnd=element.RCAgeEnd
                                if(ageBegin<=age&&ageEnd>=age){
                                    ageMapping[age]=element.RC
                                }


                            }
                        }
    //getting map size()
    let size=0
    for(let p in ageMapping)size++;
    if(members["adults"]<3&&members['children']<2){
        //parenting reduction
        if(members["children"]>0){
             if(members["adults"]==1){//reduction 1 parent 1 enfant
                if(hotel.RACStatus){
                    return parseFloat(hotel.RAC/100)*servicePerPerson
                }
                else{
                    //look for by age reduction
            for(let element in ages){
                if(ageMapping.hasOwnProperty(ages[element]))
                    totalReduction+=parseFloat(ageMapping[ages[element]]/100)*servicePerPerson
            }
return totalReduction
                   

                }

                
            }
            
             else if(members["adults"]==2){//reduction 2 parent2 1 enfant
                if(hotel.RPCStatus){
                    return parseFloat(hotel.RPC/100)*servicePerPerson+totalPromo
                }
                else {
                    
                    //look for by age reduction
            for(let element in ages){
                if(ageMapping.hasOwnProperty(ages[element]))
                    totalReduction+=parseFloat(ageMapping[ages[element]]/100)*servicePerPerson
            }
return totalReduction
                }
                

            } 
                //check for age reduction
            
        }
    }
        //3rd 4th bed
  if(members['adults']+members['children']>3){
    if(hotel.RTFStatus){
        let totalReduction=parseFloat(hotel.RTF/100)*servicePerPerson*2
        if(members['adults']==2){
            for(let element in ages){
                if(element=="child1"||element=="child2")continue
                console.log("here")
                console.log(ages[element])
                console.log(ageMapping)
                console.log(element)
                console.log(ages)
                if(ageMapping.hasOwnProperty(ages[element]))
                    totalReduction+=parseFloat(ageMapping[ages[element]]/100)*servicePerPerson
            }
        }
        else if(members['adults']==3){
            console.log("***************************************")
            for(let element in ages){
                if(element=="child1")continue
                console.log("element")
                console.log(element)
                if(ageMapping.hasOwnProperty(ages[element]))
                    totalReduction+=parseFloat(ageMapping[ages[element]]/100)*servicePerPerson
            }
        }
        else{
            for(let element in ages){
                if(ageMapping.hasOwnProperty(ages[element]))
                    totalReduction+=parseFloat(ageMapping[ages[element]]/100)*servicePerPerson
            }

        }
        return totalReduction
    }
else {
    //apply 
    let totalReduction=0
    for(let element in ages){
        if(ageMapping.hasOwnProperty(ages[element]))
            totalReduction+=parseFloat(ageMapping[ages[element]]/100)*servicePerPerson
    }
    return totalReduction

}

  }
//******************* */

    
return 0
}
    return(
        <div ref={bookingContainer} id="booking-panel">
          <button onClick={abortBooking} id="exit-booking">X</button>
        {loading?"Loading":
         <section id="scroll-container">
          <section ref={page1} className="tester">
          <h2>Booking Form</h2>
          <BookingHotel setImage={setImage} setState={setImageState} hotel={hotel}/>
          <DepCheckInOut checkInDate={checkInDate} checkOutDate={checkOutDate} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate}  setNights={setNights} nights={nights}/>
          <BookingRooms supplements={supplements} setSupplements={setSupplements} availableRooms={availableRooms} setAvailableRooms={setAvailableRooms} setMembers={setMembers} hotel={hotel}/>
          <BookingAccomodations setSupplements={setSupplements} supplements={supplements} nights={nights} members={members} availableRooms={availableRooms} currentAccomodation={currentAccomodation} setCurrentAccomodation={setCurrentAccomodation} hotel={hotel}/>
           </section>
          <section ref={page2} className="tester">
            
          <h2>Additional Information</h2>
          <BookingInfo nationality={nationality} setNationality={setNationality} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} setPhoneNumber={setPhoneNumber}/>
          <div id="age-policy">
            <h4>Age Policy</h4>
            <p>1 year or less is considered a BABY</p>
            <p>2 years until 11 years is considered a CHILD</p>
            <p>12 years or more is considered an ADULT</p>
          </div>
          <BookingMembers firstNames={firstNames} setFirstNames={setFirstNames} lastNames={lastNames} setLastNames={setLastNames} nationalities={nationalities} setNationalities={setNationalities} ages={ages} setAges={setAges} babies={members.babies} children={members.children} adults={members.adults}/>

          </section>
          
          <section ref={page3} className="tester">
            
          <h2>Finishing Touches</h2>
          <BookingRequests pillows={pillows} person={person} birthDay={birthDay} pet={pet} blankets={blankets} honeyMoon={honeyMoon}  setBirthDay={setBirthDay} setBlankets={setBlankets} setHoneyMoon={setHoneyMoon} setPerson={setPerson} setPillows={setPillows} setPet={setPet}   />
          <BookingConditions/>
          <div id="booking-total">
               <h3> TOTAL PRICE</h3> 
               <p>{totalPrice().toFixed(1)}$ </p>
               <p>{getReduction().toFixed(1)}$ - (Reductions)</p>
               <hr className="line"/>
               <p>{((totalPrice()-getReduction())).toFixed(1)}$ </p>
            </div>
          </section>
          </section>
          }
          <BookingController loading={loading} checkInDate={checkInDate} checkOutDate={checkOutDate} submit={submit} setSubmit={setSubmit} data={{firstName:firstName,lastName:lastName,nationality:nationality,nationalities:nationalities,firstNames:firstNames,lastNames:lastNames,ages:ages}} members={members}  setPageCount={setPageCount} hotel={hotel}/>
          <ImageShow image={image} status={imageState} setStatus={setImageState}/>
       
        </div>
    )
}