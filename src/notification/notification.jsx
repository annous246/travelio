import './notification.css'
import { useEffect,useState,useRef } from 'react'
export default function Notification({setMessageExternal,notif=""}){
    const notification=useRef(null)
    const [message,setMessage]=useState("")
    useEffect(()=>{
        let id;
        if(notif.length){
            //there is notif
            setMessage(notif)
                notification.current.style.animation='notify 4s';
                notification.current.style.display='block'
             id=setTimeout(()=>{
                notification.current.style.animation='';
                notification.current.style.display='none'
            setMessage('')
            setMessageExternal('')
            clearInterval(id)

            },4000)
        }
        return ()=>clearInterval(id)
    },[notif])
    
    return (
        <div id='notification' ref={notification}>
        <h4>{message}
        </h4>
        </div>
    )
}