import "./section4.css"
import {useRef ,useEffect,useState} from 'react'
import hammamet from '../assets/hammamet.jpg'
import tunisia from '../assets/tunisia.png'
import TrendingCard from '../trendingCard/TrendingCard.jsx'
import Rating from '../rating/rating.jsx'
import LoadingPanel from "../LoadingPanel/loadingpanel.jsx"
import axios from 'axios'
import BookingPanel from "../bookingPanel/bookingPanel.jsx"
import BookingSection from "../bookingSection/bookingSection.jsx"
import HotelCard from "./hotelCard.jsx"

export default function Section4(){
  const img=useRef(null);
  const scroll=useRef(null);
  const [hotels,setHotels]=useState([])
  const [loading,setLoading]=useState(true);
   /*
    <TrendingCard name="Hammamet" link="../hammamet.jpg"/>
    <TrendingCard name="Hammamet" link="../assets/hammamet.jpg"/>
    <TrendingCard name="Hammamet" link="../assets/hammamet.jpg"/>*/
    function goLeft(){
      scroll.current.scrollBy({left:230,behavior:'smooth'})

    }
    function goRight(){
      scroll.current.scrollBy({left:-230,behavior:'smooth'})

    }
    useEffect(()=>{
      axios.post('https://api-travelio.onrender.com/getHotelsNow')
      .then((res)=>{
        if(res.data.status){
          setHotels(res.data.hotels)


        }


      })
      .catch((e)=>console.log(e.message))
    },[])
    function cmp(a,b){
      if(a.rating>b.rating)return 1
      if(a.rating<b.rating)return -1
      return 0
    }
    useEffect(()=>{
        if(hotels.length&&loading){
            setLoading(false)
        }
    },[hotels])
    return (
        
  <section id="section4">
    <h2 id="trending-title">Our Best Hotels</h2>
    <div id="scroll-container">
      {loading?<LoadingPanel loading={loading}/>:
    <div id="hotel-scroll" ref={scroll}>

   {hotels.map((hotel)=>{
    return(
      <HotelCard hotel={hotel}/>

    )

   })}

    
    </div>}
    </div>
    
</section>
    )
}
