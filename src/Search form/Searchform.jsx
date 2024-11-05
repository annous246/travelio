import Searcher from "./Searcher"
import "./searchform.css"
import {useRef ,useEffect,useState,useContext} from 'react'
import {authenticationContext,generalSearchContext, notificationContext, roomCountContext} from '../App'
import CheckInOut from "./checkinout"

export default function Searchform({setRoomAdderState}){ 
    const [regions,setRegions]=useState(['Tunis','Djerba','Hammamet','ElHamma','Tataouin'])
    const [filteredRegions,setFilteredRegions]=useState(regions)
    const [search,setSearch]=useState('')
    const [nights,setNights]=useState('')
    const [checkIn,setCheckIn]=useState(null)
    const [checkInDate,setCheckInDate]=useState(null)
    const [checkOut,setCheckOut]=useState(null)
    const [checkOutDate,setCheckOutDate]=useState(null)
    const searchInput=useRef(null)
    const region=useRef(null)
    const {roomsCount}=useContext(roomCountContext)
    const {setGeneralSearch,setTotalNights}=useContext(generalSearchContext)

   const setMessage=useContext(notificationContext)
   const {setPageState,setPageCount,auth,loginOpen,setLoginOpen}=useContext(authenticationContext)

   useEffect(()=>{setGeneralSearch(search)},[search])
   useEffect(()=>{setTotalNights(nights);console.log(nights.length)
    console.log(nights)
    console.log(typeof nights)
   },[nights])

   console.log("not")
function handleCheckIn(e){
  setNights('')
  if(e.target.value.length){
  const seconds=parseInt(new Date(e.target.value).getTime()/1000);
  const nowInHours=parseInt(parseInt(new Date().getTime()/1000)/(60*60*24))
  const hours=parseInt(parseInt(new Date(e.target.value).getTime()/1000)/(60*60*24))
  
   if(nowInHours>hours){
    setCheckInDate("")
    setMessage("CheckIn should be from today")}
    else{
     
 if(checkOut){
  if(checkOut<=seconds){
    //error
    console.log("error")
    setCheckInDate("")
    setMessage("CheckIn Cant Be With Or After ChekOut")
    return 
  }
  else {setCheckIn(seconds);
        setNights(parseInt((checkOut-seconds)/(3600*24)))
        setCheckInDate(e.target.value)
  }
 }
 else{setCheckIn(seconds)
  setCheckInDate(e.target.value)

 }
  
    }
  }
else{ setCheckIn(null)
setCheckInDate(e.target.value)}
}


function handleCheckOut(e){
  setNights('')
  if(e.target.value.length){
    const seconds=parseInt(new Date(e.target.value).getTime()/1000);
    const nowInHours=parseInt(parseInt(new Date().getTime()/1000)/(60*60*24))
    const hours=parseInt(parseInt(new Date(e.target.value).getTime()/1000)/(60*60*24))
 if(checkIn){
  if(checkIn>=seconds){
    //error
    console.log("error")
    setCheckOutDate("")
    setMessage("CheckOut Cant Be With Or Before CheckIn")
    return 
  }
  else {setCheckOut(seconds)
    setCheckOutDate(e.target.value)

    setNights(parseInt((seconds-checkIn)/(3600*24)))
  }
 }
 else{
  if(nowInHours>hours-1){
    console.log("error")
    console.log(hours)
    console.log(nowInHours)
    setMessage("CheckOut should be from tomorrow")
    setCheckOutDate("")
    return 
   
  }
  else{
  setCheckOut(seconds);
  setCheckOutDate(e.target.value)}

 }
 
  }
else {setCheckOut(null)

setCheckOutDate(e.target.value)}
}


    
    function searcher(e){
        const currentSearch=e.target.value;
        setSearch(currentSearch)
        if(currentSearch.length){
          //open popup
          setFilteredRegions((prev)=>{
            let fr= regions.filter((r)=>{
              if(r.length>=currentSearch.length){
                
                return (r.toLowerCase().indexOf(currentSearch.toLowerCase())!=-1)
              }
            })
            return fr
          })
    
    
        }
        else {setFilteredRegions(regions)}
      }



    function popSearch(){
      region.current.style.opacity="1"
      
    }
    function cleanSearch(){
      region.current.style.opacity="0"
      
    }
    function openRoomAdder(){
      setRoomAdderState(true);
    }
function look(){
  if(checkInDate&&checkInDate.length&&checkOutDate&&checkOutDate.length){
    //good to go
  localStorage.setItem('pageCount',2)
  setPageState((prev)=>!prev)
  //makes page count temporary
  setTimeout(()=>localStorage.setItem('pageCount',0),100)
  }
  else{
    setMessage("You Need To Set CheckIn And Checkout Dates")

  }
}





    return (
        <form id="search-form">
        <Searcher searcher={searcher}  filteredRegions={filteredRegions} reference={region}/>

        <span className="home-input" id='region-span'>
        <label htmlFor='region'>Region</label>
        <input onFocus={popSearch}  onBlur={cleanSearch}  required={true} id='region' placeholder="Region" type="text" ref={searchInput} value={search} onChange={(e)=>searcher(e)}/>
        </span>
        <CheckInOut nights={nights} setNights={setNights} checkInDate={checkInDate} checkOutDate={checkOutDate} handleCheckIn={handleCheckIn} handleCheckOut={handleCheckOut} />

        
        <span className="home-input" id='a-span'>
        <label>Rooms</label>
        <button onClick={openRoomAdder} id="room-display" type="button">{(roomsCount>1)?`${roomsCount} Hotel Rooms`:`${roomsCount} Hotel Room`} </button>
        

        </span>
{auth?

<button id="search-btn" type="button" onClick={look}><h4>Search</h4></button>
:

<button id="search-btn" type="button" onClick={()=>{if(!loginOpen)setLoginOpen(true);console.log("here")}}><h4>Search</h4></button>
}
        </form>
    )
}