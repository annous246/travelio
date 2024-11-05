
import { useEffect, useRef, useState,useContext } from "react"
import "./roomAdderBooking.css"
import { roomsContext } from "./roomAdderBooking";
import { notificationContext } from "../App";
export default function StaticRoom({ setMembers,setAvailableRooms, availableRooms,index,currentRoom,roomAdderState,setRoomAdderState,container}){


    const id=currentRoom.id
    const [allRooms,setAllRooms]=useContext(roomsContext)
    const form=useRef(null);
    const [adults,setAdults]=useState(1);
    const [babies,setBabies]=useState(0);
    const [children,setChildren]=useState(0);
    const [totalMembers,setTotalMembers]=useState(1)
    const [roomState,setRoomState]=useState(currentRoom.status)
    const setMessage=useContext(notificationContext)
    const rooms=["Single Room","Double Room","Triple Room","Quad Room","Family Room"]
    const [currentRoomType,setCurrentRoomType]=useState("")
    function checkAvalability(){
        let rt=['singleRooms','doubleRoom','tripleRoom','quadrupleRoom','familyRoom']
        let ok=false
        console.log("availablity totalMembers")
        console.log(totalMembers)
        for(let ind=totalMembers;ind<rt.length;ind++){
            if((availableRooms[rt[ind]].status&&availableRooms[rt[ind]].units>0)||currentRoomType==rt[ind]){
                ok=true;
                break;
            }
        }
        if(!ok){
            setMessage('Sorry No More Rooms With More Capacity Are Available At This Moment')
        }
        return ok;

    }
    useEffect(()=>{ 
        let rt=['singleRoom','doubleRoom','tripleRoom','quadrupleRoom','familyRoom']

              console.log("totalMembers")
              console.log(totalMembers)
              let curretav=JSON.parse(JSON.stringify((availableRooms)))
        for(let ind=totalMembers-1;ind<rt.length;ind++){
            
            if(availableRooms[rt[ind]].status){
                if(currentRoomType.length){
                 curretav[currentRoomType].units++
                 if(curretav[currentRoomType].units==1)
                    curretav[currentRoomType].status=true
                }
                setCurrentRoomType(rt[ind]);
                
                curretav[rt[ind]].units--
                if(curretav[rt[ind]].units==0)
                   curretav[rt[ind]].status=false
                console.log(curretav)
                setAvailableRooms(curretav)
                break;
            }
        }
    },[totalMembers])
    useEffect(()=>{
        console.log(availableRooms["singleRoom"].units)
        console.log(availableRooms)
    },[availableRooms])
    useEffect(()=>{
        /*
        //first render
        let rt=['singleRoom','doubleRoom','tripleRoom','quadrupleRoom','familyRoom']

 
        for(let ind=totalMembers-1;ind<rt.length;ind++){
            console.log(rt[ind])
            console.log(availableRooms)
            if(availableRooms[rt[ind]].status){
                setCurrentRoomType(rt[ind]);
                setAvailableRooms((prev)=>{
                    prev[rt[ind]].units--;
                    if(prev[rt[ind]].units<1)
                        prev[rt[ind]].status=false
                    return {...prev}
                })
              
                break;
            }
        }*/
    },[])
    useEffect(()=>{
            setTimeout(()=>{
                form.current.className=" slider"}
                ,10)
                setTimeout(()=>{
                    form.current.className+=" opaque"
                    form.current.className+=" confirmed-room"}
                    ,300)
       
    },[roomAdderState])
    function adda(){
        if(roomState&&index)return 
        if(totalMembers<5){
        if(checkAvalability()){
            setAllRooms((prev)=>{
                return prev.map((room)=>{
                    if(room.id==id){
                    return {...room,adults:adults+1}
                    }
                    else return room
                })
            })
           
            setAdults(adults+1)  
            setTotalMembers(totalMembers+1)   

        }
        }
    }
    function removea(){
        if(roomState&&index)return 
        if(adults>1){
            setAllRooms((prev)=>{
                return prev.map((room)=>{
                    if(room.id==id){
                    return {...room,adults:adults-1}
                    }
                    else return room
                })
            })
            
        setAdults(adults-1)
        setTotalMembers(totalMembers-1)
        }
    }
    
    function addc(){
        if(roomState&&index)return 
        if(totalMembers<5){
        if(checkAvalability()){
            
            setAllRooms((prev)=>{
                return prev.map((room)=>{
                    if(room.id==id){
                    return {...room,children:children+1}
                    }
                    else return room
                })
            })
            setTotalMembers(totalMembers+1)  
        setChildren(children+1) 
        }

        }
    }
    function removec(){
        if(roomState&&index)return 
        if(children){
            
        setAllRooms((prev)=>{
            return prev.map((room)=>{
                if(room.id==id){
                return {...room,children:children-1}
                }
                else return room
            })
        })
        setChildren(children-1)
        setTotalMembers(totalMembers-1)
        }
    }
    
    function addb(){
        if(roomState&&index)return 
        if(totalMembers<5){
       if(checkAvalability()){
         setAllRooms((prev)=>{
            return prev.map((room)=>{
                if(room.id==id){
                return {...room,babies:babies+1}
                }
                else return room
            })
        })
            setTotalMembers(totalMembers+1)  
        setBabies(babies+1)
       }
       }
    }
    function removeb(){
        if(roomState&&index)return 
        if(babies){
            
        setAllRooms((prev)=>{
            return prev.map((room)=>{
                if(room.id==id){
                return {...room,babies:babies-1}
                }
                else return room
            })
        })
            
        setBabies(babies-1)
        setTotalMembers(totalMembers-1)
        }
    }
    function removeRoom(){
        if(allRooms.length>1){
        let curretav=JSON.parse(JSON.stringify(availableRooms))
        curretav[currentRoomType].status=true
        curretav[currentRoomType].units++
        setAvailableRooms(curretav)
       
        setMembers((prev)=>{
           return  {
                babies:prev.babies-babies,
                adults:prev.adults-adults,
                children:prev.children-children,
            }
        })

       /*
        setBabies(0)
        setAdults(0)
        setChildren(0)
        //update members
*/

          
        form.current.className="slider";
        form.current.style.opacity="0";
        setTimeout(()=>{
            form.current.className="";
            form.current.style.maxWidth='0';
            form.current.style.minWidth='0';
            form.current.style.maxHeight='0';
            form.current.style.minHeight='0';
            form.current.style.margin='0';
            form.current.style.padding='0';
            setTimeout(()=>{
                form.current.style.display='none';
                setAllRooms((prev)=>{
                    return prev.filter((room)=>{
                        return (room.id!=id)
                    })
                })


            },200)

        },200)  
        }
        else{
            setMessage('At Least One Room Should Be Reserved')
        }
    }

    useEffect(()=>{

        let current={
            babies:0,
            adults:0,
            children:0,
        }
        allRooms.map((room)=>{
            current.babies+=room.babies
            current.adults+=room.adults
            current.children+=room.children
        })
        setMembers(current)
    },[babies,adults,children])

    return (
        <form id="roomAdder-form" ref={form} className={"confirmed-room opaque slider"}>
        <button type="button"  id="room-close">X</button><h1 style={{color:"white",borderBottom:"0.08em solid rgb(97, 174, 247)",width:"100%"}}>Room{index+1}</h1>
        
        <h2>{currentRoomType}</h2>
        <label id="adults-title">Adults</label>
        <span id="adults-container" className={roomState&&index?"semi-opaque":""}>
            <button type="button"  className="left-button">-</button>
            <label id="adults-display">{adults}</label>
            <button type="button"  className="right-button">+</button>
        </span>

        <label id="adults-title">Children</label>
        <span id="children-container" className={roomState&&index?"semi-opaque":""}>
            <button type="button" className="left-button">-</button>
            <label id="children-display">{children}</label>
            <button type="button" className="right-button">+</button>
        </span>

        <label id="adults-title">Babies</label>

        <span id="babies-container" className={roomState&&index?"semi-opaque":""}>
            <button type="button"  className="left-button">-</button>
            <label id="babies-display">{babies}</label>
            <button type="button"  className="right-button">+</button>
        </span>
    </form>
    )
}