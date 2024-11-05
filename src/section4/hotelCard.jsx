
import { useContext, useState } from "react"

import BookingSection from "../bookingSection/bookingSection.jsx"
import Rating from "../rating/rating.jsx"
import { authenticationContext } from "../App.jsx"
export default function HotelCard({hotel}){
    const [state,setState]=useState(false)
    const {auth,setLoginOpen,loginOpen}=useContext(authenticationContext)
  function lv(){
    if(auth){
      setState(true)

    }
    else{
      if(!loginOpen)setLoginOpen(true)

    }

  }
    return(
        
    <div onMouseDown={lv}  className='hotel-card'>
    <BookingSection hotel={hotel} state={state} setState={setState}/>
    <div style={{backgroundImage:`url("/images/${hotel.mainImage}")`}} className="hotel-pic">
      <span className="stars"></span>
    </div>
    <span><h4>{hotel.hotelName}</h4></span>
    <span><h5>{hotel.Region}</h5></span>
    <Rating rating={hotel.rating}/>
  </div>
    )
}