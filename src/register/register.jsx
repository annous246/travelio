import { useContext, useEffect, useRef, useState } from "react"
import "./register.css"
import axios from 'axios'
import {notificationContext} from '../App'

axios.defaults.withCredentials=true
axios.defaults.headers.common['auth'] = localStorage.getItem('token');


export default function Register({registerState,setRegisterState,setLoginState}){
    const form=useRef(null);
    const container=useRef(null);
    const [email,setEmail]=useState('')
    const [age,setAge]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [nationality,setNationality]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName,setLastName]=useState('')
    const setMessage=useContext(notificationContext)
    function errorCheck(a=[]){
        if(a.length){
            for(let k of a){
                if(!k)return false;
                if(!k.length)return false;
            }return true;
        }
    }
    function connect(){
        if(errorCheck([email,password,confirmPassword,age,lastName,firstName])&&!isNaN(parseInt(age))){
            
        axios.post('https://api-travelio.onrender.com/auth/register',{email:email,password:password,confirmPassword:confirmPassword,lastName:lastName,firstName:firstName,age:age,nationality:nationality})
        .then((res)=>{
            console.log(res)
            if(res.data.status){
                setRegisterState(false)

            }
            console.log(res.data.message)
            
            setMessage(res.data.message)
        })
        .catch((e)=>setMessage(e))
        }
        else{
            if(!email)setMessage("email is Required")
            else if(!password)setMessage("password is Required")
            else if(!confirmPassword)setMessage("confirmPassword is Required")
            else if(!firstName)setMessage("firstName is Required")
            else if(!lastName)setMessage("lastName is Required")
            else if(!age)setMessage("age is Required")
        }


    }


    useEffect(()=>{
        if(registerState){
            container.current.style.display="flex"
            setTimeout(()=>{
                form.current.className=" slider"}
                ,10)
                setTimeout(()=>{
                    form.current.className+=" opaque"}
                    ,300)
        }
        else{
            form.current.className=""
            
            setTimeout(()=>
                container.current.style.display="none",200)
        }
    },[registerState])
    function close(){
        setRegisterState(false)
    }
    function redirect(){
        close()
        setTimeout(() => {
            
        setLoginState(true)
        }, 200);
    }

    function emailHandle(e){
        setEmail(e.target.value)
    }
    
    function ageHandle(e){
        setAge(e.target.value)
    }
    function passwordHandle(e){
        setPassword(e.target.value)
    }
    function cpasswordHandle(e){
        setConfirmPassword(e.target.value)
    }
    function nationalityHandle(e){
        setNationality(e.target.value)
    }
    function fnHandle(e){
        setFirstName(e.target.value)
    }
    function lnHandle(e){
        setLastName(e.target.value)
    }
    return(
        <div id="register-container" ref={container}>
            <form id="register-form" ref={form}>
                <button type="button" onClick={close} id="register-close">X</button>
                <h2>register</h2>
                <label htmlFor="register-email">E-mail</label>
                <input value={email} required={true} onChange={emailHandle} id="register-email" type="email" placeholder="email@email.com"/>
                <label htmlFor="register-password">Password</label>
                <input value={password}  required={true} onChange={passwordHandle} id="register-password"type="password" placeholder="********"/>
                <label htmlFor="register-confirm-password">confirm-password</label>
                <input value={confirmPassword}  required={true} onChange={cpasswordHandle} id="register-confirm-password"type="password" placeholder="********"/>
                <span id="additional-details">
                <span  className="holder">
                <label htmlFor="register-fn">Fisrt Name</label>
                <input value={firstName}  required={true} onChange={fnHandle} id="register-fn" type="text" placeholder="John"/></span>
                <span className="holder">
                <label htmlFor="register-ln">Last Name</label>
                <input value={lastName}  required={true} onChange={lnHandle} id="register-ln" type="text" placeholder="Doe"/></span>

                </span><span id="other-additional-details">
                <span  className="holder">
                <label htmlFor="register-nationality">Nationality</label>
                <input value={nationality}  onChange={nationalityHandle} id="register-nationality" type="text" placeholder="Tunisian"/></span>
                <span  className="holder">
                <label htmlFor="register-age">Age</label>
                <input value={age}  required={true} onChange={ageHandle} id="register-age" type="Number" placeholder="18"/></span>
                </span>
                <button onClick={connect} id="register-submit-btn" type="button">register</button>
                <a onClick={redirect} href="#">Login</a>
            </form>

        </div>

    )
}