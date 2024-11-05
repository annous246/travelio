import { useEffect, useRef, useState } from "react"
import "./login.css"

export default function Login({loginState,setLoginState,setRegisterState}){
    const form=useRef(null);
    const container=useRef(null);
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
                <input id="login-email" type="email" placeholder="email@email.com"/>
                <label htmlFor="login-password">Password</label>
                <input id="login-password"type="password" placeholder="********"/>
                <button id="login-submit-btn">Login</button>
                <a onClick={redirect} href="#">Register</a>
            </form>

        </div>

    )
}