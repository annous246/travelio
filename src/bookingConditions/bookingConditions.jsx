import "./bookingConditions.css"
import { useEffect,useState,useRef } from "react"
import WideInput from "../dashboard/backOffice/wideInput"

export default function BookingConditions(){
    return(
        <div id="booking-conditions">
            <h3>Terms And Conditions</h3>
            <ol type="1">
                <li><h5>To make a booking</h5>please follow the procedure shown on our website or ask for an offline application form.</li>
                <li><h5>The price quoted</h5> for any trip covers the cost of the planning, the organisation and carrying out of the trip.</li>
                <li><h5>Travel insurance</h5>It is essential that you have adequate and appropriate cover for your trip including any adventurous activities such as trekking at altitude.</li>
                <li><h5>Special requests</h5> Please advise us of any special requests prior to making your booking.</li>
                <li><h5>Cancellation of bookings</h5>must be done during the first 24 hours after requesting the booking otherwise it will be automatically rejected.</li>
            </ol>
        </div>
    )
}