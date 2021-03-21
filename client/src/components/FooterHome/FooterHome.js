import React, {useState} from 'react'
import './FooterHome.scss'


export const FooterHome = () => {
    
    const [email, setEmail] = useState('')
    const changeHandler = (event) => {
        setEmail(event.target.value)
    }

    return (
        <footer>
            <div>
                <div className="footer__input">
                    <input 
                        className="footer__input_input"
                        type="email"
                        name="email"
                        placeholder="Enter your emeil"
                        onChange={changeHandler} 
                        value={email} >
                    </input>
                    <button className="footer__input_button">Subscribe</button>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="logo">AppCo</div>
                <div className="footer_text">All rights reserved by ThemeTags</div>
                <div className="footer_text">Copyrights © 2019.</div>
            </div>
        </footer>
    )
} 