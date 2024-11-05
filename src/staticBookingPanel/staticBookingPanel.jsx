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


export default function StaticBookingPanel({state,setState,currentHotel}){
    const bookingContainer=useRef(null)
    const [pageCount,setPageCount]=useState(1)
    const [submit,setSubmit]=useState(false)
    const [availableRooms,setAvailableRooms]=useState({})
    const [loading,setLoading]=useState(true)
    const [confirmation,setConfirmation]=useState(false)
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

    const [honeyMoon,setHoneyMoon]=useState(false)
    const [pillows,setPillows]=useState(false)
    const [blankets,setBlankets]=useState(false)
    const [pet,setPet]=useState(false)
    const [birthDay,setBirthDay]=useState(false)
    const [person,setPerson]=useState(false)
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
                    bookedRooms["azd"]="azd"
                    console.log(bookedRooms["azd"])
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
        axios.post('https://api-travelio.onrender.com/book',{hotelId:hotel._id,data:{firstName:firstName,lastName:lastName,nationality:nationality,nationalities:nationalities,firstNames:firstNames,lastNames:lastNames},preferences:{honeyMoon:honeyMoon,blankets:blankets,birthDay:birthDay,person:person,pet:pet,pillows:pillows},booking:{bookedRooms:bookedRooms,members:members,currentAccomodation:acc,totalPrice:totalPrice()},checkInDate:checkInDate,checkOutDate:checkOutDate})
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
    for(let room in availableRooms){
        if(hotel.rooms[room]){
            if(hotel.rooms[room].status){
                const numberOfBooks=hotel.rooms[room].units-availableRooms[room].units
                roomsPrice+=hotel.rooms[room].price*numberOfBooks
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
    }
    return (serviceCosts+roomsPrice)

}
    return(
        <div ref={bookingContainer} id="booking-panel">
          <button onClick={abortBooking} id="exit-booking">X</button>
        {loading?"Loading":
         <section id="scroll-container">
          <section ref={page1} className="tester">
          <h2>Booking Form</h2>
          <BookingHotel hotel={hotel}/>
          <BookingRooms availableRooms={availableRooms} setAvailableRooms={setAvailableRooms} setMembers={setMembers} hotel={hotel}/>
          <BookingAccomodations nights={nights} members={members} availableRooms={availableRooms} currentAccomodation={currentAccomodation} setCurrentAccomodation={setCurrentAccomodation} hotel={hotel}/>
          <DepCheckInOut checkInDate={checkInDate} checkOutDate={checkOutDate} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate}  setNights={setNights} nights={nights}/>
          </section>
          <section ref={page2} className="tester">
            
          <h2>Additional Information</h2>
          <BookingInfo nationality={nationality} setNationality={setNationality} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} setPhoneNumber={setPhoneNumber}/>
          <BookingMembers firstNames={firstNames} setFirstNames={setFirstNames} lastNames={lastNames} setLastNames={setLastNames} nationalities={nationalities} setNationalities={setNationalities} babies={members.babies} children={members.children} adults={members.adults}/>

          </section>
          
          <section ref={page3} className="tester">
            
          <h2>Finishing Touches</h2>
          <BookingRequests pillows={pillows} person={person} birthDay={birthDay} pet={pet} blankets={blankets} honeyMoon={honeyMoon}  setBirthDay={setBirthDay} setBlankets={setBlankets} setHoneyMoon={setHoneyMoon} setPerson={setPerson} setPillows={setPillows} setPet={setPet}   />
          <BookingConditions/>
          </section>
          </section>
          }
          <BookingController loading={loading} checkInDate={checkInDate} checkOutDate={checkOutDate} submit={submit} setSubmit={setSubmit} data={{firstName:firstName,lastName:lastName,nationality:nationality,nationalities:nationalities,firstNames:firstNames,lastNames:lastNames}} members={members}  setPageCount={setPageCount} hotel={hotel}/>
          
       
        </div>
    )
}