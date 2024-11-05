import { useContext, useEffect, useRef, useState } from "react"
import "./login.css"
import axios from 'axios'
import { authenticationContext, notificationContext } from "../App";

axios.defaults.withCredentials=true
axios.defaults.headers.common['auth'] = localStorage.getItem('token');

export default function Login({loginState,setLoginState,setRegisterState}){
    const form=useRef(null);
    const container=useRef(null);
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const setMessage=useContext(notificationContext)
    const {setAuth,setUpdateHeaders,updateHeaders}=useContext(authenticationContext)
   function emailHandle(e){
    setEmail(e.target.value)
   }

   function passwordHandle(e){
    setPassword(e.target.value)
   }
   function login(){
    axios.post('https://api-travelio.onrender.com/auth/login',{email:email,password:password})
    .then((res)=>{
        console.log(res.data.message)
        if(res.data.status){
            localStorage.setItem("token",res.data.token)
            axios.defaults.headers.common['auth'] = localStorage.getItem('token');
            
            setAuth(true)
            setLoginState(false)
            setUpdateHeaders(!updateHeaders)
            
        }
        setMessage(res.data.message)

    })
    .catch((e)=>{
        setMessage(e)

    })

   }


    useEffect(()=>{
        if(loginState){
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
    },[loginState])
    function close(){
        setLoginState(false)
    }
    
    function redirect(){
        close()
        setTimeout(() => {
            
        setRegisterState(true)
        }, 200);
    }
    return(
        <div id="login-container" ref={container}>
            <form id="login-form" ref={form}>
                <button type="button" onClick={close} id="login-close">X</button>
                <h2>LOGIN</h2>
                <label htmlFor="login-email">E-mail</label>
                <input value={email} onChange={emailHandle} id="login-email" type="email" placeholder="email@email.com"/>
                <label htmlFor="login-password">Password</label>
                <input value={password} onChange={passwordHandle}  id="login-password"type="password" placeholder="********"/>
                <button type="button" onClick={login} id="login-submit-btn">Login</button>
                <a onClick={redirect} href="#">Register</a>
            </form>

        </div>

    )
}