import './footer.css'
import log from '../assets/location.png'
import f from '../assets/facebook.png'
import i from '../assets/instagram.png'
import p from '../assets/phonel.png'

export default function Footer(){

    return(
        <div id="footer-container">
            <div id='footer-logo'>
                <span ></span>
                <p>We Match Your Destination</p>
            </div>
            <div id='our-footer'>
                <h3>Our Services</h3>
                <ul>
                    <a href="#"><li>Hotel Reservations</li></a>
                    <a href="#"><li>Car Rentals</li></a>
                    <a href="#"><li>Tour Packages</li></a>
                    <a href="#"><li>Group Travel</li></a>
                </ul></div>
            <div id='about-footer'>
            <h3>About Us</h3>
                <ul>
                    <a href="#"><li>Who Are We</li></a>
                    <a href="#"><li>What do We Do</li></a>
                    <a href="#"><li>Whats Our Culture</li></a>
                    <a href="#"><li>What do We Offer</li></a>
                </ul></div>
            <div id='contact-footer'>
            <h3>Our Contact</h3>
                
            <ul>
                    <span className='locate'><div style={{backgroundImage:`url('${log}')`}}  className="social-link"></div><a href="#"><li>Tunisia, Djerba ,Homet Souk</li></a></span>
                    <span className='locate'><div style={{backgroundImage:`url('${p}`}}  className="social-link"></div><a href="#"><li>+(216) 52 645 954</li></a></span>
                    <span className='locate'><div style={{backgroundImage:`url('${f}`}}  className="social-link"></div><a href="#"><li> Facebook </li></a></span>
                    <span className='locate'><div style={{backgroundImage:`url('${i}`}}  className="social-link"></div><a href="#"><li> Instagram </li></a></span>
                </ul>
            </div>
        </div>
    )
}