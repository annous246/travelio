





export default function Reduction({title,color,reduction}){


    return (
        <div style={{backgroundColor:color}} className="reduction">
            <div className="reduction-title">{title}</div>
            <div className="reduction-value">%{reduction}</div>
        </div>
    )
}