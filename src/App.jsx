
import './styles.css'
import  Navbar from './navbar/navbar'
import {useRef ,useEffect,useState, useContext, createContext} from 'react'
import Section1 from './section1/section1'
import Section2 from './section2/section2'
import Section3 from './section3/section3'
import Section4 from './section4/section4'
import Notification from './notification/notification'
import Login from './login/login'
import Register from './register/register'
import RoomAdder from './roomAdder/roomAdder'
import Dashboard from './dashboard/dashboard'
import BookingSection from './bookingSection/bookingSection'
import axios from "axios"
import ConfirmationPanel from './confirmationPanel/confirmationPanel'
import HotelSearchResults from './hotelSearchResults/hotelSearchResults'
import Facture from './dashboard/facture'
import LoadingPanel from './LoadingPanel/loadingpanel'
import Footer from './footer/footer'
import Room from './roomAdder/room'


axios.defaults.headers.common['auth']=localStorage.getItem('token')
axios.defaults.withCredentials=true
export const notificationContext=createContext()
export const panelContext=createContext()
export const roomCountContext=createContext()
export const authenticationContext=createContext()
export const generalSearchContext=createContext()
export default function App() {
  const checkin=useRef(null)
  const checkout=useRef(null)
  const main=useRef(null)
  const [paneParams,setPaneParams]=useState([])
  const [reservation,setReservation]=useState(null)
  const [loginOpen,setLoginOpen]=useState(false)
  const [preferredRooms,setPreferredRooms]=useState([])
  const [roomAdderState,setRoomAdderState]=useState(false)
  const [message,setMessage]=useState("")
  const [panelMessage,setPanelMessage]=useState("")
  const [acceptAction,setAcceptAction]=useState(()=>{console.log("hi")})
  const [registerOpen,setRegisterOpen]=useState(false)
  const [notify,setNotify]=useState(false)
  const [roomsCount,setRoomsCount]=useState(1)
  const [auth,setAuth]=useState(false)
  const [pageCount,setPageCount]=useState(0)
  const [pageState,setPageState]=useState(false)
  const [loadingAuth,setLoadingAuth]=useState(false)
  const [generalSearch,setGeneralSearch]=useState("")
  const [totalNights,setTotalNights]=useState(0)
  const [user,setUser]=useState({firstName:"",lastName:"",age:"",nationality:""})
  const [updateHeaders,setUpdateHeaders]=useState(false)
  const [language,setLanguage]=useState('eng')
  const [loadingLang,setLoadingLang]=useState(false)



  useEffect(()=>{console.log('az');console.log(acceptAction)},[acceptAction])
  useEffect(()=>{
    
if(!isNaN(parseInt(localStorage.getItem('pageCount'))))setPageCount((prev)=>localStorage.getItem('pageCount'))

  },[])
  useEffect(()=>{
    console.log("headers")
    console.log(localStorage.getItem('token'))
    axios.defaults.headers.common['auth']=localStorage.getItem('token')
        axios.get('https://api-travelio.onrender.com/getAuth')
        .then((res)=>{
          console.log(res.data.user)
          if(res.data.auth){setAuth(true);
            
            setUser(res.data.user)}
          setLoadingAuth(false)
        })
        .catch((e)=>setMessage(e.message))
    
      },[updateHeaders]) 
  useEffect(()=>{
    if(loginOpen){document.body.style.overflow='auto';}
    else document.body.style.overflow='auto';
  },[loginOpen])
  useEffect(()=>{
    if(registerOpen){document.body.style.overflow='auto';}
    else document.body.style.overflow='auto';
  },[registerOpen])

useEffect(()=>{
  if(localStorage.getItem('pageCount'))
  setPageCount((prev)=>localStorage.getItem('pageCount'))
  

},[pageState])
  return (
  loadingAuth?
  <LoadingPanel loading={loadingAuth}/>
  :
  (pageCount==0||!auth)?
  <div id="main" ref={main}>
  <generalSearchContext.Provider value={{reservation,setReservation,setTotalNights,totalNights,setPreferredRooms,preferredRooms,generalSearch,setGeneralSearch}}>
  <authenticationContext.Provider value={{loginOpen,setLoginOpen,setLanguage,language,auth,setAuth,user,setUpdateHeaders,setPageCount,updateHeaders,setPageState}}>
  <roomCountContext.Provider value={{roomsCount,setRoomsCount}}>
  <notificationContext.Provider value={setMessage}>
  <panelContext.Provider value={{setPanelMessage,setAcceptAction,setPaneParams}}>
  <Notification setMessageExternal={setMessage}  notif={message}/>
  <ConfirmationPanel params={paneParams} givenMessage={panelMessage} acceptAction={acceptAction}/>
  <Login loginState={loginOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <Register registerState={registerOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <RoomAdder roomAdderState={roomAdderState} setRoomAdderState={setRoomAdderState} />
  <Navbar setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} notify={setMessage}/>
  
  <Section1 notify={setMessage} setRoomAdderState={setRoomAdderState} />
  <Section2 notify={setMessage}/>
  <Section3 notify={setMessage}/>
  <Section4 notify={setMessage}/>
  <Footer/>
  </panelContext.Provider>
  </notificationContext.Provider>
  </roomCountContext.Provider>
  </authenticationContext.Provider>
  </generalSearchContext.Provider>
  </div>
  :pageCount==2?
  
  <generalSearchContext.Provider value={{reservation,setReservation,setTotalNights,totalNights,setPreferredRooms,preferredRooms,generalSearch,setGeneralSearch}}>
  <authenticationContext.Provider value={{loginOpen,setLoginOpen,setLanguage,language,auth,setAuth,user,setUpdateHeaders,setPageCount,updateHeaders,setPageState}}>
  <roomCountContext.Provider value={{roomsCount,setRoomsCount}}>
  <notificationContext.Provider value={setMessage}>
  <Notification setMessageExternal={setMessage}  notif={message}/>
  <panelContext.Provider value={{setPanelMessage,setAcceptAction,setPaneParams}}>
  <ConfirmationPanel params={paneParams} givenMessage={panelMessage} acceptAction={acceptAction}/>
  <Login loginState={loginOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <Register registerState={registerOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <RoomAdder roomAdderState={roomAdderState} setRoomAdderState={setRoomAdderState} />
  <Navbar setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} notify={setMessage}/>
  <HotelSearchResults />
  <Footer/>
  </panelContext.Provider>
  </notificationContext.Provider>
  </roomCountContext.Provider>
  </authenticationContext.Provider>
  </generalSearchContext.Provider>
  :pageCount==1?
  <div id="main" ref={main}>
  <generalSearchContext.Provider value={{reservation,setReservation,setTotalNights,totalNights,setPreferredRooms,preferredRooms,generalSearch,setGeneralSearch}}>
  <authenticationContext.Provider value={{loginOpen,setLoginOpen,setLanguage,language,auth,setAuth,user,setUpdateHeaders,setPageCount,updateHeaders,setPageState}}>
  <roomCountContext.Provider value={{roomsCount,setRoomsCount}}>
  <notificationContext.Provider value={setMessage}>
  <Notification setMessageExternal={setMessage}  notif={message}/>
  <panelContext.Provider value={{setPanelMessage,setAcceptAction,setPaneParams}}>
  <ConfirmationPanel params={paneParams} givenMessage={panelMessage} acceptAction={acceptAction}/>
  <Login loginState={loginOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <Register registerState={registerOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <RoomAdder roomAdderState={roomAdderState} setRoomAdderState={setRoomAdderState} />
  <Navbar setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} notify={setMessage}/>
  <Dashboard />
  <Footer/>
  </panelContext.Provider>
  </notificationContext.Provider>
  </roomCountContext.Provider>
  </authenticationContext.Provider>
  </generalSearchContext.Provider>
  </div>
  :
  <div id="main" ref={main}>
  <generalSearchContext.Provider value={{reservation,setReservation,setTotalNights,totalNights,setPreferredRooms,preferredRooms,generalSearch,setGeneralSearch}}>
  <authenticationContext.Provider value={{loginOpen,setLoginOpen,setLanguage,language,auth,setAuth,user,setUpdateHeaders,setPageCount,updateHeaders,setPageState}}>
  <roomCountContext.Provider value={{roomsCount,setRoomsCount}}>
  <notificationContext.Provider value={setMessage}>
  <Notification setMessageExternal={setMessage}  notif={message}/>
  <panelContext.Provider value={{setPanelMessage,setAcceptAction,setPaneParams}}>
  <ConfirmationPanel params={paneParams} givenMessage={panelMessage} acceptAction={acceptAction}/>
  <Login loginState={loginOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <Register registerState={registerOpen} setLoginState={setLoginOpen} setRegisterState={setRegisterOpen} notify={setMessage}/>
  <RoomAdder roomAdderState={roomAdderState} setRoomAdderState={setRoomAdderState} />
  <Navbar setLoginOpen={setLoginOpen} setRegisterOpen={setRegisterOpen} notify={setMessage}/>
  <Facture reservation={reservation} />
  <Footer/>
  </panelContext.Provider>
  </notificationContext.Provider>
  </roomCountContext.Provider>
  </authenticationContext.Provider>
  </generalSearchContext.Provider>
  </div>

)
}

