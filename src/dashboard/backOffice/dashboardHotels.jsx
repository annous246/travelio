import { useState,useEffect, useContext } from "react"
import AddedHotel from "./addedHotel"
import axios from 'axios'
import { notificationContext } from "../../App"
import LoadingPanel from "../../LoadingPanel/loadingpanel"
export default function DashboardHotels({setDashLoading}){
    const setMessage=useContext(notificationContext)
    const [hotels,setHotels]=useState([{region:"Sousse",stars:4,hotelName:"Radisson",rating:"4.9",description:"Awesome Big Hotel",services:{parking:true,wifi:true}}])
    const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{ 
        axios.post('https://api-travelio.onrender.com/getHotels')
        .then((res)=>{
            if(res.data.status){
   
                
               setHotels(res.data.hotels)
            }
            else{
                
                setMessage(res.data.message)
            }
            setIsLoading(false)
    
        })
        .catch((e)=>{
            setMessage(e.message)
            setIsLoading(false)
        })

    },[])

    return (
        <div style={{position:"relative"}}>
            {isLoading?<LoadingPanel loading={isLoading}/>:
            hotels.length?
            hotels.map((hotel)=>{
                return (<AddedHotel setDashLoading={setDashLoading} setHotel={setHotels} key={hotel._id} hotel={hotel}/>)
            })
            :
            <h3>No Hotels Added Yet</h3>}


        </div>
    )
}