import { useContext, useEffect, useState } from "react";
import "./revenue.css"
import axios from "axios";
import dailyPic from "../assets/daily.jpg"
import weeklyPic from "../assets/weekly.jpg"
import monthlyPic from "../assets/monthly.jpg"
import totalPic from "../assets/total.jpg"
import { notificationContext } from "../App";


export default function Revenue(){
    const [loading,setLoading]=useState(true)
    const [daily,setDaily]=useState(0)
    const [weekly,setWeekly]=useState(0)
    const [monthly,setMonthly]=useState(0)
    const [total,setTotal]=useState(0)
    const setMessage=useContext(notificationContext)
   useEffect(()=>{
    axios.get('https://api-travelio.onrender.com/getRevenue')
    .then((res)=>{
        if(res.data.status){
        setDaily(res.data.daily)
        setMonthly(res.data.monthly)
        setWeekly(res.data.weekly)
        setTotal(res.data.total)

        }
        setLoading(false)
        seMessage(res.data.message)

    })
    .catch((e)=>{
        seMessage(e.message)
        setLoading(false)
    })
   },[])

   return(
    <div id="revenue-container">
        <div className="div-revenue" style={{backgroundImage:`url("${dailyPic}")`}}>
            <h7><span className="roll-revenue daily">Daily</span><br/> Revenue</h7>
            <div  className="revenue">${daily}</div>
        </div>
        <div className="div-revenue" style={{backgroundImage:`url("${weeklyPic}")`}}>
            <h7><span className="roll-revenue weekly">Weekly </span><br/>Revenue</h7>
            <div  className="revenue">${weekly}</div>
        </div>
        <div className="div-revenue" style={{backgroundImage:`url("${monthlyPic}")`}}>
            <h7><span className="roll-revenue monthly">Monthly </span><br/>Revenue</h7>
            <div  className="revenue">${monthly}</div>
        </div>
        <div className="div-revenue" style={{backgroundImage:`url("${totalPic}")`}}>
            <h7><span className="roll-revenue total">Total </span><br/>Revenue</h7>
            <div  className="revenue">${total}</div>
        </div>
    </div>
   )
}