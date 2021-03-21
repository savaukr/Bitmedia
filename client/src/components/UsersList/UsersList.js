import React, {useEffect, useState, useCallback} from 'react'
import './UsersList.scss'
import {Loader} from '../Loader/Loader'
import {useHttp} from '../../hooks/http.hooks'
import {useMessage} from '../../hooks/message.hook'
import {UsersTable} from '../UsersTable/UsersTable'


export const UsersList = () => {
    const [users, setUsers] = useState([])
    const { request, error, clearError, loading } = useHttp()
    const message = useMessage()

    const getUsersOnPage =useCallback( async (page=1, per_page=50) => {
        try {
            const data = await request('/api/user', 'POST', {page, per_page})
            setUsers(data)
        } catch(e) {}
    }, [request])

    useEffect(() => {
        getUsersOnPage()        
    }, [getUsersOnPage]);

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]) 

    if (loading) return (
        <div className="usersList-container">
            <Loader />
        </div>
    )
    return (
        <div className="usersList-container">
            {!loading &&  <UsersTable  users= {users}/>}
        </div>
    )
}
