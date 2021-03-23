import React from 'react'
import './Pagination.scss'

export const Pagination = ({usersCount, currentPage, clickHandler, per_page}) => {

    const pagesCount = Math.ceil(usersCount/per_page)
    const arrayPages= [1,2,3,4,5]

    return (
        <div className="pagination_contain">
            <div className="pages">
                {arrayPages.map((page, index) => {
                return (
                    <span 
                        key={index}
                        className={currentPage == page ? "currentPage" : "page"}
                        onClick={clickHandler}
                        data-num={page}
                    >{page}
                    </span>
                 )}
                 )}
            </div>
        </div>
    )
}