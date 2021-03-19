import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { UserListPage } from './pages/UserListPage'
import { UserPage } from './pages/UserPage'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <HomePage />
            </Route>
            <Route path="/list" exact>
                <UserListPage/>
            </Route>
            <Route path="/list/:id">
                <UserPage/>
            </Route>
            <Route>
                <Redirect to="/" />
            </Route>
        </Switch>
    )
}