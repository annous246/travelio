import { useEffect,useState,useRef, useContext } from "react"
import './ratingPanel.css'
import { notificationContext, panelContext } from "../App"
import axios from "axios"





export default function RatingPanel({id="",hotelName="",status=false,setStatus}){
    const setMessage=useContext(notificationContext)
   const [state,setState]=useState(status)
   const container=useRef(null)
   const [stars,setStars]=useState(1)
   const starone=useRef(null)
   const startwo=useRef(null)
   const starthree=useRef(null)
   const starfour=useRef(null)
   const starfive=useRef(null)
   const starsArray=[starone,startwo,starthree,starfour,starfive]
   
   useEffect(()=>{
    let id=null;
    
    if(!state){
        setStatus(false)
        container.current.className="rating-panel"
         id=setTimeout(()=>{
            container.current.style.display='none';
        },200)


    }
    else{
        
        container.current.style.display='flex'
         id=setTimeout(()=>{
            container.current.className="rating-panel popPanel"},200)
    }
    return(()=>clearTimeout(id))
   },[state])

   
   useEffect(()=>{
    for(let i =1;i<=stars;i++){
      starsArray[i-1].current.className="stars-rating-btn active-rating-star"
    }
    for(let i =stars+1;i<=5;i++){
      starsArray[i-1].current.className="stars-rating-btn"
    }
},[stars])




function rate(){
    axios.post('https://api-travelio.onrender.com/rate',{id:id,rating:stars})
    .then((res)=>{
        if(res.data.status){
          setState(false)
        }
        setMessage(res.data.message)
    })
    .catch((e)=>setMessage(e.message))
}
    return(
        <div ref={container} className="rating-panel">
         <div className="rating-message">Rate The {hotelName} Hotel</div>
         <span className="rating-panel-input" id="rating-panel-stars">
              <label>Rating {stars}/5</label>
              <button ref={starone} onClick={()=>setStars(1)} className="stars-rating-btn active-rating-star" id="one-btn" type="button"></button>
              <button ref={startwo} onClick={()=>setStars(2)} className="stars-rating-btn" id="two-btn" type="button"></button>
              <button ref={starthree} onClick={()=>setStars(3)} className="stars-rating-btn" id="three-btn" type="button"></button>
              <button ref={starfour} onClick={()=>setStars(4)} className="stars-rating-btn" id="four-btn" type="button"></button>
              <button ref={starfive} onClick={()=>setStars(5)} className="stars-rating-btn" id="five-btn" type="button"></button>
              </span>
         
         <div className="rating-controls">
            <button onClick={rate}  className="rating-yes">Rate!</button>
            <button onClick={()=>setState(false)}  className="rating-no">Skip</button>
         </div>
        </div>
    )
}