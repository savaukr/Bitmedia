import React, {useState} from 'react'
import './FooterHome.scss'


export const FooterHome = () => {
    
    const [email, setEmail] = useState('')
    const changeHandler = (event) => {
        console.log(event.target.value)
        setEmail(event.target.value)
    }

    return (
        <footer>
            <div>
                <div className="footer__input">
                    <input 
                        type="email"
                        placeholder="Enter your emeil"
                        onChange={changeHandler} 
                        value={email} >
                    </input>
                    <button>Subscribe</button>
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