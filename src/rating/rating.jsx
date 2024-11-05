import './rating.css'



export default function Rating({rating}){
    return (
        
      <span className="rating-container"><h5>Rating:</h5><span className="rating">{rating}</span></span>
   
    )
}