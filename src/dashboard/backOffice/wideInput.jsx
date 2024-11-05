import { useState,useRef,useEffect } from "react"
export default function WideInput({color="white",status=true,title,placeholder,type,onChange,value}){
    const container=useRef(null)
    useEffect(()=> {container.current.style.marginTop="2em"
        container.current.style.color=color
    },[])
    return (
        <span className={status?"dashboard-home-input":"dashboard-home-input semi-opaque"} ref={container} >
        <label>{title}</label>
        <input value={value} onChange={(e)=>onChange(e.target.value)} type={type} placeholder={placeholder}/>
         </span>

    )
}