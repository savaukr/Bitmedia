import React from 'react'
import './HeaderHome.scss'

export const HeaderHome = ()=> {
    return (
        <header>
            <div className="header__container_left">
                <a href='/' className='logo'>AppCo</a>
                <div className='header__content'>
                    <div className="header__title"><b>Brainstorming</b> for desired perfect Usability</div>
                    <div className="header__text">
                        Our design projects are fresh and simple and will benefit your business greatly. Learn more about our work!
                    </div>
                    <button>Views Stats</button>
                </div>
            </div>
            < div className="header__container_right">
            </div>
        </header>
    )
}