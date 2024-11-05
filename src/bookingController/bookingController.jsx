import { notificationContext } from "../App"
import "./bookingController.css"
import { useEffect,useState,useRef, useContext } from "react"



export default function BookingController({checkInDate,checkOutDate, hotel,setSubmit,submit, setPageCount,members,data,loading}){
const [currentPage,setCurrentPage]=useState(1)
const slider1=useRef(null)
const slider2=useRef(null)
const point1=useRef(null)
const point2=useRef(null)
const point3=useRef(null)
const nextBtn=useRef(null)
const prevBtn=useRef(null)
const setMessage=useContext(notificationContext)


function brokenPolicy(age,member){
    if(age<0)return true
    if(member=="child"){
        if(age<2||age>11)return true;
    }

    if(member=="adult"){
        if(age<12)return true;
    }
    if(member=="baby"){
        if(age>1)return true;
    }return false;

}
function handlePage(){
if(loading)return
if(currentPage<3){
if(currentPage==1){
    if(!checkInDate || !checkInDate.length){
        setMessage("Missing Check In Date")
        return
    }
    else if(!checkOutDate ||!checkOutDate.length){
        setMessage("Missing Check Out Date")
        return 
    }
}
   else if(currentPage==2){
        //check data
        if(!data.firstName.length||!data.lastName.length||!data.nationality.length){
            setMessage("Personnal Data Is Missing")
            return ;
        }
        let singleMembers={
            child:members.children,
            adult:members.adults,
            baby:members.babies,
        }
        for(let member in singleMembers){
           for(let ind =1;ind<singleMembers[member]+1;ind++){
                if(!data.firstNames[member+ind]){
                    setMessage(member+ind+" Data Is Missing")
                    return ;
                }
                if(!data.lastNames[member+ind]){
                    setMessage(member+ind+" Data Is Missing")
                    return ;
                }
                if(!data.nationalities[member+ind]){
                    setMessage(member+ind+" Data Is Missing")
                    return ;
                }

                if(!data.ages[member+ind]&&member=="child"){
                    setMessage(member+ind+" Data Is Missing")
                    return ;
                }
                else if(member=="child"&&brokenPolicy(data.ages[member+ind],member)){
                    setMessage(member+ind+" Age Is Not Valid (Please Read Our Age Policy)")
                    return ;

                }

           }
        }

    }
    switch(currentPage){
        case 1:slider1.current.className="booking-slider current-booking";point2.current.className="booking-point current-booking";break;
        case 2:slider2.current.className="booking-slider current-booking";point3.current.className="booking-point current-booking";nextBtn.current.className="blue-btn current-booking"; break;
     
    }
    setCurrentPage((prev)=>prev+1)

}
else if(currentPage==3){
    if(!submit)
    setSubmit(true)
}

}
useEffect(()=>{setPageCount(currentPage)},[currentPage])

function handlePrev(){
    if(loading)return
    if(currentPage>1){
        switch(currentPage){
            case 2:slider1.current.className="booking-slider";point2.current.className="booking-point ";break;
            case 3:slider2.current.className="booking-slider";point3.current.className="booking-point ";nextBtn.current.className="blue-btn"; break;
         
        }
        setCurrentPage((prev)=>prev-1)
    
    }
}
    return(
        <div id="booking-control">
            <button ref={prevBtn}  disabled={loading} onClick={handlePrev} id="prev-btn" className="blue-btn"></button>
            <button ref={nextBtn} disabled={loading} onClick={handlePage} id="next-btn" className="blue-btn">{currentPage<3?"Next":"Book!"}</button>
            <div id="progress-display">
                
            <span ref={point1} className="booking-point current-booking"></span>
            <span ref={slider1} className="booking-slider"></span>
            <span ref={point2} className="booking-point"></span>
            <span ref={slider2} className="booking-slider"></span>
            <span ref={point3} className="booking-point"></span>
            </div>
            <div id="progress-milestones">
                
                <span className="booking-ml-naming">Booking Information</span>
                <span className="booking-milestone"></span>
                <span className="booking-ml-naming">Additional Inforamtion</span>
                <span className="booking-milestone"></span>
                <span className="booking-ml-naming">Finishing Touches</span>
                
                </div>
        </div>
    )
}