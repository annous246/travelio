import "./checker.css"
import { useEffect,useState,useRef } from "react"
export default function Checker({label,onChange,value}){
    
    return(
        <div className="checker">
            <span onClick={()=>{onChange(!value)}} className={value?"valid-checker":""}></span>
            <h5>{label}</h5>
        </div>
    )
}