import { useEffect, useRef, useState,context, createContext,useContext } from "react"
import "./roomAdderBooking.css"
import Room from "./room"
import {generalSearchContext, notificationContext, roomCountContext} from "../App"
import StaticRoom from "./StaticRoom"


export const roomsContext=createContext()
export default function StaticRoomAdderBooking({setMembers,setThestate,roomAdderState,setRoomAdderState,setLoading, setAvailableRooms,hotel,availableRooms}){
  console.log("here")
    const container=useRef(null);
    const mainContainer=useRef(null);
    const [allRooms,setAllRooms]=useState([{id:crypto.randomUUID(),adults:1,children:0,babies:0,status:true}])
    const {setRoomsCount}=useContext(roomCountContext)
    const {setPreferredRooms}=useContext(generalSearchContext)
    const setMessage=useContext(notificationContext)
    useEffect(()=>{
      if(roomAdderState){
        setTimeout(()=>{
          mainContainer.current.className=""},200)
          mainContainer.current.style.display="flex"}
      else{
          mainContainer.current.className="hide"
          setTimeout(()=>

              mainContainer.current.style.display="none",200)
      }
  },[roomAdderState])

  useEffect(()=>{
    let count=0;
    allRooms.map((room)=>{
      if(room.status==true)count++;console.log(room)
    })
    setPreferredRooms(allRooms)
    setRoomsCount(count) ;
  },[allRooms])

    
    function it(){
      console.log('it')
      setThestate((prev)=>!prev);
     // setTimeout(()=>{setRoomAdderState(false);console.log("v")},100)
  }
  
  function addRoom(){
    let rooms=0;
    let ok=false
    console.log("azdazdazdazdazdazdazdazd")
    console.log(availableRooms)
    for(let room in availableRooms){
      if(availableRooms[room].status&&availableRooms[room].units>0){
        ok=true;break
      }
    }
    if(!ok){
      
    setMessage("No More Rooms Are Left")
    } 
    else{
      
    const newRoom={id:crypto.randomUUID(),adults:1,children:0,babies:0,status:false}
    setAllRooms((prev)=>[...prev,newRoom])
    }
}

    return(
      <div id="main-roomAdder-container" ref={mainContainer}>
        <div id="roomAdder-container" ref={container}>
        <roomsContext.Provider value={[allRooms,setAllRooms]}>
        {allRooms.map((room,index)=>{
        return 
        <StaticRoom roomAdderState={roomAdderState} setMembers={setMembers} setAvailableRooms={setAvailableRooms} availableRooms={availableRooms} index={index}  key={room.id}  currentRoom={room}  container={container}  />
       

        })}
        </roomsContext.Provider>
          
        </div>
        <button type="button" onClick={it} id="roomAdder-close">X</button>
        <button type="button" onClick={addRoom} id="roomAdder-add"></button>
</div>
    )
}