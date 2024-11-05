import {useState,useRef,useEffect,useContext} from "react"
import { notificationContext } from "../App"




export default function DepCheckInOut({setCheckInDate,setCheckOutDate,checkInDate,checkOutDate, setNights,nights}){

    const ci=useRef(null)
    const co=useRef(null)
    
    const [checkIn,setCheckIn]=useState(null)
    const [checkOut,setCheckOut]=useState(null)
    const setMessage=useContext(notificationContext)


    
       console.log("not")
    function handleCheckIn(e){
      setNights('')
      if(e.target.value.length){
      const seconds=parseInt(new Date(e.target.value).getTime()/1000);
      const nowInHours=parseInt(parseInt(new Date().getTime()/1000)/(60*60*24))
      const hours=parseInt(parseInt(new Date(e.target.value).getTime()/1000)/(60*60*24))
      
       if(nowInHours>hours){
        setCheckInDate("")
        setMessage("CheckIn should be from today")}
        else{
         
     if(checkOut){
      if(checkOut<=seconds){
        //error
        console.log("error")
        setCheckInDate("")
        setMessage("CheckIn Cant Be With Or After ChekOut")
        return 
      }
      else {setCheckIn(seconds);
            setNights(parseInt((checkOut-seconds)/(3600*24)))
            setCheckInDate(e.target.value)
      }
     }
     else{setCheckIn(seconds)
      setCheckInDate(e.target.value)
    
     }
      
        }
      }
    else{ setCheckIn(null)
    setCheckInDate(e.target.value)}
    }
    
    
    function handleCheckOut(e){
      setNights('')
      if(e.target.value.length){
        const seconds=parseInt(new Date(e.target.value).getTime()/1000);
        const nowInHours=parseInt(parseInt(new Date().getTime()/1000)/(60*60*24))
        const hours=parseInt(parseInt(new Date(e.target.value).getTime()/1000)/(60*60*24))
     if(checkIn){
      if(checkIn>=seconds){
        //error
        console.log("error")
        setCheckOutDate("")
        setMessage("CheckOut Cant Be With Or Before CheckIn")
        return 
      }
      else {setCheckOut(seconds)
        setCheckOutDate(e.target.value)
    
        setNights(parseInt((seconds-checkIn)/(3600*24)))
      }
     }
     else{
      if(nowInHours>hours-1){
        console.log("error")
        console.log(hours)
        console.log(nowInHours)
        setMessage("CheckOut should be from tomorrow")
        setCheckOutDate("")
        return 
       
      }
      else{
      setCheckOut(seconds);
      setCheckOutDate(e.target.value)}
    
     }
     
      }
    else {setCheckOut(null)
    
    setCheckOutDate(e.target.value)}
    }

    return (
        <div id="checkinoutbooking">
        <span className="home-input-booking" id='ci-span-booking'>
        <label htmlFor='cid'>Check In</label>
        <input  ref={ci} value={checkInDate} onChange={handleCheckIn}  required={true} id='cid-booking' placeholder="Check In" type="date" />
        </span>

        <span className="home-input-booking" id='co-span-booking'>
        <label htmlFor='cod'>Check Out</label>
        <input  ref={co} value={checkOutDate} onChange={handleCheckOut}  required={true} id='cod-booking' placeholder="Check Out" type="date"/>
        </span>
        
        <span className="home-input-booking" id='n-span-booking'>
        <label>Nights</label>
        <label id="night-display-booking">{nights}</label>

        </span>
        </div>
    )
}