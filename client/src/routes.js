import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { UsersStatisticPage } from './pages/UsersStatisticPage'
import { UserPage } from './pages/UserPage'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/statistic" exact>
                <UsersStatisticPage/>
            </Route>
            <Route path="/statistic/:id">
                <UserPage/>
            </Route>
            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}