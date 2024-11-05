import { useContext, useState,useEffect,useRef } from "react"
import { notificationContext, panelContext } from "../App"
import axios from 'axios'
import Rating from '../rating/rating'
import ConfirmationPanel from "../confirmationPanel/confirmationPanel"

import Reduction from "../Reduction"
import './hotelInSearch.css'
import BookingSection from "../bookingSection/bookingSection"

export default function HotelInSearch({priceStatus,price=0,mappedRooms,hotel,setRatingState,setRatingHotelName,setRatingId}){
    console.log("hotel and map")
    console.log(hotel)
    console.log(price)
const setMessage=useContext(notificationContext)
const {setPanelMessage,setAcceptAction,setPaneParams}=useContext(panelContext)
const mainImageLink="../backend/images/"+hotel.mainImage
const [hotelStatus,setHotelStatus]=useState(true)
const [totalPrice,setTotalPrice]=useState(0)
const [state,setState]=useState(false)
const hotelImage=useRef(null)
const bookingSection=useRef(null)
const redSentence=hotel.RCStatus?"Reduction For Members of Age "+hotel.RCAge:""
/*
        {(hotel.RTFStatus||hotel.RPCStatus||hotel.RACStatus)&&<div id="reduction-container">
            {hotel.RTFStatus&&<Reduction color="rgb(173, 63, 63)" title="Reduction 3rd and 4rth bed" reduction={hotel.RTF}/>}
            {hotel.RPCStatus&&<Reduction color="rgba(7, 119, 194, 0.603)" title="Reduction 2 Adults 1 Child" reduction={hotel.RPC}/>}
            {hotel.RACStatus&&<Reduction color="rgba(8, 187, 97, 0.767)" title="Reduction 1 Adult 1 Child" reduction={hotel.RAC}/>}
            {hotel.RCStatus&&<Reduction color="rgba(8, 100, 97, 0.767)" title={redSentence} reduction={hotel.RC}/>}
            </div>}*/

useEffect(()=>{
    //check if hotel is suitable
    console.log(mainImageLink)
    if(priceStatus){
    for(let room in mappedRooms){
        if(!mappedRooms[room])continue;
        console.log("getting rooms")
        console.log(room)
        console.log(hotel.rooms[room])
        if(!hotel["rooms"][room]||!hotel.rooms[room].status){
            setHotelStatus(false);
            break;
        }
    }   
    //count total price 

    }
    console.log("............................................")
    console.log(mainImageLink)
hotelImage.current.style.backgroundImage=`url('${mainImageLink}')`

},[])
    function getStars(s){
    const element=<span className="search-hotel-star"></span>
    let elements =[element]
    for(let i=1;i<s;i++)elements.push(element)
    return elements
}


function popBooking(){
    setState(true)
}


    return (
    <div className={hotelStatus?"search-hotel-card":"search-hotel-card faded"}>
        <span ref={hotelImage} id="search-hotel-img"></span>
        <span className="dashboard-search-hotel-col">
        <span id="search-hotel-title" className="dashboard-search-hotel-spanner">
            <h2>{hotel.hotelName}</h2>
            {getStars(hotel.stars)}
        </span>
        <span className="dashboard-search-hotel-spanner">
            <span id="search-hotel-region"><span></span><h5>{hotel.region}</h5></span>
            {(hotel.parking||hotel.wifi)&&<span className="search-hotel-provide">Provides:</span>}
            {hotel.parking&&<span className="search-hotel-services">Parking</span>}
            {hotel.wifi&&<span className="search-hotel-services">Wifi</span>}
        </span> 
        <span id="search-hotel-description" className="dashboard-search-hotel-spanner">
        <Rating rating={hotel.rating}/>
        </span>
        {hotelStatus&&priceStatus&&
        
        <span id="search-hotel-description" className="dashboard-search-hotel-spanner hotel-price-container">
       <h4>Total Price</h4>
        <p id="hotel-price">{price}$</p>
        </span>}
       
        <span id="search-hotel-description" className="dashboard-search-hotel-spanner">
            <p >{hotel.hotelDescription}</p>
        </span>
        <span id="search-hotel-description" className="dashboard-search-hotel-spanner">

        </span>
        <button onClick={popBooking} id="book-btn" className="blue-btn">{hotelStatus?"Book":"Check Options"}</button>
        <button id="rate-btn" onClick={()=>{setRatingState(true);setRatingHotelName(hotel.hotelName);setRatingId(hotel._id)}} className="blue-btn">Rate</button>
        </span>
        
  <BookingSection hotel={hotel} setState={setState} state={state} />
    </div>
    )
}