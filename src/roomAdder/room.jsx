
import { useEffect, useRef, useState,useContext } from "react"
import "./roomAdder.css"
import { roomsContext } from "./roomAdder";
import { notificationContext } from "../App";
export default function Room({index,currentRoom,roomAdderState,setRoomAdderState,container}){


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
    useEffect(()=>{
        if(roomAdderState){
            setTimeout(()=>{
                form.current.className=" slider"}
                ,10)
                setTimeout(()=>{
                    form.current.className+=" opaque"
                    if(roomState)
                    form.current.className+=" confirmed-room"}
                    ,300)
        }
        else{
            form.current.className=""
            
        }
    },[roomAdderState])
    function adda(){
        if(roomState&&index)return 
        if(totalMembers<5){
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
    function removea(){
        if(roomState&&index)return 
        if(!index){
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
        else{
            //other rooms allow at least 2 children
            if(adults==1&&children<2){
                setMessage("2 Children At Least per Room")
            }
            else{
                if(adults){
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
        }
    }
    
    function addc(){
        if(roomState&&index)return 
        if(totalMembers<5){
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
    function removec(){
        if(roomState&&index)return 
        if(!index||adults){
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

        else{
            if(children>2){
                
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
            else setMessage('2 Children At Least per Room')

            
        }
    }
    
    function addb(){
        if(roomState&&index)return 
        if(totalMembers<5){
            
        setAllRooms((prev)=>{
            return prev.map((room)=>{
                if(room.id==id){
                return {...room,babies:babies+1}
                }
                else return room
            })
        })
            setTotalMembers(totalMembers+1)  
        setBabies(babies+1)}
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
    function confirm(){
        console.log(currentRoom.status)
        if(!index)return
        if(roomState){
            setRoomState(false)
            setAllRooms((prev)=>{
                return prev.map((room)=>{
                    if(room.id==id)
                        return {...room,status:false}
                    return room;
                })
            })

        }
        else{
            setRoomState(true)
            setAllRooms((prev)=>{
                return prev.map((room)=>{
                    if(room.id==id)
                        return {...room,status:true}
                    return room;
                })
            })

        }

    }
    function removeRoom(){
        if(allRooms.length>1){
          
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

    return (
        <form id="roomAdder-form" ref={form} className={roomState?"confirmed-room opaque slider":"opaque slider"}>
        <button type="button" onClick={removeRoom} id="room-close">X</button><h1 style={{color:"white",borderBottom:"0.08em solid rgb(97, 174, 247)",width:"100%"}}>Room{index+1}</h1>
        
        <h2>{rooms[totalMembers-1]}</h2>
        <label id="adults-title">Adults</label>
        <span id="adults-container" className={roomState&&index?"semi-opaque":""}>
            <button type="button" onClick={removea} className="left-button">-</button>
            <label id="adults-display">{adults}</label>
            <button type="button" onClick={adda} className="right-button">+</button>
        </span>

        <label id="adults-title">Children</label>
        <span id="children-container" className={roomState&&index?"semi-opaque":""}>
            <button type="button" onClick={removec} className="left-button">-</button>
            <label id="children-display">{children}</label>
            <button type="button" onClick={addc} className="right-button">+</button>
        </span>

        <label id="adults-title">Babies</label>

        <span id="babies-container" className={roomState&&index?"semi-opaque":""}>
            <button type="button" onClick={removeb} className="left-button">-</button>
            <label id="babies-display">{babies}</label>
            <button type="button" onClick={addb} className="right-button">+</button>
        </span>
        {index!=0&&<button type="button" onClick={confirm} className={roomState?"unconfirm":""} id="roomAdder-submit-btn">{roomState?"Edit":"Comfirm"}</button>}
    </form>
    )
}