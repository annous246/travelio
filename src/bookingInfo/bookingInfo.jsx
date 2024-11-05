import "./bookingInfo.css"
import { useEffect,useState,useRef } from "react"
import WideInput from "../dashboard/backOffice/wideInput"

export default function BookingInfo({firstName,lastName,nationality,phoneNumber,setFirstName,setLastName,setNationality,setPhoneNumber}){
    return(
        <div id="booking-info">
            
        <WideInput color="black" value={firstName} onChange={(v)=>setFirstName(v)} title="First Name" type="text" placeholder="John*"/>
        <WideInput color="black" value={lastName} onChange={(v)=>setLastName(v)} title="Last Name" type="text" placeholder="Doe*"/>
        <WideInput color="black" value={phoneNumber} onChange={(val)=>setPhoneNumber(val)} title="Phone Number" placeholder="00 0000 0000" type="Number"/>
        <WideInput color="black" value={nationality} onChange={(val)=>setNationality(val)} title="Nationality" placeholder="Tunisian*" type="text"/>
                
       
        </div>
    )
}