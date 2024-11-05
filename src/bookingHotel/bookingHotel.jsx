import "./bookingHotel.css"
import { useEffect,useState,useRef } from "react"
import Rating from '../rating/rating' 
import logo from "../assets/location.png"

export default function BookingHotel({hotel,setState,setImage}){
    const mainImageLink="../backend/images/"+hotel.mainImage
    const firstImageLink="../backend/images/"+hotel.firstImage
   const hotelPics=useRef(null)

    function getImages(){
        const elements=[]
        for(let imgIndex=0 ;imgIndex< hotel.additionalImages.length;imgIndex++){
            let ide="add-img"+(imgIndex+1)
            let imglink="../backend/images/"+hotel.additionalImages[imgIndex]
            let element=<span  onClick={()=>{setState(true);setImage(imglink)}} style={{backgroundImage:`url("../backend/images/${hotel.additionalImages[imgIndex]}")`}} id={ide}></span>
            
            if(!hotel.additionalImages[imgIndex]||!hotel.additionalImages[imgIndex].length)
            element=<span style={{backgroundSize:"30%"}} id={ide}></span>
          elements.push(element)
        }
        //incase if images not all full
        for(let imgIndex=hotel.additionalImages.length; imgIndex< 4;imgIndex++){
            let ide="add-img"+(imgIndex+1)
            let element=<span style={{backgroundSize:"30%"}} id={ide}></span>
            elements.push(element)
        }return elements
    }
    function getStars(s){
        const element=<span className="booking-hotel-star"></span>
        let elements =[element]
        for(let i=1;i<s;i++)elements.push(element)
        return elements
    }
    return(
        <div id="booking-hotel" >
            <div id="hotel-present">
                <span id="hotel-header"><h4>{hotel.hotelName}</h4>
                {getStars(hotel.stars)}
                
                </span>
                <div ref={hotelPics} id="hotel-pics">
                    <span style={{backgroundImage:`url("${mainImageLink}")`}}   onClick={()=>{setState(true);setImage(mainImageLink)}} id="main-img"></span>
                    <span style={{backgroundImage:`url("${firstImageLink}")`}}  onClick={()=>{setState(true);setImage(firstImageLink)}} id="first-img"></span>
                    {getImages()}
                </div>
            </div>
            <div id="hotel-info">
                <span id="booking-location">
                <img style={{width:"2em",height:"2em"}} src={logo}/>
                <h5>{hotel.region}</h5>
                <p>{hotel.hotelLocation}</p>
                </span>
                <span id="booking-rating"><Rating rating={hotel.rating}/></span>
                <span id="booking-description">{hotel.hotelDescription}</span>
            </div>
        </div>
    )
}