import React from 'react'
import { Card } from '../components/Card/Card'
import { FooterHome } from '../components/FooterHome/FooterHome'
import { HeaderHome } from '../components/HeaderHome/HeaderHome'
import icon from '../img/Vector.png'
import './homePage.scss'

export const HomePage = () => {
    return (
        <div>
            <HeaderHome />
            <main>
                <div className= "main__describe">
                    <h2>
                        Why <strong>small business owners love</strong> AppCo?
                    </h2>
                    <p>
                        Our design projects are fresh and simple and will benefit your business greatly
                        Learn more about our work!
                    </p>
                </div>
                <div className="cards">
                    <Card 
                        title="Clean Design"
                        content="Increase sales by showing true dynamics of your website."
                        icon={icon}
                    />
                    <Card 
                        title="Secure Data"
                        content="Build your online store’s trust using Social Proof & Urgency."
                        icon={icon}
                    />
                    <Card 
                        title="Retina Ready"
                        content="Realize importance of social proof in customer’s purchase decision."
                        icon={icon}
                    />
                </div>
            </main>
            <FooterHome/>
        </div>
    )
}