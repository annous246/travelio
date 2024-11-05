import { useState,useRef,useEffect } from "react"
import Searcher from "../Search form/Searcher"
export default function HotelRoom({title,confirmation,setConfirmation,price,setPrice,setUnits,units}){
    
    const room=useRef(null)
    useEffect(()=>{
        if(confirmation){
            room.current.style.opacity=1
            

        }
        else
        room.current.style.opacity=0.5
    },[confirmation])
    return (
              <span ref={room} className="dashboard-room-input" id="single-input">
              <label>{title}</label>
              <label>Number Of Rooms</label>
              <input value={units} onChange={(e)=>setUnits(e.target.value)} className="number-room-input" type="Number" placeholder="50"/>
              <label>Reservation Price Per Unit (In Dollars)</label>
              <input value={price} onChange={(e)=>setPrice(e.target.value)} className="number-room-input" type="Number" placeholder="100$"/>
              
              <button className={!confirmation?"hotel-room-btn":"hotel-room-btn revoke"} onClick={()=>setConfirmation(!confirmation)} type="button">{confirmation?"Revoke":"Confirm"}</button>
              </span>

              
    )
}