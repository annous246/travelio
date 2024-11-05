import { useEffect, useState ,useRef} from "react";





export default function ImageShow({status,image,setStatus}){
    const imageContainer=useRef(null) 
    const imageRef=useRef(null) 

    useEffect(()=>{
        if(imageContainer){
        if(status){
            imageContainer.current.style.display="flex"
            setTimeout(()=>{
                imageContainer.current.className="opaque"

            },200)

         
        }
        else{
            imageContainer.current.style.className=""
            setTimeout(()=>{
            imageContainer.current.style.display="none"

            },200)


        }

        }
        if(image){
            console.log("image")
            console.log(image)
            imageRef.current.style.backgroundImage=`url("${image}")`

        }
    },[status])



    return (
        <div ref={imageContainer} id="show-container">
            <button className="blue-btn" onClick={()=>setStatus(false)}>X</button>
            <div ref={imageRef} id="main-image"></div>

        </div>
    )
}