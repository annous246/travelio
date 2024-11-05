import "./bookingRooms.css"
import { useEffect,useState,useRef } from "react"
import RoomAdderBooking  from "../roomAdderBooking/roomAdderBooking"


export default function BookingRooms({supplements , setSupplements,availableRooms,setAvailableRooms,setMembers,hotel}){
 const [roomAdderState,setRoomAdderState]=useState(false)
 const [thestate,setThestate]=useState(false)
 const [loading,setLoading]=useState(true)

 useEffect(()=>{
  let ar={'singleRoom':{},'doubleRoom':{},'tripleRoom':{},'quadrupleRoom':{},'familyRoom':{}}
  console.log(ar)
  for(let roomtype in ar){
    console.log(ar)
    if(hotel['rooms'][roomtype]){
      if(hotel['rooms'][roomtype].status){
        ar[roomtype]={
          
          status:hotel['rooms'][roomtype].status,
          price:hotel['rooms'][roomtype].price,
          units:hotel['rooms'][roomtype].units,}
         
      }
      else{ ar[roomtype]={
          
        status:ar[roomtype]=false}
        
      }
    }
    else {
      ar[roomtype]={
          
        status:ar[roomtype]=false}
        
    }
  }
setAvailableRooms(ar)
setLoading(false)
 },[])
 useEffect(()=>{setRoomAdderState(false);},[thestate])
    return(
        <div id="booking-rooms" onClick={()=>setRoomAdderState((true))}>
          <h2 id="booking-title">Book Hotel Rooms</h2>
       {!loading?
       
        <RoomAdderBooking supplements={supplements} setSupplements={setSupplements} setMembers={setMembers} thestate={thestate} setThestate={setThestate} roomAdderState={roomAdderState} setRoomAdderState={setRoomAdderState}  setAvailableRooms={setAvailableRooms}  availableRooms={availableRooms} hotel={hotel}  />
        :"Loading"}
        </div>
    )
}