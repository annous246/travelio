import { useContext, useEffect, useState } from "react"
import DashboardHotelsEditor from "./dashboardHotelEditor"
import DashboardHotelsAdder from "./DashboardHotelsAdder"
import { notificationContext, panelContext } from "../../App"
import axios from 'axios'
import ConfirmationPanel from "../../confirmationPanel/confirmationPanel"
import Reduction from "../../Reduction"

export default function AddedHotel({hotel,setHotel,setDashLoading}){
const setMessage=useContext(notificationContext)
const {setPanelMessage,setAcceptAction,setPaneParams}=useContext(panelContext)
const mainImageLink="../backend/images/"+hotel.mainImage
const [editState,setEditState]=useState(false)
const [hotelStatus,setHotelStatus]=useState(hotel.status)


function generateAgeReductions(){
let elements=[]
    for(let red of hotel.RCAges){
        if(red.RCStatus){
            let redSentence="";
            if(red.RCAgeBegin!=red.RCAgeEnd)
            redSentence="Reduction For Ages Between " + red.RCAgeBegin+" to "+red.RCAgeEnd
           else
           redSentence="Reduction For "+red.RCAgeBegin+" Of Age"
            elements.push(
                <Reduction color="rgba(8, 100, 97, 0.767)" title={redSentence} reduction={red.RC}/>)
        }

    }return elements
}
    function getStars(s){
    const element=<span className="added-hotel-star"></span>
    let elements =[element]
    for(let i=1;i<s;i++)elements.push(element)
    return elements
}
function editHotel(){
    setEditState(true)
}
function disable(){
    axios.post('https://api-travelio.onrender.com/updateHotelStatus',{hotelId:hotel._id,hotelStatus:hotelStatus})
    .then((res)=>{
        if(res.data.status){
            setHotelStatus((prev)=>!prev)
        }
        setMessage(res.data.message)
    })
    .catch((e)=>{
        setMessage(e.message)

    })
}
const deleter=(hotelId)=>{
axios.post("https://api-travelio.onrender.com/deleteHotel",{hotelId:hotelId})
.then((res)=>{
    if(res.data.status){
        setHotel((prev)=>{
            return prev.filter((hotel)=> hotel._id!=hotelId)
        })
    }
    setAcceptAction(()=>{})
    setPanelMessage('')
    setMessage(res.data.message)
})
.catch((e)=>{
    
    setAcceptAction(()=>{})
    setPanelMessage('')
    setMessage(e.message)
})
}
function deleteHotel(){
    console.log("test")
    setAcceptAction((prev)=>{return deleter})
    setPaneParams(()=>[hotel._id])
    setPanelMessage(`Would You Like To Delete This Hotel (${hotel.hotelName})`)
    
}
    return (
        !editState?
        <div className={hotelStatus?"added-hotel-card":"added-hotel-card faded"}>
        <img src={mainImageLink}/>
        <span className="dashboard-added-hotel-col">
        <span id="added-hotel-title" className="dashboard-added-hotel-spanner">
            <h2>{hotel.hotelName}</h2>
            {getStars(hotel.stars)}
        </span>
        <span className="dashboard-added-hotel-spanner">
            <span id="added-hotel-region"><span></span><h5>{hotel.region}</h5></span>
            {(hotel.parking||hotel.wifi)&&<span className="added-hotel-provide">Provides:</span>}
            {hotel.parking&&<span className="added-hotel-services">Parking</span>}
            {hotel.wifi&&<span className="added-hotel-services">Wifi</span>}
        </span> 
        <span id="added-hotel-description" className="dashboard-added-hotel-spanner">
            <p >{hotel.hotelDescription}</p>
        </span>
        <span id="added-hotel-description" className="dashboard-added-hotel-spanner">
           <div id="reduction-container">
                {hotel.RTFStatus&&<Reduction color="rgb(173, 63, 63)" title="Reduction 3rd and 4rth bed" reduction={hotel.RTF}/>}
                {hotel.RPCStatus&&<Reduction color="rgba(7, 119, 194, 0.603)" title="Reduction 2 Adults 1 Child" reduction={hotel.RPC}/>}
                {hotel.RACStatus&&<Reduction color="rgba(8, 187, 97, 0.767)" title="Reduction 1 Adult 1 Child" reduction={hotel.RAC}/>}
                {generateAgeReductions()}
                </div>
        </span>
        </span>
        <span id="added-hotel-controls" className="dashboard-added-hotel-col">
            <button onClick={deleteHotel}></button>
            <button onClick={disable}></button>
            <button onClick={editHotel}></button>
        </span>
       
    </div>
    :<DashboardHotelsEditor setDashLoading={setDashLoading} setEditState={setEditState} hotel={hotel}/>
    )
}