import { useEffect,useState,useRef, useContext } from "react"
import './confirmationPanel.css'
import { panelContext } from "../App"





export default function ConfirmationPanel({acceptAction=()=>console.log("defaut"),givenMessage='',params=[]}){
   const [message,setMessage]=useState(givenMessage)
   const [state,setState]=useState(false)
   const container=useRef(null)
   const {setPanelMessage}=useContext(panelContext)
   useEffect(()=>{console.log(acceptAction);console.log("accept")},[acceptAction])
   useEffect(()=>{
    console.log("give")
    console.log(givenMessage)
    if(givenMessage.length)
        setMessage(givenMessage)
    },[givenMessage])
   useEffect(()=>{
    if(message.length)
        setState(true)
    
    else
        setState(false)
    
   },[message])
   useEffect(()=>{
    let id=null;
    if(!state){
        container.current.className="confirmation-panel"
         id=setTimeout(()=>{
            container.current.style.display='none';
        setMessage('')
        setPanelMessage("")
        },200)


    }
    else{
        
        container.current.style.display='flex'
         id=setTimeout(()=>{
            container.current.className="confirmation-panel popPanel"},200)
    }
    return(()=>clearTimeout(id))
   },[state])
    return(
        <div ref={container} className="confirmation-panel">
         <div className="confirmation-message">{message}</div>
         <div className="confirmation-controls">
            <button disabled={!state}  onClick={()=>{setState(false);acceptAction(...params)}} className="confirmation-yes">YES</button>
            <button disabled={!state} onClick={()=>setState(false)} className="confirmation-no">NO</button>
         </div>
        </div>
    )
}