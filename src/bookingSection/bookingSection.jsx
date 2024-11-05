import "./bookingSection.css"
import { useEffect,useState,useRef } from "react"
import BookingPanel from "../bookingPanel/bookingPanel"


export default function BookingSection({setState,state,hotel}){
  const container =useRef(null)

  useEffect(()=>{
    console.log(state)
    if(!state){
      container.current.className="no-panel"
      setTimeout(()=>{container.current.style.display="none"},200)
    }
    else{

      container.current.style.display="flex"
      setTimeout(()=>{
        container.current.className=""},200)
    }
  },[state])

    return(
        <section ref={container} className="no-panel" id="booking-section">
        <BookingPanel currentHotel={hotel} setState={setState} state={state}/>
        </section>
    )
}