import { useContext, useEffect, useState } from "react"
import SeasonInputEditor from "./seasonInputEditor"
import WideInput from "./wideInput"
import { notificationContext } from "../../App"


export default function AccomodationElementEditor({accomodations,index,setAccomodations}){

          const [toDate,setToDate]=useState(accomodations[index].toDate)
          const [fromDate,setFromDate]=useState(accomodations[index].fromDate)
          const setMessage=useContext(notificationContext)


          const [LPD,setLPD]=useState(accomodations[index].LPD)
          const [DP,setDP]=useState(accomodations[index].DP)
          const [PC,setPC]=useState(accomodations[index].PC)
          const [ALLIN,setALLIN]=useState(accomodations[index].ALLIN)
          const [ALLINSOFT,setALLINSOFT]=useState(accomodations[index].ALLINSOFT)
          const [DPP,setDPP]=useState(accomodations[index].DPP)
          const [PCP,setPCP]=useState(accomodations[index].PCP)
      
          const [LPDStatus,setLPDStatus]=useState(accomodations[index].LPDStatus)
          const [DPStatus,setDPStatus]=useState(accomodations[index].DPStatus)
          const [PCStatus,setPCStatus]=useState(accomodations[index].PCStatus)
          const [ALLINStatus,setALLINStatus]=useState(accomodations[index].ALLINStatus)
          const [ALLINSOFTStatus,setALLINSOFTStatus]=useState(accomodations[index].ALLINSOFTStatus)
          const [DPPStatus,setDPPStatus]=useState(accomodations[index].DPPStatus)
          const [PCPStatus,setPCPStatus]=useState(accomodations[index].PCPStatus)

         console.log("LPD")
         console.log(LPD)
          useEffect(()=>{

            setAccomodations((prev)=>{
                let newAcc=JSON.parse(JSON.stringify(prev[index]))
                newAcc.LPD=LPD
                newAcc.LPDStatus=LPDStatus
                let res=[...prev]
                res[index]=newAcc
                return res
            })
          },[LPD,LPDStatus])

          
          useEffect(()=>{

            setAccomodations((prev)=>{
                let newAcc=JSON.parse(JSON.stringify(prev[index]))
                newAcc.DP=DP
                newAcc.DPStatus=DPStatus
                let res=[...prev]
                res[index]=newAcc
                return res
            })
          },[DP,DPStatus])

          
          useEffect(()=>{

            setAccomodations((prev)=>{
                let newAcc=JSON.parse(JSON.stringify(prev[index]))
                newAcc.PC=PC
                newAcc.PCStatus=PCStatus
                let res=[...prev]
                res[index]=newAcc
                return res
            })
          },[PC,PCStatus])

          
          useEffect(()=>{

            setAccomodations((prev)=>{
                let newAcc=JSON.parse(JSON.stringify(prev[index]))
                newAcc.PCP=PCP
                newAcc.PCPStatus=PCPStatus
                let res=[...prev]
                res[index]=newAcc
                return res
            })
          },[PCP,PCPStatus])

          
          useEffect(()=>{

            setAccomodations((prev)=>{
                let newAcc=JSON.parse(JSON.stringify(prev[index]))
                newAcc.DPP=DPP
                newAcc.DPPStatus=DPPStatus
                let res=[...prev]
                res[index]=newAcc
                return res
            })
          },[DPP,DPPStatus])

          
          useEffect(()=>{

            setAccomodations((prev)=>{
                let newAcc=JSON.parse(JSON.stringify(prev[index]))
                newAcc.ALLIN=ALLIN
                newAcc.ALLINStatus=ALLINStatus
                let res=[...prev]
                res[index]=newAcc
                return res
            })
          },[ALLIN,ALLINStatus])

          
          useEffect(()=>{

            setAccomodations((prev)=>{
                let newAcc=JSON.parse(JSON.stringify(prev[index]))
                newAcc.ALLINSOFT=ALLINSOFT
                newAcc.ALLINSOFTStatus=ALLINSOFTStatus
                let res=[...prev]
                res[index]=newAcc
                return res
            })
          },[ALLINSOFT,ALLINSOFTStatus])

          
          useEffect(()=>{
            console.log("ACOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
            console.log(accomodations)},[accomodations])

function remove(){
    setAccomodations((prev)=>{
       return  [...prev.slice(0,index),...prev.slice(index+1)]
    })
}
    return (
        
        <div className="accomodation-element">
            <button className="blue-btn" style={{alignSelf:"flex-end"}} onClick={remove}>X</button>
    <h4 className="hotel-add-header2">Accomodation For Season {index+1}</h4>
        <SeasonInputEditor index={index} setAccomodations={setAccomodations} accomodations={accomodations}  setTodate={setToDate} setFromdate={setFromDate}/>
       
       <h4>LPD Accomodation</h4>
       <WideInput status={LPDStatus} value={LPD} onChange={(val)=>setLPD(val)} title="LPD Price" placeholder="100$" type="Number"/>
       <button type="button" className="blue-btn" onClick={()=>setLPDStatus((prev)=>!prev)}>{!LPDStatus?"Confirm":"Revoke"}</button>
       
       <h4>DP Accomodation</h4>
       <WideInput status={DPStatus} value={DP} onChange={(val)=>setDP(val)} title="DP Price" placeholder="100$" type="Number"/>
       <button type="button" className="blue-btn" onClick={()=>setDPStatus((prev)=>!prev)}>{!DPStatus?"Confirm":"Revoke"}</button>
       
       <h4>PC Accomodation</h4>
       <WideInput status={PCStatus} value={PC} onChange={(val)=>setPC(val)} title="PC Price" placeholder="100$" type="Number"/>
       <button type="button" className="blue-btn" onClick={()=>setPCStatus((prev)=>!prev)}>{!PCStatus?"Confirm":"Revoke"}</button>
       
       <h4>ALL IN Accomodation</h4>
       <WideInput status={ALLINStatus} value={ALLIN} onChange={(val)=>setALLIN(val)} title="ALL IN Price" placeholder="100$" type="Number"/>
       <button type="button" className="blue-btn" onClick={()=>setALLINStatus((prev)=>!prev)}>{!ALLINStatus?"Confirm":"Revoke"}</button>
       
       <h4>ALL IN SOFT Accomodation</h4>
       <WideInput status={ALLINSOFTStatus} value={ALLINSOFT} onChange={(val)=>setALLINSOFT(val)} title="ALL IN SOFT Price" placeholder="100$" type="Number"/>
       <button type="button" className="blue-btn" onClick={()=>setALLINSOFTStatus((prev)=>!prev)}>{!ALLINSOFTStatus?"Confirm":"Revoke"}</button>
       
       <h4>DP+ Accomodation</h4>
       <WideInput status={DPPStatus} value={DPP} onChange={(val)=>setDPP(val)} title="DP+ Price" placeholder="100$" type="Number"/>
       <button type="button" className="blue-btn" onClick={()=>setDPPStatus((prev)=>!prev)}>{!DPPStatus?"Confirm":"Revoke"}</button>
       
       <h4>PC+ Accomodation</h4>
       <WideInput status={PCPStatus} value={PCP} onChange={(val)=>setPCP(val)} title="PC+ Price" placeholder="100$" type="Number"/>
       <button type="button" className="blue-btn" onClick={()=>setPCPStatus((prev)=>!prev)}>{!PCPStatus?"Confirm":"Revoke"}</button>
       </div>
       


       
    )
}