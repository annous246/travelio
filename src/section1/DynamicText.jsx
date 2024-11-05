
import {useRef ,useEffect,useState} from 'react'
import './text.css'
export default function DynamicText(){
    
    const [text1,setText1]=useState('Cinema')
    const [text2,setText2]=useState('Brilliance')
    const [count,setCount]=useState(0)
   
    const t1=useRef(null)
    const t2=useRef(null)
    function animateText(){
      const lista=["Peaceful","Elegant","Vibrant"]
      const listb=["Paradises","Escapes","Vacations"]
      let textelement1=t1.current
      let textelement2=t2.current
      
      textelement1.className="animate1"
      textelement2.className="animate2"
      setTimeout(()=>{
          setText1(lista[count])},1200)
      setTimeout(()=>{
        setText2(listb[count])},900)
      setTimeout(()=>{
          textelement1.className=""},2000)
      setTimeout(()=>{
        textelement2.className=""},1500)
  
    }
    useEffect(()=>{
      const id=setTimeout(()=>{animateText();setCount((count+1)%3)},3000)
      return ()=>clearInterval(id)
    },[count])
    return (
        
  <div id="text-display">
  <h3 ref={t1}>{text1}</h3>
  <h4 ref={t2}>{text2}</h4>
</div>
    )
}