import "./navbar.css"
import lang from '../assets/us.png'
import logo from '../assets/location.png'
export default function Navbar({setLoginOpen,setRegisterOpen}){
    function open(){
        setLoginOpen(true)
    }
    function openreg(){
        setRegisterOpen(true)
    }
    return (
        
    <header id="header">
    <span id="logo-span">
        <img id="logo-img" src={logo}/>
        <h3>Travelio</h3>
    </span>
    <nav id="navbar">
        <ul>
            <li><span className="expander"></span><a>Home</a></li>
            <li><span className="expander"></span><a>Our Services</a></li>
            <li><span className="expander"></span><a>About Us</a></li>
            <li><span className="expander"></span><a>Contact Us</a></li>
        </ul>
    </nav>
    <button id="login" onClick={open}>Login</button>
    <button id="register" onClick={openreg}>Register</button>
    <span id="language"><img src={lang}/></span>
</header>
    )
}