import "./bookingMembers.css"
import { useEffect,useState,useRef } from "react"
import WideInput from "../dashboard/backOffice/wideInput"

export default function BookingMembers({firstNames,lastNames,nationalities,setFirstNames,ages,setAges,setLastNames,setNationalities,adults,children,babies}){
 
 useEffect(()=>{
    let inptObj={}
    for(let index=0;index<adults;index++){
        inptObj["adult"+(index+1)]=""
    }
    for(let index=0;index<children;index++){
        inptObj["child"+(index+1)]=""
    }
    for(let index=0;index<babies;index++){
        inptObj["baby"+(index+1)]=""
    }
    let inages={}
    for(let index=0;index<children;index++){
        inages["child"+(index+1)]=""
    }

    setFirstNames(inptObj)
    setLastNames(inptObj)
    setNationalities(inptObj)
    setAges(inages)
 },[])
 useEffect(()=>{
    let inptObj={}
    for(let index=0;index<adults;index++){
        inptObj["adult"+(index+1)]=""
    }
    for(let index=0;index<children;index++){
        inptObj["child"+(index+1)]=""
    }
    for(let index=0;index<babies;index++){
        inptObj["baby"+(index+1)]=""
    }
    let inages={}
    for(let index=0;index<children;index++){
        inages["child"+(index+1)]=""
    }

    setFirstNames(inptObj)
    setLastNames(inptObj)
    setNationalities(inptObj)
    setAges(inages)
 },[babies])
 
 useEffect(()=>{
    let inptObj={}
    for(let index=0;index<adults;index++){
        inptObj["adult"+(index+1)]=""
    }
    for(let index=0;index<children;index++){
        inptObj["child"+(index+1)]=""
    }
    for(let index=0;index<babies;index++){
        inptObj["baby"+(index+1)]=""
    }
    let inages={}
    for(let index=0;index<children;index++){
        inages["child"+(index+1)]=""
    }

    setFirstNames(inptObj)
    setLastNames(inptObj)
    setNationalities(inptObj)
    setAges(inages)
 },[adults])
 
 useEffect(()=>{
    let inptObj={}
    for(let index=0;index<adults;index++){
        inptObj["adult"+(index+1)]=""
    }
    for(let index=0;index<children;index++){
        inptObj["child"+(index+1)]=""
    }
    for(let index=0;index<babies;index++){
        inptObj["baby"+(index+1)]=""
    }
    let inages={}
    for(let index=0;index<children;index++){
        inages["child"+(index+1)]=""
    }

    setFirstNames(inptObj)
    setLastNames(inptObj)
    setNationalities(inptObj)
    setAges(inages)
 },[children])

 /*<input value={ages['adult'+(index+1)]} onChange={(e)=>setAges((prev)=>{prev['adult'+(index+1)]=e.target.value;return {...prev}})} type="Number" placeholder="Age"/>
 <input value={ages['baby'+(index+1)]} onChange={(e)=>setAges((prev)=>{prev['baby'+(index+1)]=e.target.value;return {...prev}})} type="Number" placeholder="Age"/>
       */
 function render(){
    let elements=[]
    for(let index=0;index<adults;index++){
        let element=
        <span className="display-booking-row adults-section">
        <label>Adult {index+1}</label>
        <input value={firstNames['adult'+(index+1)]} onChange={(e)=>setFirstNames((prev)=>{prev['adult'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="First Name"/>
        <input value={lastNames['adult'+(index+1)]} onChange={(e)=>setLastNames((prev)=>{prev['adult'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="Last Name"/>
        <input value={nationalities['adult'+(index+1)]} onChange={(e)=>setNationalities((prev)=>{prev['adult'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="Nationality"/>
        
        </span>
 elements.push(element)
    }

    
    for(let index=0;index<children;index++){
        let element=
        <span className="display-booking-row children-section">
        <label>Child {index+1}</label>
        <input value={firstNames['child'+(index+1)]} onChange={(e)=>setFirstNames((prev)=>{prev['child'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="First Name"/>
        <input value={lastNames['child'+(index+1)]} onChange={(e)=>setLastNames((prev)=>{prev['child'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="Last Name"/>
        <input value={nationalities['child'+(index+1)]} onChange={(e)=>setNationalities((prev)=>{prev['child'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="Nationality"/>
        <input value={ages['child'+(index+1)]} onChange={(e)=>setAges((prev)=>{prev['child'+(index+1)]=e.target.value;return {...prev}})} type="Number" placeholder="Age"/>
        </span>
 elements.push(element)
    }

    
    for(let index=0;index<babies;index++){
        let element=
        <span className="display-booking-row babies-section">
        <label>Baby {index+1}</label>
        <input value={firstNames['baby'+(index+1)]} onChange={(e)=>setFirstNames((prev)=>{prev['baby'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="First Name"/>
        <input value={lastNames['baby'+(index+1)]} onChange={(e)=>setLastNames((prev)=>{prev['baby'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="Last Name"/>
        <input value={nationalities['baby'+(index+1)]} onChange={(e)=>setNationalities((prev)=>{prev['baby'+(index+1)]=e.target.value;return {...prev}})} type="text" placeholder="Nationality"/>
        </span>
 elements.push(element)
    }
    return elements
 }
    return(
        <div id="booking-members">
            {render()}
        </div>
    )
}