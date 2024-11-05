import "./searchform.css"
import {useRef ,useEffect,useState} from 'react'
export default function Searcher({searcher,reference,filteredRegions}){ 



    return (
        <span id='regions'  ref={reference}>
          <ol>
            {
              filteredRegions.map((region)=>{
                return <li><button type="button" value={region} onClick={(e)=>{searcher(e)}}>{region}</button></li>
              })
            }
          </ol>
        </span>
    )
}