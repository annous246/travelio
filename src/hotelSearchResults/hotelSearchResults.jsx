import { useContext,useLayoutEffect, useState,useEffect,useRef } from "react"
import HotelInSearch from "../hotelInSearch/hotelInSearch"
import FilterItem from "./filterItem"
import axios from "axios"
import "./hotelSearchResults.css"
import { generalSearchContext, notificationContext } from "../App"
import ReactiveSearch from '../reactiveSearch/reactiveSearch'
import Rating from '../rating/rating'
import str from '../assets/star.png'
import estr from '../assets/estar.png'
import RatingPanel from '../ratingPanel/ratingPanel'
import LoadingPanel from "../LoadingPanel/loadingpanel"
export default function HotelSearchResults({priceStatus}){
    if(priceStatus==null)priceStatus=true
    const [hotels,setHotels]=useState([])
    const [filteredHotels,setFilteredHotels]=useState([])
    const [stars,setStars]=useState(1)
    const [parkingState,setParkingState]=useState(false)
    const [rating,setRating]=useState(false)
    const [minPrice,setMinPrice]=useState("")
    const [maxPrice,setMaxPrice]=useState("")
    const [wifiState,setWifiState]=useState(false)
    const [accomodationSearch,setAccomodationSearch]=useState('')
    const setMessage=useContext(notificationContext)
    const filterStar1=useRef(null)
    const filterStar2=useRef(null)
    const filterStar3=useRef(null)
    const filterStar4=useRef(null)
    const filterStar5=useRef(null)
    const [filterRating,setFilterRating]=useState("6")
    const [starsState,setStarsState]=useState([false,false,false,false,false])
    const {generalSearch,preferredRooms,totalNights}=useContext(generalSearchContext)
    const [regionSearch,setRegionSearch]=useState(generalSearch)
    const [tn,settn]=useState(totalNights)
    const [hotelNameSearch,setHotelNameSearch]=useState("")
    const [hotelNames,setHotelNames]=useState([])
    const [loading,setLoading]=useState(true)
    const [ratingState,setRatingState]=useState(false)
    const [ratingId,setRatingId]=useState("")
    const [ratingHotelName,setRatingHotelName]=useState("")
    const [price,setPrice]=useState(0)
    const [mappingState,setMappingState]=useState(false)
    const [mappedRooms,setMappedRooms]=useState({
        singleRoom:0,
        doubleRoom:0,
        tripleRoom:0,
        quadrupleRoom:0,
        familyRoom:0,
    })
    console.log("totalNightszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    console.log(tn)
 useEffect(()=>console.log("MAPPPPPPPPPPPPPPPED"+mappingState),[mappingState])
    function handleStarIn(curr){
        for(let i=1;i<=curr;i++){
            const element=document.getElementById('filterStar'+i)
            element.style.backgroundImage=`url(${str})`
        }
       
    }
    
    function handleStarOut(curr){
        for(let i=1;i<=curr;i++){
            if(!starsState[i-1]){

                const element=document.getElementById('filterStar'+i)
                element.style.backgroundImage=`url(${estr})`
            }
        }
       
        
    }
    function  changeStarState(curr){
        let last=-1;
        for(let i =1;i<=5;i++){
        if(starsState[i-1])last=i;
        }
        if(curr==last&&starsState[curr-1]){
            setStarsState([false,false,false,false,false])
        }
        else{
            
        setStarsState((prev)=>{
                //turning off
            for(let i =1;i<=curr;i++){

            prev[i-1]=true
            }
            for(let i =1+curr;i<=5;i++){

            prev[i-1]=false
            }
            return [...prev]
            
        })
    }
    }
    function handleRating(e){
        if(e.target.value>5){
            setFilterRating('6')
        }
        else
        setFilterRating(e.target.value)
        
    }

    function handleMaxPrice(e){
        if(e.target.value){
            if(!isNaN(parseInt(e.target.value))){
                if(parseInt(e.target.value)>=0)
     setMaxPrice(e.target.value)
                else
                setMessage('Price Needs To Be A Positive Value')

            }
            else setMaxPrice("")
        }
        else setMaxPrice("")
    }
    function handleMinPrice(e){
        console.log('MIIIIIIIIN')
        if(e.target.value){
            if(!isNaN(parseInt(e.target.value))){
                if(parseInt(e.target.value)>=0)
     setMinPrice(e.target.value)
                else
                setMessage('Price Needs To Be A Positive Value')

            }
            else setMinPrice("")
        }
        else setMinPrice("")
        
    }


function getPrice(hotel){

    let price=0;
    console.log(hotel.rooms)
    for(let room in mappedRooms){
        console.log("room")
        console.log(mappedRooms[room])
        console.log(room)
        if(!mappedRooms[room])continue
        console.log("singler")
        console.log(hotel.rooms[room])
        if(!hotel.rooms[room]){console.log("re");return 0}
        if(!hotel.rooms[room].status){console.log("re");return 0}
        price+=hotel.rooms[room].price*mappedRooms[room]*tn 
    }
        console.log("price")
        console.log(price)
        return price
}










   useEffect(()=>{

   },[mappedRooms])


    
    useEffect(()=>{
        //getting specified rooms
        let roomKeys=["singleRoom",
            "doubleRoom",
            "tripleRoom",
            "quadrupleRoom",
            "familyRoom"]
            console.log("preferredRooms")
            console.log(preferredRooms)
            let ind=0;
        let tempMap={
            singleRoom:0,
            doubleRoom:0,
            tripleRoom:0,
            quadrupleRoom:0,
            familyRoom:0,
        }
        for(let room of preferredRooms){
            console.log("mapping")
            console.log(mappedRooms)
            console.log(ind++)
            if(room.status==true){
                let count=room.children+room.babies+room.adults
                console.log("count")
                console.log(count)
                tempMap[roomKeys[count-1]]++;
            }
            console.log(mappingState)
            if(!mappingState){
              console.log("mappping")
                setMappingState(true)
            }
            setMappedRooms((prev)=>{return tempMap
            })

        }

        
    

    

        axios.post('https://api-travelio.onrender.com/getHotelsNow')
        .then((res)=>{
            if(res.data.status){
                setTimeout(()=> setHotelNames((prev)=>
                   res.data.hotels.map((hotel)=>{
                   
                       return hotel.hotelName
                  })
                ),2000)
               
                setHotels(res.data.hotels)
                setFilteredHotels(res.data.hotels)
        if(regionSearch.length){
            setFilteredHotels((prev)=>res.data.hotels.filter((hotel)=>{
             return hotel.region.toLowerCase()==regionSearch.toLowerCase()
            }))
     
             }
             else setFilteredHotels(res.data.hotels)
            }
            setMessage(res.data.message)
             setLoading(false)
           
            
        })
        .catch((e)=>{
            setMessage(e.message)

        })


        
    },[])

function resetFilter(){
    setMaxPrice("")
    setMinPrice("")
    setParkingState(false)
    setWifiState(false)
    setAccomodationSearch('')
    setStarsState([false,false,false,false,false])
    setFilterRating("6")
    setHotelNameSearch("")
    setRegionSearch("")
}




function filter(){
        //check maxprice
        setFilteredHotels((prev)=>{
            let filtered=hotels
            
    
            //check rating
            
            if(filterRating!="6"){
                   filtered=  filtered.filter((hotel)=>parseInt(hotel.rating)==filterRating)
            }
    
            //check stars
            
            let stars=0;
            for(let i=1;i<6;i++){
                if(starsState[i-1]){stars++;
               const element=document.getElementById('filterStar'+i)
               element.style.backgroundImage=`url(${str})`
                }
                else{
                    const element=document.getElementById('filterStar'+i)
                    element.style.backgroundImage=`url(${estr})`
    
                }
    
            }
            if(stars)
            filtered=filtered.filter((hotel)=>hotel.stars==stars)
    
           //check regional
           
           if(regionSearch.length){
            filtered=filtered.filter((hotel)=>{
             return hotel.region.toLowerCase()==regionSearch.toLowerCase()
            })
     
             }
    
        // check wifi and parking
    
        
        filtered= filtered.filter((hotel)=>{
                if(parkingState&&parkingState^hotel.parking)
                return false;
            return true;
            
            })
    
    
        filtered= filtered.filter((hotel)=>{
                if(wifiState&&wifiState^hotel.wifi)
                return false;
                return true;
            
            })
        
    
        //check hotel name
        
        if(hotelNameSearch.length)
            filtered= filtered.filter((hotel)=>hotel.hotelName.toLocaleLowerCase()==hotelNameSearch.toLocaleLowerCase())
        //accomodation filter
        if(accomodationSearch.length)
            filtered= filtered.filter((hotel)=>{

        return hotel[accomodationSearch.toUpperCase()+"Status"]
            })
        //price
        
    console.log("currentPricesssssssssssssssssssssssssssssssssss")
    if(minPrice.length){
        let minim=parseInt(minPrice)
        filtered=filtered.filter((hotel)=>{
        let currentPrice=getPrice(hotel)
        console.log("currentPricesssssssssssssssssssssssssssssssssss")
        console.log(currentPrice)
        console.log(minim)
        console.log(hotel)
        return currentPrice>=minim
  
})
}

if(maxPrice.length){
    let maxim=parseInt(maxPrice)
    filtered=filtered.filter((hotel)=>{
            let currentPrice=getPrice(hotel)
            return currentPrice<=maxim
      
})
    
}

         console.log("filtered..................")
         console.log(filtered)
    
        return filtered
    

        })
        

}



function generateHotels(){

    
    if(filteredHotels.length)
return filteredHotels.map((hotel)=>{
       
  return  <HotelInSearch priceStatus={priceStatus} price={getPrice(hotel)} mappedRooms={mappedRooms}  setRatingState={setRatingState} setRatingHotelName={setRatingHotelName} setRatingId={setRatingId} hotel={hotel}/>
  
})
else
 return <h4>No Hotels Exist</h4>
    }


        
    useEffect(()=>{
        filter()
    },[filterRating,starsState,regionSearch,hotelNameSearch,parkingState,wifiState,accomodationSearch,minPrice,maxPrice])
   
    return(
        
        <div id="result-container">
            <div id="result-filter">
                
            <h2 id="filter-title">Narrow Your Search</h2>
            <h4 id="filter-split">Hotel amenities</h4>
            <FilterItem setState={setParkingState} state={parkingState} title="Parking"/>
            <FilterItem setState={setWifiState} state={wifiState} title="Wifi"/>
            <h4 id="filter-split">Hotel Accomodation</h4> 
            <ReactiveSearch placeHolder="LPD" search={accomodationSearch} setSearch={setAccomodationSearch} items={['LPD','DP','PC','ALLIN','ALLINSOFT','DPP','PCP']}/>
            
            <h4 id="filter-split">Hotel  Luxury Rate</h4> 
            <div id="filter-stars">
            <h6 >Stars</h6> 

                <span onClick={()=>changeStarState(1)} onMouseEnter={()=>handleStarIn(1)} onMouseLeave={()=>handleStarOut(1)} ref={filterStar1} id="filterStar1" className="filter-elemental-star"></span>
                <span onClick={()=>changeStarState(2)} onMouseEnter={()=>handleStarIn(2)} onMouseLeave={()=>handleStarOut(2)} ref={filterStar2} id="filterStar2" className="filter-elemental-star"></span>
                <span onClick={()=>changeStarState(3)} onMouseEnter={()=>handleStarIn(3)} onMouseLeave={()=>handleStarOut(3)} ref={filterStar3} id="filterStar3" className="filter-elemental-star"></span>
                <span onClick={()=>changeStarState(4)} onMouseEnter={()=>handleStarIn(4)} onMouseLeave={()=>handleStarOut(4)} ref={filterStar4} id="filterStar4" className="filter-elemental-star"></span>
                <span onClick={()=>changeStarState(5)} onMouseEnter={()=>handleStarIn(5)} onMouseLeave={()=>handleStarOut(5)} ref={filterStar5} id="filterStar5" className="filter-elemental-star"></span>
            </div>

            <h4 id="filter-split">Hotel  Rating</h4> 
            <input value={filterRating} onChange={handleRating} type="range" min="0" max="6"/>
            <Rating rating={filterRating!='6'?filterRating+".X":"Any"}/>
            {priceStatus&&
            <>            
            <h4 id="filter-split">Hotel  Pricing</h4> 
            <span>
                <span className="col-display">
                <p>Min Price</p>
                <input value={minPrice} onChange={handleMinPrice} type="number"/>
                </span>
                <span className="col-display">
                <p>Max Price</p>
                <input value={maxPrice} onChange={handleMaxPrice} type="number"/>
                
                </span>

            </span>
            </>

            }
            
            <h4 id="filter-split">Hotel  Region</h4>
            <ReactiveSearch placeHolder="Region" search={regionSearch} setSearch={setRegionSearch}  items={['Tunis','Djerba','Hammamet','ElHamma','Tataouin']}/> 

            <h4 id="filter-split">Hotel  Name</h4>
            <ReactiveSearch key={hotelNames} placeHolder="Name" search={hotelNameSearch} setSearch={setHotelNameSearch}  items={hotelNames}/> 
            <button className="blue-btn" style={{marginBottom:"1em"}} onClick={resetFilter}>Reset</button>


            </div>
            <div id="result-main">
            <h2 id="search-title">Search Results</h2>
                {loading||!mappingState?<LoadingPanel loading={loading}/>:<>
            {
                generateHotels()
}<RatingPanel setStatus={setRatingState} key={ratingState} id={ratingId} hotelName={ratingHotelName} status={ratingState}/>
</>}
            </div>
        </div>
    )
}