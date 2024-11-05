import "./facture.css"
import { useEffect, useReducer, useState } from "react"
import logo from "../assets/LOGO ZENITH.png"
import printer from 'html2pdf.js'
import LoadingPanel from "../LoadingPanel/loadingpanel"

export default function Facture({reservation}){
const [loading,setLoading]=useState(true)
const [nights,setNights]=useState(0)
const [rooms,setRooms]=useState(0)
useEffect(()=>{
    if(reservation){
        
let checkin=new Date(reservation.checkIn).getTime()/1000
let checkout=new Date(reservation.checkOut).getTime()/1000
let number=parseInt((checkout-checkin)/(3600*24))
setNights(number)
console.log(reservation.bookedRooms)
let counter=0;
for(let room in reservation.bookedRooms){
    let theRoom=reservation.bookedRooms[room]

    if(theRoom.status){counter+=theRoom.units;

    }
}

setRooms(counter)
setLoading(false)
console.log(reservation)
    }
},[])
    function print(){
        let body=document.getElementById('facture-container')
        console.log("body")
        console.log(body)
        const options={
            margin:1,
            filename:"booking"+reservation._id+".pdf",
            image:{type:'jpeg',quality:"0.98"},
            html2canvas:{scale:5},
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }

        }
        printer().from(body).set(options).save()
  
}
function totalAcc(){
    return reservation.totalPrice
}
function total(){
    let to= parseFloat(totalAcc())
    return to.toFixed(2)
}

    return(
        reservation&&!loading?
        <>
            <button className="blue-btn" onClick={print}>Print</button>
        <div id="facture-container">
            <div id="voucher">
                <h2><img id="logo-voucher" src={logo}/></h2>
                <h4>Voucher Id :az4d9az9d4a9d</h4>
                
                <table id="voucher-details">
                    <tr>
                        <td>Reservation Id</td>
                        <td>{reservation._id}</td>
                    </tr>
                    <tr>
                        <td>Hotel</td>
                        <td>{reservation.hotel.hotelName}</td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td>{reservation.hotel.hotelLocation}</td>
                    </tr>
                    <tr>
                        <td>Hotel Phone Number</td>
                        <td>{reservation.hotel.hotelPhone}</td>
                    </tr>
                    <tr>
                        <td>Client Name</td>
                        <td>{reservation.data.firstName} {reservation.data.lastName}</td>
                    </tr>
                    <tr>
                        <td>Client Email</td>
                        <td>{reservation.id}</td>
                    </tr>
                    <tr>
                        <td>Check-In Date</td>
                        <td>{reservation.checkIn}</td>
                    </tr>
                    <tr>
                        <td>Check-Out Date</td>
                        <td>{reservation.checkOut}</td>
                    </tr>
                    <tr>
                        <td>Number Of Nights</td>
                        <td>{nights}</td>
                    </tr>
                    <tr>
                        <td>Accomodation</td>
                        <td>{reservation.accomodation}</td>
                    </tr>
                    
                </table>
                <table id="voucher-booking-details">
                    <tr>
                        <td>Booked Rooms</td>
                        <td>Adults</td>
                        <td>Children</td>
                        <td>Babies</td>
                    </tr>
                    <tr>
                        <td ><span id="rooms-voucher-title">{rooms} {rooms>1?"Rooms":"Room"}: </span><br/> 
                        <ul id="rooms-voucher">
                            <li>Single Rooms : {reservation.bookedRooms.singleRoom.units}</li>
                            <li>Double Rooms : {reservation.bookedRooms.doubleRoom.units}</li>
                            <li>Triple Rooms : {reservation.bookedRooms.tripleRoom.units}</li>
                            <li>Quadruple Rooms : {reservation.bookedRooms.quadrupleRoom.units}</li>
                            <li>Family Rooms : {reservation.bookedRooms.familyRoom.units}</li>

                        </ul>
                        </td>
                        <td>{reservation.members.adults} adults</td>
                        <td>{reservation.members.children} children</td>
                        <td>{reservation.members.babies} babies</td>
                    </tr>
                </table>
                <p className="ending-phrase">Travelio Wishes You The Best Holidays </p>
                <p className="ending-phrase">For Any Help You Can Call us on +(216)54878954</p>
            </div>
            <div id="facture">
            <h2><img id="logo-voucher" src={logo}/></h2>

            <table id="facture-table">
                <tr>
                    <td>Presented Items</td>
                    <td>Number Of Rooms</td>
                    <td>Price Per Room</td>
                    <td>Number Of Persons</td>
                    <td>Current Accomodation</td>
                    <td>Accomodation Price Per Person</td>
                    <td className="facture-total">Total Accomodation price</td>
                    <td>Reductions</td>
                    <td>Extra Supplements</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <h3>Hotel Stay At :<br/><h5>{reservation.hotel.hotelName}</h5> </h3>
                        <br/>
                        <h3>From : <p className="factureChecks">{reservation.checkIn}</p></h3>
                        <br/>
                        <h3>To : <p className="factureChecks">{reservation.checkOut}</p></h3>
                        <h3>Stay Description : <br/><h5><span className="fact-dets">{nights}</span> Nights With <span className="fact-dets">{reservation.accomodation}</span>  Accomodation</h5> </h3>



                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>  
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    
                    <td>
                    <h5>Rooms:</h5> 
                        singleRooms
                        <br/> doubleRooms
                        <br/> tripleRooms
                        <br/>quadrupleRooms
                        <br/>familyRooms
                        <br/>
                    </td>
                    <td>
                        0{reservation.bookedRooms.singleRoom.units}
                        <br/> 
                        0{reservation.bookedRooms.doubleRoom.units}
                        <br/>
                        0{reservation.bookedRooms.tripleRoom.units}
                        <br/> 
                        0{reservation.bookedRooms.quadrupleRoom.units}
                        <br/>
                        0{reservation.bookedRooms.familyRoom.units}
                        <br/> 

                    </td>
                    <td>
                        {reservation.bookedRooms.singleRoom.price>0?"$"+reservation.bookedRooms.singleRoom.price:"Undefined"}
                        <br/> 
                        {reservation.bookedRooms.doubleRoom.price>0?"$"+reservation.bookedRooms.doubleRoom.price:"Undefined"}
                        <br/>
                        {reservation.bookedRooms.tripleRoom.price>0?"$"+reservation.bookedRooms.tripleRoom.price:"Undefined"}
                        <br/> 
                        {reservation.bookedRooms.quadrupleRoom.price>0?"$"+reservation.bookedRooms.quadrupleRoom.price:"Undefined"}
                        <br/>
                        {reservation.bookedRooms.familyRoom.price>0?"$"+reservation.bookedRooms.familyRoom.price:"Undefined"}
                        <br/> </td>
                        <td></td>  
                        
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                
                <tr>
                    <td>
                        <h5>Members:</h5> 
                        Adults <br/>
                        Children <br/>
                        Babies <br/>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                       <br/>
                        {reservation.members["adults"]}<br/>
                        {reservation.members["children"]}<br/>
                        {reservation.members["babies"]}<br/>
                    </td>
                <td>{reservation.accomodation}</td>
                <td>{reservation.accomodation!="LS"?"$"+reservation.hotel[reservation.accomodation].price:"$0.0"} </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                </tr>
                <tr>
                <td></td>  
                <td></td>  
                <td></td>  
                <td></td>  
                <td></td>
                <td></td>
                <td className="facture-total">${totalAcc()}(Includes LS Accomodation)</td>
                <td className="facture-total">${reservation.reduction}</td>
                <td>${reservation.totalSupp}</td>
                <td></td>
                <td></td>
                </tr>
                <tr>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-total">Pre Tax Total :</td>
                    <td className="facture-total">${((totalAcc()+parseFloat(reservation.totalSupp)-reservation.reduction)*0.93).toFixed(2)}</td>
                </tr>
                
                <tr>
                <td className="facture-empty"></td>
                    <td className="facture-empty" id="facture-qr"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-total">Total After Tax (TVA 0.7%):</td>
                    <td  className="facture-total">${(totalAcc()+parseFloat(reservation.totalSupp)-reservation.reduction)}</td>
                </tr>
                <tr>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-empty"></td>
                    <td className="facture-total">Total:</td>
                    <td className="facture-total">${(totalAcc()+parseFloat(reservation.totalSupp)-reservation.reduction)}</td>
                </tr>
            </table>
            </div>
            <div id="facture-background"></div>
        </div>
        </>
        :
        <LoadingPanel loading={loading}/>

    )
}