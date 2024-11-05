
import {useRef ,useEffect,useState} from 'react'
import './trendingCard.css'
export default function TrendingCard({name,link}){
    const card=useRef(null)
    console.log(link)
 //   useEffect(()=>{card.current.style.backgroundImage= `url('../assets/hammamet.jpg')`})

return (
    
    <div  className='trending-cards' >
      <span><h3>{name}</h3></span>
    </div>
)
}