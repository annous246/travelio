import './booking.css'
import { useState,useEffect,useContext } from 'react'
import profile from "../assets/profile.png"
import BookControl from './bookControl'
import io from 'socket.io-client'
import Facture from '../dashboard/facture'

export default function Booking({isAdmin, reservation,loading,setLoading}){
    console.log(reservation)
    const [status,setStatus]=useState(reservation.status)
    const [editStatus,setEditStatus]=useState(false)
    const [socketIo,setSocketIo]=useState(null)
    useEffect(()=>{
     setSocketIo(io("http://localhost:3000"))
    },[])
    useEffect(()=>{
      if(socketIo){
        socketIo.on(reservation._id,(data)=>{
                setStatus(data)
        })
      }
    },[socketIo])
    
  function getStatus(){
    switch(status){
      case 0:return "Pending";break;
      case 1:return "Accepted";break;
      case 2:return "Rejected";break;
      case 3:return "Deleted";break;
      case 4:return "Canceled";break;
      default:return "Done";break;
    }
  }
 function stringDate(){
    let now=new Date((reservation.date*1000))
    let day=now.getDate()
    let month=now.getMonth()+1
    let year=now.getFullYear()
    return year+"-"+month+"-"+day
  }
  function getMembers(){
    let res=0
    for(let m in reservation.members){
res+=reservation.members[m]
    }
    return res
  }
  function getColor(){
    switch(status){
      
      case 0:return "rgba(245, 242, 91, 0.911) ";break;
      case 1:return "rgba(13, 211, 89, 0.699) ";break;
      case 5:return "rgba(13, 211, 89, 0.699) ";break;
      case 2:return "rgba(247, 83, 72, 0.699)";break;
      case 3:return "rgba(107, 105, 105, 0.699)";break;
      default:return "rgba(107, 105, 105, 0.699)";break;
    }

  }
  
    return (
      
        <div className='book-container book-font'>
            <span style={{overflowX:"scroll"}} className="data-spanner">{reservation._id.toUpperCase()}</span>
            <span className="data-spanner"><img id='profile-book' src={profile}/> {reservation.data.firstName}  {reservation.data.lastName}</span>
            <span className="data-spanner">{stringDate()}</span>
            <span className="data-spanner">{getMembers()}</span>
            <span className="data-spanner">{reservation.hotel.hotelName}</span>
            <span className="data-spanner">{reservation.hotel.stars} Stars</span>
            <span className="data-spanner">{reservation.hotel.region}</span>
            <span className="data-spanner">{(reservation.totalPrice-reservation.reduction).toFixed(1)}$</span>
            {isAdmin&&<span className="data-spanner book-commission">{((reservation.totalPrice-reservation.reduction)*(reservation.commission)/100).toFixed(1)}$</span>}
            <span style={{backgroundColor:getColor()}} className="data-spanner book-status" >{getStatus()}</span>
            {<span className="data-spanner book-controls" onClick={()=>setEditStatus((prev)=>!prev)} ></span>}
            <BookControl isAdmin={isAdmin} setLoading={setLoading} editStatus={editStatus} reservation={reservation} status={status} setStatus={setStatus}/>
            
        </div>
    )
}