import { useContext,useEffect,useState } from "react"
import ppic from '../assets/profile.png'
import {authenticationContext, notificationContext} from "../App"
import axios from 'axios'
export default function Profile(){
const {setPageCount,setAuth,setUpdateHeaders,user,updateHeaders,setPageState,pageState}=useContext(authenticationContext)
const setMessage=useContext(notificationContext)
    function logout(){
        axios.post('https://api-travelio.onrender.com/logout')
        .then((res)=>{
          if(res.data.status){
              if(res.data.logoutStatus){
                  localStorage.removeItem('token')
                  setMessage("Logged out Successfully")
                  setAuth(false)
                  setUpdateHeaders(!updateHeaders)
              }
              else{
                  setMessage("You Are Already Logged out")
              }
          }
          else{
              
              setMessage("Internal Error")
          }
        })
        .catch((e)=>setMessage(e.message))
      }
      
    return (
    <div style={{ borderRadius:'1em',border:"0.08em solid black", padding:"0.5em", display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"center",justifyContent:"space-between"}}>

        <span onClick={()=>{localStorage.setItem('pageCount',1);
        console.log(localStorage.getItem('pageCount')+" change")
            
            setPageState((prev)=>!prev);}} id="language">
        <img  src={ppic}/></span><span style={{ display:"flex",flexDirection:"column",flexWrap:"nowrap", marginLeft:"0.5em",justifyContent:"center",alignItems:"center"}}>

        <h4>{user.firstName}</h4>
        <button onClick={logout} id="logout-btn">Logout</button>
        </span>
    </div>
    )

}