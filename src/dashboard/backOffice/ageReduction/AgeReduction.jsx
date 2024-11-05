import { useContext, useEffect,useState } from "react"
import WideInput from "../wideInput"
import { notificationContext } from "../../../App"
import './ageReduction.css'

export default function AgeReduction({index,setRCAges,rc,RCAges}){

console.log("age")
const setMessage=useContext(notificationContext)
const [RCAgeBegin,setRCAgeBegin]=useState(rc.RCAgeBegin)
const [RCAgeEnd,setRCAgeEnd]=useState(rc.RCAgeEnd)
const [RC,setRC]=useState(rc.RC)
const [RCStatus,setRCStatus]=useState(rc.RCStatus)




function checkOverlap(){
    let ok=true
    RCAges.forEach((p)=>{
        if(p.RCStatus){
            if((RCAgeBegin<=p.RCAgeEnd&&RCAgeBegin>=p.RCAgeBegin)||(RCAgeEnd<=p.RCAgeEnd&&RCAgeEnd>=p.RCAgeBegin))
                ok=false
        }
        
    })
    return ok
}
useEffect(()=>{
    if(RC.length){

        if(RC>100){
            setMessage('Reduction Cant Exceed 100%')
            setRC("")
    
        }
        else if(RC<1){
            setMessage('Reduction Cant Be Less Than 1%')
            setRC("")
    
        }
    }
},[RC])
function remove(){
    setRCAges((prev)=>{
        return prev.filter((p)=>{
            return p.id!=rc.id
        })
    })
}

function handleSubmission(){console.log(RCStatus)
    if(!RCStatus){
        
        if(!RCAgeBegin||!RCAgeBegin.length||!RCAgeEnd||!RCAgeEnd.length||!RC||!RC.length){
            setMessage('input Missing')
            setRCStatus(false)
            console.log("11111111111111111111111111111")

        }
    else if(RCAgeBegin<2||RCAgeBegin>11){
        setMessage("Age Should Be Between 0 and 11")
        setRCAgeBegin('')
        setRCStatus(false)        
            console.log("22222222222222222222222222")

    }
    else if(RCAgeEnd<2||RCAgeEnd>11){
        setMessage("Age Should Be Between 0 and 11")
        setRCAgeEnd('')
        setRCStatus(false)
        console.log("333333333333333333333333333")

    }
    else if(RCAgeEnd<RCAgeBegin){
        setMessage('TO AGE value should be greater than or equals FROM AGE ')
        setRCAgeEnd("")
        setRCStatus(false)
        console.log("4444444444444444444444444444")

    }
    else{
        console.log("55555555555555555555555555555")

        if(checkOverlap()){
            setRCAges((prev)=>{
                setRCStatus(true)
                return [...prev.slice(0,index)
                    ,{id:rc.id,
                        RC:RC,
                        RCAgeBegin:RCAgeBegin,
                        RCAgeEnd:RCAgeEnd,
                        RCStatus:true
                    },...prev.slice(index+1)
                ]
              })

        }
        else{
            setMessage("Age Interval overlaps with another")
            setRCStatus(false)
        }

    }
    
    }
    
    
    else{
        setRCAges((prev)=>{
            setRCStatus(false)
            return [...prev.slice(0,index)
                ,{id:rc.id,
                    RC:RC,
                    RCAgeBegin:RCAgeBegin,
                    RCAgeEnd:RCAgeEnd,
                    RCStatus:false
                },...prev.slice(index+1)
            ]
          })


    }
}

function runFalse(){
    setRCAges((prev)=>{
        setRCStatus(false)
        return [...prev.slice(0,index)
            ,{id:rc.id,
                RC:RC,
                RCAgeBegin:RCAgeBegin,
                RCAgeEnd:RCAgeEnd,
                RCStatus:false
            },...prev.slice(index+1)
        ]
      })


}
    return (
        <div id="age-container">
        <button type="button" onClick={remove} style={{alignSelf:"flex-end"}} className="blue-btn">X</button>
        <WideInput status={RCStatus} value={RC} onChange={(val)=>{setRC(val);runFalse()}} title="Reduction Child " placeholder="90%" type="Number"/>
            <span style={{display:'flex' ,flexDirection:"row" ,flexWrap:"no-wrap", alignItems:"center",justifyContent:"center"}}>
        <WideInput status={RCStatus} value={RCAgeBegin} onChange={(val)=>{setRCAgeBegin(val);runFalse()}} title="Reduction Age From :" placeholder="9" type="Number"/>
        <WideInput status={RCStatus} value={RCAgeEnd} onChange={(val)=>{setRCAgeEnd(val);runFalse()}} title="Reduction Age To:" placeholder="9" type="Number"/></span>
        <button type="button" className="blue-btn" onClick={handleSubmission}>{!RCStatus?"Confirm":"Revoke"}</button>
        </div>
        

    )

}