import {useState,useRef} from "react"




export default function CheckInOut({checkInDate,checkOutDate,handleCheckIn,handleCheckOut,nights}){

    const ci=useRef(null)
    const co=useRef(null)



    return (
        <>
        <span className="home-input" id='ci-span'>
        <label htmlFor='cid'>Check In</label>
        <input  ref={ci} value={checkInDate} onChange={handleCheckIn}  required={true} id='cid' placeholder="Check In" type="date" />
        </span>

        <span className="home-input" id='co-span'>
        <label htmlFor='cod'>Check Out</label>
        <input  ref={co} value={checkOutDate} onChange={handleCheckOut}  required={true} id='cod' placeholder="Check Out" type="date"/>
        </span>
        
        <span className="home-input" id='n-span'>
        <label>Nights</label>
        <label id="night-display">{nights}</label>

        </span>
        </>
    )
}