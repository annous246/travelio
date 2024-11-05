import './dashboard.css'
import  {useLayoutEffect,useEffect,useContext,useRef,useState} from 'react'
import axios from 'axios'
import logo from'../assets/LOGO ZENITH.png'
import Profile from'../profile/profile'
import ppic from "../assets/profile.png"
import { authenticationContext, generalSearchContext, notificationContext } from '../App'
import DashboardHotels from './backOffice/dashboardHotels'
import DashboardReservations from './backOffice/dashboardReservations'
import DashboardHotelsAdder from './backOffice/DashboardHotelsAdder'
axios.defaults.withCredentials=true
import Revenue from '../revenue/revenue'
import Facture from './facture'
import printer from "html2pdf.js"
import HotelSearchResults from '../hotelSearchResults/hotelSearchResults'
import LoadingPanel from '../LoadingPanel/loadingpanel'
export default function Dashboard(){

    const {user,setPageCount}=useContext(authenticationContext)
    const [dashnavCount,setDashnavCount]=useState(0)
    const [dashNavState,setDashNavState]=useState(false)
    const dashMain=useRef(null)
    const contentContainer=useRef(null)
    const [isAdmin,setIsAdmin]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const {setGeneralSearch,setTotalNights,setPreferredRooms}=useContext(generalSearchContext)
    function goHotels(){
        return <HotelSearchResults priceStatus={false}/>

    }
function dashMainRender(){
    if(isLoading){
        return <LoadingPanel loading={isLoading}/>
    }
    else{
        console.log(dashnavCount+" couhnt")
    if(dashnavCount==0){
        return <DashboardReservations isAdmin={isAdmin}/>;
    }
    if(dashnavCount==1){
        return !isAdmin?  goHotels():<DashboardHotelsAdder setDashNavState={setDashNavState} />;;
    }
    if(dashnavCount==2){
        return   <DashboardHotels setDashLoading={setIsLoading}/>;
    }
    if(dashnavCount==3){
        return   <DashboardHotels setDashLoading={setIsLoading}/>;
    }
    }
}
useEffect(()=>{
    setDashnavCount((prev)=>localStorage.getItem('dashNavCount'))
   

},[])
useEffect(()=>{
    contentContainer.current.className="disappear";
   const theid= setTimeout(()=>{
    contentContainer.current.className="";

   },100)
   return ()=>clearInterval(theid)
   
},[dashnavCount])
useEffect(()=>{
    setDashnavCount((prev)=>localStorage.getItem('dashNavCount'))
},[dashNavState])

useLayoutEffect(()=>{
    axios.post('https://api-travelio.onrender.com/isAdmin')
    .then((res)=>{
        console.log(res.data)
        if(res.data.status){
            console.log(res.data)
            setIsAdmin(res.data.isAdmin)
            setIsLoading(false)

        }

    })
    .catch((e)=>{
        setMessage(e.message)
    })
   
},[])




    return (
        <section id='dashboard-container'>
            <div id='dashboard-nav'>
                
                <span id="dashboard-logo-span">
                    <img id="logo-img" src={logo}/>
                </span>

                <ul>
                    {isLoading?<LoadingPanel loading={isLoading}/>:<>
                    <li onClick={()=>{localStorage.setItem('dashNavCount',0);setDashNavState((prev)=>!prev);}} className={dashnavCount==0?"dash-nav-active":""}><h5 id="reservations-icon"></h5><h4>Reservations</h4></li>
                    <li onClick={()=>{localStorage.setItem('dashNavCount',1);setDashNavState((prev)=>!prev);}} className={dashnavCount==1?"dash-nav-active":""}><h5 id="hotels-icon"></h5><h4>{!isAdmin?"Browse Hotels":"Add Hotels"}</h4></li>
                   {isAdmin? <li onClick={()=>{localStorage.setItem('dashNavCount',2);setDashNavState((prev)=>!prev);}} className={dashnavCount==2?"dash-nav-active":""}><h5 id="hotels-icon"></h5><h4>Added Hotels</h4></li>:<div></div>}
                    </>}
                </ul>
                {isAdmin&&<Revenue />}
                <div id='dashboard-profile'>

                <span  id="language">
                <img  src={ppic}/></span>
                <span id='dashboard-name'>
                <h3>Welcome</h3>
                <h4>{user.firstName} ({isAdmin?"Admin":"Client"})</h4>
                </span>
                </div>

            </div>
            <div id='dashboard-main' ref={dashMain}>
            
                <div ref={contentContainer}>
                {dashMainRender()}    
                </div>

            </div>
        </section>

    )
}
