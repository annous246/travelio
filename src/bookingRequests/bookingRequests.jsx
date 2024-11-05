import "./bookingRequests.css"
import { useEffect,useState,useRef } from "react"
import WideInput from "../dashboard/backOffice/wideInput"
import Checker from '../checker/checker'
export default function BookingRequests({honeyMoon,setHoneyMoon,pillows,setPillows,blankets,setBlankets,setBirthDay,person,pet,setPet,birthDay,setPerson}){
    return(
        <div id="booking-requests">
            <Checker value={honeyMoon} onChange={setHoneyMoon} label="HoneyMoon Special Care"/>
            <Checker value={pillows} onChange={setPillows} label="Extra Pillows"/>
            <Checker value={blankets} onChange={setBlankets} label="Extra Blankets"/>
            <Checker value={pet} onChange={setPet} label="Pets Included"/>
            <Checker value={birthDay} onChange={setBirthDay} label="Birthday Special Occasion"/>
            <Checker value={person} onChange={setPerson} label="Person With Special Needs"/>
        </div>
    )
}