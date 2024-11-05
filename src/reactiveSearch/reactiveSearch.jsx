
import './reactiveSearch.css'
import { useEffect,useRef,useState } from 'react'
export default function ReactiveSearach({placeHolder,items,search,setSearch}){
    
    const region=useRef(null)
    const [regions,setRegions]=useState(items)
    const [filteredRegions,setFilteredRegions]=useState(regions)


    const searchInput=useRef(null)



    

    function popSearch(){
        region.current.style.opacity="1"
       region.current.style.height="10em"
        
      }
      function cleanSearch(){
        region.current.style.opacity="0"
       setTimeout(()=>{
       region.current.style.height="0em"
      },200)
        
      }

    
    function searcher(e){
        console.log(e.target.value)
        const currentSearch=e.target.value;
        setSearch(currentSearch)
        if(currentSearch.length){
          //open popup
          setFilteredRegions((prev)=>{
            let fr= regions.filter((r)=>{
              if(r.length>=currentSearch.length){
                
                return (r.toLowerCase().indexOf(currentSearch.toLowerCase())!=-1)
              }
            })
            return fr
          })
    
    
        }
        else {setFilteredRegions(regions)}
      }


     return (
    <div id='search-bar-container'>
     <span className="search-input" >
        <label htmlFor='region'>Region</label>
        <input onFocus={popSearch}  onBlur={cleanSearch}  required={true}  placeholder={placeHolder} type="text" ref={searchInput} value={search} onChange={(e)=>searcher(e)}/>
        </span>
        <span id='hotelRegions'  ref={region}>
          <ol>
            {
              filteredRegions.map((region)=>{
                return <li><button type="button" value={region} onClick={(e)=>{searcher(e)}}>{region}</button></li>
              })
            }
          </ol>
        </span>
    </div>
     )
}