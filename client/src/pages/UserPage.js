import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import {Header} from '../components/Header/Header'
import './UserPage.scss'

export const UserPage = () => {

    const id = useParams().id

    useEffect(()=>{
        console.log('id=', id)
    },[])

    return (
        <div className="user_container">
           <Header />
            <section>
                <div >
                    <a href="/">Main page > </a>
                    <a href="/statistic">User statistic > </a>
                    <span>Samuel Frost</span>
                </div>
                <h3>Samuel Frost</h3>
            </section>
            <Footer />
        </div>
    )
}