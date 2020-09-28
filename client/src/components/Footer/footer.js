import React from "react";
import './footer.css';
import {facebook,instagram,twitter,visamaster,american,paypal,oca,dhl,correoArg} from './icons/index.js';

const Footer = () => {
    
    return (
        <div className = "content-footerMayor">
        <div className='content-footer'>
            <footer>
            <p className = "fontFooterTitle">CONTACT INFORMATION</p>
            <label className = "fontFooter">Phone number and Whatsapp</label><br/>
            <label>0800-111-2222</label><label className = "fontFooter">(landline)</label><br/>
            <label>3651-111-3333</label><label className = "fontFooter">(mobile)</label>
            </footer>
            <footer>
                <p className = "fontFooterTitle">CUSTUMER SUPPORT</p>
                <label className = "fontFooter" >Frequent questions</label><br/>
                <label className = "fontFooter" >Contact us</label>
            </footer>
            <footer>
                <p className = "fontFooterTitle">LEGAL WARNING</p>
                <label className = "fontFooter" >Terms and conditions</label><br/>
                <label className = "fontFooter" >Privacy policy</label>
            </footer>
            <footer>
            <div>
            <p className = "fontFooterTitle">FOLLOW US!</p>
            <a href = "https://www.facebook.com/Watchuseek/" target="_blank"><img className='social' src = {facebook}/></a>
            <a href = "https://www.instagram.com/watchuseek" target="_blank"><img className='social' src = {instagram}/></a>
            <a href = "https://twitter.com/watchuseek" target="_blank"><img className='social' src = {twitter}/></a>

            </div>
            <div>
            <p className = "fontFooterTitle">PAYMENT METHODS</p>
            <img className='payment' src = {visamaster}/>
            <img className='payment' style = {{marginLeft : "-10px"}} src = {american}/>
            <img className='payment' src = {paypal}/>
            </div>
            </footer>
        </div>
        <div className = "content-footer" style= {{paddingTop: "10px"}}>
            <div className = "footerImg" >
                <img className = "shipping" style = {{height: "80px"}} src = {dhl}/>
                <img className = "shipping" style = {{height: "60px", paddingTop: "20px"}} src = {oca}/>
                <img className = "shipping" style = {{height: "60px", paddingTop: "20px"}} src = {correoArg}/>
            </div>
        </div>
    </div>
    )
}


export default Footer;