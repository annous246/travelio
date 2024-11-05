import "./section1.css"
import Searchform from "../Search form/Searchform"
import DynamicText from "./DynamicText"
import {useRef ,useEffect,useState, useContext} from 'react'
import ConfirmationPanel from '../confirmationPanel/confirmationPanel.jsx'



export default function Section1({notify,setRoomAdderState}){

    return (
        
  <section id="section1">
  <DynamicText/>
  <Searchform setRoomAdderState={setRoomAdderState} />
        <ConfirmationPanel/>
</section>
    )
}