import { useEffect,useState,useRef, useContext } from 'react'
import './bookControl.css'
import { authenticationContext, generalSearchContext, notificationContext } from '../App'
import axios from "axios"
import printer from "html2pdf.js"
import Facture from '../dashboard/facture'

export default function BookControl({isAdmin, reservation,status,setStatus,editStatus,setLoading}){
    
    const setMessage=useContext(notificationContext)
    const currentContainer=useRef(null)
    const [buttonsStatus,setButtonStatus]=useState(true)
    const {setReservation}=useContext(generalSearchContext)
    const {setPageCount}=useContext(authenticationContext)
    
    function decline(){
        setButtonStatus(false)
        axios.post('https://api-travelio.onrender.com/declineBooking',reservation._id)
        .then((res)=>{
if(res.data.status){
    //accepted
    setStatus(2)
}
setButtonStatus(true)
setMessage(res.data.message)
        })
        .catch((e)=>{setMessage(e.message);
            setButtonStatus(true)})
    }

    
    function remove(){
        setButtonStatus(false)
        axios.post('https://api-travelio.onrender.com/removeBooking',{id:reservation._id,clientId:reservation.id})
        .then((res)=>{
if(res.data.status){
    //accepted
   // setLoading(true)
setStatus(3)
}
setButtonStatus(true)
setMessage(res.data.message)
        })
        .catch((e)=>{setMessage(e.message);
            setButtonStatus(true)})
    }

    
    function accept(){
        setButtonStatus(false)
        axios.post('https://api-travelio.onrender.com/acceptBooking',{id:reservation._id,clientId:reservation.id})
        .then((res)=>{
if(res.data.status){
    //accepted
   // setLoading(true)
setStatus(1)
}
        setButtonStatus(true)
setMessage(res.data.message)
        })
        .catch((e)=>{setMessage(e.message);
            setButtonStatus(true)})
    }


    
    function decline(){
        setButtonStatus(false)
        axios.post('https://api-travelio.onrender.com/declineBooking',{id:reservation._id,clientId:reservation.id})
        .then((res)=>{
if(res.data.status){
    //accepted
  //  setLoading(true)
setStatus(2)
}
        setButtonStatus(true)
setMessage(res.data.message)
        })
        .catch((e)=>{setMessage(e.message);
            setButtonStatus(true)})
    }

    
    function cancel(){
        setButtonStatus(false)
        axios.post('https://api-travelio.onrender.com/cancelBooking',{id:reservation._id,clientId:reservation.id})
        .then((res)=>{
if(res.data.status){
    //accepted
  //  setLoading(true)

  
setStatus(4)
}
setButtonStatus(true)
setMessage(res.data.message)
        })
        .catch((e)=>{setMessage(e.message);
            setButtonStatus(true)})
    }


    
    function print(){

        setReservation(reservation)
        setPageCount(3)

  
}
    
    function getButtons(){
        if(!isAdmin){
            if(status==0){
                return (
                <button onClick={cancel} disabled={!buttonsStatus}  type='button' className='decline-booking'>Cancel</button>)
            }
            else if(status==1){
                //printer
               return  <button onClick={print} disabled={!buttonsStatus}  type='button' className='print-booking'></button>
            }
        }
        else{
            if(status==0){
                //pending
                return ([
                    <button disabled={!buttonsStatus} type='button' className='accept-booking' onClick={accept}>Accept</button>,
                    <button disabled={!buttonsStatus} type='button' className='decline-booking' onClick={decline}>Decline</button>])
            }
            else if(status==2||status==4) { return (
                <button disabled={!buttonsStatus} type='button' className='delete-booking' onClick={remove}></button>)
    
            }
            else if(status==1){
                //printer
               return  <button onClick={print} disabled={!buttonsStatus}  type='button' className='print-booking'></button>
            }

        }
    }
    useEffect(()=>{
        if(editStatus)
        currentContainer.current.className="book-control-container opaque"
    else
        currentContainer.current.className="book-control-container"
    }
        ,[editStatus])
    return (
        <div ref={currentContainer} className='book-control-container'> 
        {getButtons()}
        </div>
    )
}