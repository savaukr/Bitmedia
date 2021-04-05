import React, {useEffect, useState, useCallback} from 'react'
import './UsersList.scss'
import {Loader} from '../Loader/Loader'
import {useHttp} from '../../hooks/http.hooks'
import {useMessage} from '../../hooks/message.hook'
import {UsersTable} from '../UsersTable/UsersTable'
import {Pagination} from '../Pagination/Pagination'


export const UsersList = () => {
    const PER_PAGE = 50
    const [usersCount, setUsersCount] = useState(0)
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const { request, error, clearError, loading } = useHttp()
    const message = useMessage()

    const getUsersCount = useCallback(async () => {
        try {
           const usersCount = await request('api/user/count', 'POST')
           setUsersCount(usersCount)
        }catch(e) {

        }
    })

    const getUsersOnPage = useCallback( async (page=1, per_page=PER_PAGE) => {
        try {
            const data = await request('/api/user', 'POST', {page, per_page})
            setUsers(data)
        } catch(e) {}
    }, [request])

    


    useEffect(()=>{
        getUsersCount()
    },[])

    useEffect(() => {
        getUsersOnPage(currentPage)        
    }, [getUsersOnPage, currentPage]);

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError]) 

    

    const clickHandler = (event) => {
        setCurrentPage(event.target.dataset.num)
    }

    if (loading) return (
        <div className="usersList-container">
            <Loader />
        </div>
    )

    return (
        <div className="usersList-container">
            {!loading &&  <UsersTable  users= {users}/>}
            {!loading && <Pagination 
                            usersCount={usersCount}
                            currentPage={currentPage}
                            clickHandler={clickHandler}
                            per_page ={PER_PAGE}
                         />}
        </div>
    )
}
