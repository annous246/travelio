import { useEffect, useRef, useState,context, createContext,useContext } from "react"
import "./roomAdder.css"
import Room from "./room"
import {generalSearchContext, roomCountContext} from "../App"



export const roomsContext=createContext()
export default function RoomAdder({roomAdderState,setRoomAdderState}){
    const container=useRef(null);
    const mainContainer=useRef(null);
    const [allRooms,setAllRooms]=useState([{id:crypto.randomUUID(),adults:1,children:0,babies:0,status:true}])
    const {setRoomsCount}=useContext(roomCountContext)
    const {setPreferredRooms}=useContext(generalSearchContext)
    useEffect(()=>{
      if(roomAdderState){
          mainContainer.current.style.display="flex"}
      else{
          
          setTimeout(()=>
              mainContainer.current.style.display="none",200)
      }
  },[roomAdderState])
    function close(){
      setRoomAdderState(false)
  }
  
  function addRoom(){
    const newRoom={id:crypto.randomUUID(),adults:1,children:0,babies:0,status:false}
    setAllRooms((prev)=>[...prev,newRoom])
}

  useEffect(()=>{
    let count=0;
    allRooms.map((room)=>{
      if(room.status==true)count++;console.log(room)
    })
    setPreferredRooms(allRooms)
    setRoomsCount(count) ;
  },[allRooms])
    return(
      <div id="main-roomAdder-container" ref={mainContainer}>
        <div id="roomAdder-container" ref={container}>
        <roomsContext.Provider value={[allRooms,setAllRooms]}>
        {allRooms.map((room,index)=>{
        return <Room index={index}  key={room.id}  currentRoom={room} roomAdderState={roomAdderState} container={container} setRoomAdderState={setRoomAdderState} />
        

        })}
        </roomsContext.Provider>
          
        </div>
        <button type="button" onClick={close} id="roomAdder-close">X</button>
        <button type="button" onClick={addRoom} id="roomAdder-add"></button>
</div>
    )
}