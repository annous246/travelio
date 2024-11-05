import "./section3.css"
import {useRef ,useEffect,useState} from 'react'
import hammamet from '../assets/hammamet.jpg'
import tunisia from '../assets/tunisia.png'
import TrendingCard from '../trendingCard/TrendingCard.jsx'
import axios from "axios"

export default function Section3(){
  const [loading,setLoading]=useState(true)
  const img=useRef(null);
  const scroll=useRef(null);
  const tt=useRef(null);
  const container=useRef(null);
  const [hotels,setHotels]=useState([])
  const [scrollState,setScrollState]=useState(0)
   /*
    <TrendingCard name="Hammamet" link="../hammamet.jpg"/>
    <TrendingCard name="Hammamet" link="../assets/hammamet.jpg"/>
    <TrendingCard name="Hammamet" link="../assets/hammamet.jpg"/>*/



    useEffect(()=>{
      axios.post('https://api-travelio.onrender.com/getHotels')
      .then((res)=>{
        console.log(res.data.hotels)
        if(res.data.status){
          setHotels(res.data.hotels)
          setLoading(false)

        }
      
      })
      .catch((e)=>console.log(e.message))
    },[])
    function goLeft(){
      //scroll.current.scrollBy({left:230,behavior:'smooth'})
     // scroll.current.className="scrollit"
     if(scrollState>-690){
      setScrollState((prev)=>{
        scroll.current.style.transform=`translateX(${prev-230}px)`
         return  prev-230
        })

     }
  
    }
    function goRight(){
      if(scrollState<0){
      setScrollState((prev)=>{
      scroll.current.style.transform=`translateX(${prev+230}px)`
       return  prev+230
      })

      }

    }
    function getNumberhotels(f){
     
     let count=0;
     hotels.map((hotel)=>{
      count+=(hotel.region.toLowerCase()==f.toLowerCase())
     })
     return count
    }
    return (
        
  <section id="section3">
    <h2 id="trending-title">Explore All Popular Destinations</h2>
    <div id="scroll-container" ref={container}>
    <button onClick={goRight} id="left-scroll"></button>
    <button onClick={goLeft} id="right-scroll"></button>
    <div id="popular-scroll" ref={scroll}>

    <div  className='popular-card'>
      <div id="djerba" className="popular-pic"></div>
      <span><h4>Djerba</h4></span>
      <span><h5>{getNumberhotels("Djerba")} Hotels</h5></span>
    </div>
    
    <div  className='popular-card'>
      <div id="hammamet" className="popular-pic"></div>
      <span><h4>Hammamet</h4></span>
      <span><h5>{getNumberhotels("Hammamet")} Hotels</h5></span>
    </div>
    <div  className='popular-card'>
      <div id="tunis" className="popular-pic"></div>
      <span><h4>Tunis</h4></span>
      <span><h5>{getNumberhotels("Tunis")} Hotels</h5></span>
    </div>
    <div  className='popular-card'>
      <div id="tataouin" ref={tt} className="popular-pic"></div>
      <span><h4>Tataouin</h4></span>
      <span><h5>{getNumberhotels("tatouin")} Hotels</h5></span>
    </div>
    <div  className='popular-card'>
      <div id="hammamet" className="popular-pic"></div>
      <span><h4>Hammamet</h4></span>
      <span><h5>{getNumberhotels("Hammamet")} Hotels</h5></span>
    </div>
    
    <div  className='popular-card'>
      <div id="hammamet" className="popular-pic"></div>
      <span><h4>Hammamet</h4></span>
      <span><h5>{getNumberhotels("Hammamet")} Hotels</h5></span>
    </div>
    
    <div  className='popular-card'>
      <div id="hammamet" className="popular-pic"></div>
      <span><h4>Hammamet</h4></span>
      <span><h5>{getNumberhotels("Hammamet")} Hotels</h5></span>
    </div>
    
    </div>
    </div>
</section>
    )
}