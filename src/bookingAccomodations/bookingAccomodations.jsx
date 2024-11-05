import "./bookingAccomodations.css"
import { useEffect,useState,useRef } from "react"



export default function BookingAccomodations({supplements, currentAccomodation, members,availableRooms,setCurrentAccomodation,hotel,nights}){
const [buttonStates,setButtonStates]=useState([true,false,false,false,false,false,false,false])
const accomodations=["LS","LPD","DP","PC","DPP","PCP","ALLIN","ALLINSOFT"]
const tva=0.07

function handleClickable(btn){
if(!hotel[accomodations[btn-1]+"Status"]&&btn>1)return
setButtonStates((prev)=>{
    let newState=[false,false,false,false,false,false,false,false]
    newState[btn-1]=true
    return newState
})
let acc={
    LS:false,
    LPD:false,
    PC:false,
    PDP:false,
    DP:false,
    DPP:false,
    ALLIN:false,
    ALLINSOFT:false,
}
acc[accomodations[btn-1]]=true

setCurrentAccomodation(acc)

} 
function getAccState(acc){
    return !hotel[acc+"Status"]
}
function totalPrice(){
    let roomsPrice=0;

    //calculating rooms price without services
    let singleRooms=0
    for(let room in availableRooms){
        if(hotel.rooms[room]){
            if(hotel.rooms[room].status==true){
                const numberOfBooks=hotel.rooms[room].units-availableRooms[room].units
                let totalMembers=1;
                switch(room){
                    case "doubleRoom" : totalMembers=2;break;
                    case "tripleRoom" : totalMembers=3;break;
                    case "quadrupleRoom" : totalMembers=4;break;
                    case "familyRoom" : totalMembers=5;break;
                }
                roomsPrice+=hotel.rooms[room].price*numberOfBooks*totalMembers
                if(room=="singleRoom")
                singleRooms=numberOfBooks
                    
                
            }
            
        }
    }
    //adding services if exists
    let serviceCosts=0
    if(!currentAccomodation["LS"]){
       //added services
       let acc='LS'
       for(let ac in currentAccomodation){
        if(currentAccomodation[ac]){
               acc=ac;break;
        }}
       let servicePerPerson=hotel[acc].price
       serviceCosts=servicePerPerson*members["adults"]+servicePerPerson*members["children"]
     
    }  //adding supplements
    let suppPrice=0
    if(hotel.SVMStatus){
            suppPrice+=supplements.SVM*hotel.SVM
    }
    if(hotel.SVPStatus){
            suppPrice+=supplements.SVP*hotel.SVP
    }
    if(hotel.SSStatus){
            suppPrice+=hotel.SS*singleRooms
    }
    return (serviceCosts+roomsPrice+suppPrice)*nights

}

function getReduction(){
    let parentingReduction=0

    let servicePerPerson=0
    if(!currentAccomodation["LS"]){
        //added services
        let acc='LS'
        for(let ac in currentAccomodation){
         if(currentAccomodation[ac]){
                acc=ac;break;
         }}
         servicePerPerson=hotel[acc].price
      
     }
     
     //adding supplements
     console.log("servicePerPerson")
     console.log(servicePerPerson)

    //getting map size()
    let size=0
    if(members["adults"]<3&&members['children']<2){
        //parenting reduction
        if(members["children"]>0){
             if(members["adults"]==1){//reduction 1 parent 1 enfant
                if(hotel.RACStatus){
                    return parseFloat(hotel.RAC/100)*servicePerPerson
                }
                else{
return 0
                   

                }

                
            }
            
             else if(members["adults"]==2){//reduction 2 parent2 1 enfant
                if(hotel.RPCStatus){
                    return parseFloat(hotel.RPC/100)*servicePerPerson
                }
                else {return 0
                }
                

            } 
                //check for age reduction
            
        }
    }
        //3rd 4th bed
 else if(members['adults']+members['children']>3){
    if(hotel.RTFStatus){
        let totalReduction=parseFloat(hotel.RTF/100)*servicePerPerson*2
        return totalReduction
    }
else {
    //apply 
    let totalReduction=0
    return totalReduction

}

  }
//******************* */

    
return 0
}
    return(
        <div id="booking-accomodations">
            <button disabled={false} onClick={()=>handleClickable(1)} className={buttonStates[0]?"acc-btn acc-active":"acc-btn"}>LS</button>
            <button disabled={getAccState("LPD")} onClick={()=>handleClickable(2)} className={buttonStates[1]?"acc-btn acc-active":"acc-btn"}>LPD</button>
            <button disabled={getAccState("DP")} onClick={()=>handleClickable(3)} className={buttonStates[2]?"acc-btn acc-active":"acc-btn"}>DP</button>
            <button disabled={getAccState("PC")} onClick={()=>handleClickable(4)} className={buttonStates[3]?"acc-btn acc-active":"acc-btn"}>PC</button>
            <button disabled={getAccState("DPP")} onClick={()=>handleClickable(5)} className={buttonStates[4]?"acc-btn acc-active":"acc-btn"}>DP+</button>
            <button disabled={getAccState("PCP")} onClick={()=>handleClickable(6)} className={buttonStates[5]?"acc-btn acc-active":"acc-btn"}>PC+</button>
            <button disabled={getAccState("ALLIN")} onClick={()=>handleClickable(7)} className={buttonStates[6]?"acc-btn acc-active":"acc-btn"}>ALL IN </button>
            <button disabled={getAccState("ALLINSOFT")} onClick={()=>handleClickable(8)} className={buttonStates[7]?"acc-btn acc-active":"acc-btn"}>ALL IN SOFT</button>
            <div id="booking-total">
               <h3> TOTAL PRICE</h3> 
               <p>{totalPrice()}$ +</p>
               <p>{getReduction().toFixed(1)}$ - (Reductions)</p>
               <hr className="line"/>
               <p>{(totalPrice()-getReduction()).toFixed(1)}$ (Total)</p>
            </div>
        </div>
    )
}