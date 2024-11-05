import "./section2.css"
import {useRef ,useEffect,useState, useContext} from 'react'
import hammamet from '../assets/hammamet.jpg'
import tunisia from '../assets/tunisia.png'
import TrendingCard from '../trendingCard/TrendingCard.jsx'
import { authenticationContext, generalSearchContext } from "../App.jsx"

export default function Section2(){
  const img=useRef(null);
   /*
    <TrendingCard name="Hammamet" link="../hammamet.jpg"/>
    <TrendingCard name="Hammamet" link="../assets/hammamet.jpg"/>
    <TrendingCard name="Hammamet" link="../assets/hammamet.jpg"/>*/
   const {setGeneralSearch,setTotalNights}=useContext(generalSearchContext)
   const {setPageState,setPageCount,auth,loginOpen,setLoginOpen}=useContext(authenticationContext)
   function openSearch(name){
    if(auth){
    setGeneralSearch(name)
    setTotalNights(1)
    localStorage.setItem("pageCount",2)
    setPageState((prev)=>!prev)
    setTimeout(()=>localStorage.setItem('pageCount',0),100)
console.log("hi")

    }
    else{
      if(!loginOpen)
        setLoginOpen(true)
    }

   }
   
    return (
        
  <section id="section2">
    <h2 id="trending-title">Trending Destinations</h2>
    <div id="img-element" ref={img}></div>
    <div id="trending-container">
    <div style={{cursor:"pointer"}} onClick={()=>openSearch("djerba")}  className='trending-cards' id="djerba">
      <span><h3>Djerba</h3></span>
    </div>
    <div style={{cursor:"pointer"}} onClick={()=>openSearch("Hammamet")} className='trending-cards' id="hammamet">
      <span><h3>Hammamet</h3></span>
    </div>
    <div style={{cursor:"pointer"}} onClick={()=>openSearch("Tunis")}  className='trending-cards' id="tunis">
      <span><h3>Tunis</h3></span>
    </div>
    <div style={{cursor:"pointer"}} onClick={()=>openSearch("tataouin")}  className='trending-cards' id="tataouin">
      <span><h3>Tataouin</h3></span>
    </div>
    
    </div>
    
</section>
    )
}