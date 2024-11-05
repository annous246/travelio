import {useState,useRef, useEffect, useCallback, useContext} from "react"
import {notificationContext} from '../../App'



export default function SeasonInputEditor({index,accomodations,setAccomodations}){

    const ci=useRef(null)
    const co=useRef(null)
    const [from,setFrom]=useState(accomodations[index].fromDate)
    const [to,setTo]=useState(accomodations[index].toDate)
    const [nights,setNights]=useState("")
    const setMessage=useContext(notificationContext)
    
    
    function checkInOverlap(f,t){
      let ok=true;
      accomodations.forEach((acc,ind)=>{
        console.log(acc)
        if(ind!=index){
          if(acc.toDate.length&&acc.fromDate.length){
              
           let ourFromDate=new Date(f).getTime()
           let ourToDate=new Date(t).getTime()
           let frm=new Date(acc.fromDate).getTime()
           let tro=new Date(acc.toDate).getTime()
           if(ourFromDate<=frm&&ourToDate>=tro)ok=false;
          }}
      })
      return ok;
    }

    function checkOverlap(date){
      let ok=true;
      if(!date.length)return true
      console.log("accomodations")
      console.log(accomodations)
      accomodations.forEach((acc,ind)=>{
                  if(ind!=index){
                    
          if(acc.toDate.length&&acc.fromDate.length){
              
           let ourDate=new Date(date).getTime()
           let from=new Date(acc.fromDate).getTime()
           let to=new Date(acc.toDate).getTime()
           console.log(ourDate)
           console.log(from)
           console.log(to)
           if(ourDate<=to&&ourDate>=from)ok=false;
          }
                  }
      })
      return ok;
    }

    function byDate(a,b){
      if(a.fromDate.length&&b.fromDate.length&&a.toDate.length&&b.toDate.length){//console.log("here")
             const beginA=new Date(a.fromDate).getTime()
             const beginB=new Date(b.fromDate).getTime()
             if(beginA>beginB)return 1
             else return -1;
      }
      else if(!a.fromDate.length||!a.toDate.length){
        return -1
      }
      else return 1;
    }
  function handleFrom(e){
    if(to){
        const fromdate=new Date(e.target.value).getTime()
        const todate=new Date(to).getTime()
        if(todate<=fromdate){
          setMessage("From Date Need To be with or Before To Date")
          setFrom("")
        }
        else{
          //ok
          setFrom(e.target.value)
        }
    }
    else
    setFrom(e.target.value)

  }
  function handleTo(e){
    if(from){
        const todate=new Date(e.target.value).getTime()
        const fromdate=new Date(from).getTime()
        if(todate<=fromdate){
          setMessage("From Date Need To be with or Before To Date")
          setTo("")
        }
        else{
          //ok
          setTo(e.target.value)
        }
    }
    else
    setTo(e.target.value)

  }

  useEffect(()=>{
    setNights('')
    if(from.length&&to.length){
      //we can confirm season
        setNights((new Date(to).getTime()-new Date(from).getTime())/(1000*3600*24))
        
    }
    
    if(checkOverlap(to)&&checkOverlap(from)){
      if(from.length&&to.length){
      if(checkInOverlap(from,to)){
        setAccomodations((prev)=>{
          let newAcc=JSON.parse(JSON.stringify(prev[index]))
          newAcc.toDate=to
          newAcc.fromDate=from
          let res=JSON.parse(JSON.stringify([...prev]))
          res[index]=newAcc
          if(from.length&&to.length)
          res=res.sort(byDate)
          return res
      })
      }
      else{
        setMessage("Another Season Overlaps With The Provided Dates")
        setTo("")
        setFrom("")

      }

      }
      else{setAccomodations((prev)=>{
        let newAcc=JSON.parse(JSON.stringify(prev[index]))
        newAcc.toDate=to
        newAcc.fromDate=from
        let res=JSON.parse(JSON.stringify([...prev]))
        res[index]=newAcc
        if(from.length&&to.length)
        res=res.sort(byDate)
        return res
    })

      }
        
      }
      
      else{
          setMessage("Date You Gave OverLaps With Another Season")
          setTo("")
          setFrom("")
      }
  
  },[from,to])

    return (
        <>
        <span style={{width:"100%"}} className="home-input" id='ci-span'>
        <label htmlFor='cid'>From</label>
        <input  ref={ci} value={from} onChange={handleFrom}  required={true} id='cid' placeholder="Check In" type="date" />
        </span>

        <span style={{width:"100%"}}  className="home-input" id='co-span'>
        <label htmlFor='cod'>To</label>
        <input  ref={co} value={to} onChange={handleTo}  required={true} id='cod' placeholder="Check Out" type="date"/>
        </span>
        
        <span style={{width:"100%"}}  className="home-input" id='n-span'>
        <label>Nights</label>
        <label id="night-display">{nights}</label>

        </span>
        </>
    )
}