import React from 'react'
import {useHistory} from 'react-router-dom'
import './UsersTable.scss'

export const UsersTable = ({users}) => {
    const history = useHistory()
    if (!users.length) {
        return <p className= "center">Користувачів по немає</p>
    }
    const userClick = (event) => {
        const id = event.currentTarget.dataset.id;
        console.log('current:', event.currentTarget.dataset.id)  
        history.push(`/statistic/${id}`)  
    }

    return (
        <table className="striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Ip address</th>
                    <th>Total clicks</th>
                    <th>Total page views</th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => {
                    return (
                        <tr 
                            key={user.id}
                            data-id={user.id}
                            onClick={userClick}
                        >
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.gender}</td>
                            <td>{user.ip_address}</td>
                            <td>{user.total_clicks}</td>
                            <td>{user.total_page_views}</td>
                        </tr>
                
                    )
                })}
                
            </tbody>
        </table>
    )
}
