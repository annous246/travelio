import { useContext, useEffect, useState } from "react"
import { notificationContext } from "../../App"
import axios from "axios"
import io from "socket.io-client"
import Booking from "../../booking/booking"
import LoadingPanel from "../../LoadingPanel/loadingpanel"
export default function DashboardReservations({isAdmin}){
    
    const [reservations,setReservations]=useState([])
    const [loading,setLoading]=useState(true)
    const [socketIo,setSocketIo]=useState(null)
    const setMessage=useContext(notificationContext)
useEffect(()=>{
    if(isAdmin){

        if(socketIo){
            socketIo.on('newBooking',(data)=>{
                console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                console.log(data)
                setReservations((prev)=>{
                    return [...prev,data]
                })
            })
        }
    }
    
},[socketIo])
useEffect(()=>{
    setSocketIo(io('http://localhost:3000'))
axios.post('https://api-travelio.onrender.com/getBookings')
.then((res)=>{
    setLoading(false)
    setReservations(res.data.reservations)
})
.catch((e)=>{ 
    setMessage(e.message)
})
},[])
useEffect(()=>{
    if(loading){

axios.post('https://api-travelio.onrender.com/getBookings')
.then((res)=>{
    setLoading(false)
    setReservations(res.data.reservations)
})
.catch((e)=>{ 
    setMessage(e.message)
})        
    }
},[loading])
    return (
    <div id="booking-table">
    <div className='book-container'> 
        <span className="data-spanner">ID</span>
        <span className="data-spanner">Credentials</span>
        <span className="data-spanner">Date</span>
        <span className="data-spanner">Members Count</span>
        <span className="data-spanner">Hotel</span>
        <span className="data-spanner">Luxury Rate</span>
        <span className="data-spanner">Region</span>
        <span className="data-spanner">Total Payment</span>
        {isAdmin&&<span className="data-spanner">Agency Commission</span>}
        <span className="data-spanner">Status</span>
        <span className="data-spanner "></span>
        <span className="data-spanner book-controls-title"></span>
    </div>
        {loading?<LoadingPanel loading={loading}/>: 
        reservations.length?
            reservations.map((reservation)=>{
           return <Booking isAdmin={isAdmin} setLoading={setLoading} reservation={reservation} />
            })
            
            :"No Reservations To See"
       }
 </div>       
    )
}