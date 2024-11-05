

import { useEffect ,useRef, useState} from "react"
import "./loadingpanel.css"




export default function LoadingPanel({loading}){
    const s1=useRef(null)
    const s2=useRef(null)
    const s3=useRef(null)
    const s4=useRef(null)
    const [id,setId]=useState(null)
    const [status,setStatus]=useState(false)



    function animate(){
      
    if(s4&&s1&&s2&&s3){

        if(s1.current)
      s1.current.style.marginRight='1em'
      setTimeout(()=>{
        if(s2.current)
       s2.current.style.marginRight='1em'},100)
       setTimeout(()=>{
        if(s3.current)
        s3.current.style.marginRight='1em'},200)
        setTimeout(()=>{
          if(s4.current)
         s4.current.style.marginRight='1em'},300)
  
         
       setTimeout(()=>{
        if(s1.current)
           s1.current.style.marginRight='';},700)
       setTimeout(()=>{
        if(s2.current)
        s2.current.style.marginRight=''},800)
        setTimeout(()=>{
          if(s3.current)
         s3.current.style.marginRight=''},900)
         setTimeout(()=>{
          if(s4.current)
          s4.current.style.marginRight=''},1000)
    }}
  useEffect(()=>{
animate()
  setInterval(()=>animate(),1300)

    

  },[])
  useEffect(()=>{
    console.log("loading")
    console.log(loading)

  },[loading])
    return (
        <div id="loading-container">
            <span ref={s1} className="loading-span"></span>
            <span ref={s2} className="loading-span"></span>
            <span ref={s3} className="loading-span"></span>
            <span ref={s4} className="loading-span"></span>
        </div>
    )

}