import { useContext, useState,useEffect,useRef } from "react"
import HotelInSearch from "../hotelInSearch/hotelInSearch"
import axios from "axios"
import "./filterItem.css"
import { notificationContext } from "../App"
export default function FilterItem({title,state,setState}){
    return(
        <div className="filter-item-container">
                <button onClick={()=>setState((prev)=>!prev)} className={state?"filter-item-btn active-filter":"filter-item-btn"}></button>
                <p>{title}</p>
            </div>
    )
}