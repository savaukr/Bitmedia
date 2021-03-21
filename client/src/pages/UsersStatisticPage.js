import React from 'react'
import './UsersStatisticPage.scss'

import {Header} from '../components/Header/Header'
import {Footer} from '../components/Footer/Footer'
import {UsersList} from '../components/UsersList/UsersList'

export const UsersStatisticPage = () => {    
    
    return (
        <div className="statistic_container">
                <Header />
                <section>
                    <div className="navig">
                        <a href="/">Main page > </a><span>User statistic</span>
                    </div>
                    <h5>Users Statistics</h5>
                    <UsersList />
                </section>
               
                <Footer />
        </div>
    )
}