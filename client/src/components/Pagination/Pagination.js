import React from 'react'
import './Pagination.scss'

export const Pagination = ({usersCount, currentPage, clickHandler, per_page}) => {

    const pagesCount = Math.ceil(usersCount/per_page)
      
    const createArrayPages = (currentPage, pagesCount ) => {
    	let arr = []
    	const paginationCount = (pagesCount < 6) ? pagesCount : 6
    	const halfPgCnt = Math.ceil(paginationCount/2)

    	if (currentPage > halfPgCnt && currentPage < pagesCount-halfPgCnt)  {
			for (let i=currentPage-halfPgCnt; i <= +currentPage+halfPgCnt; i++) {
				arr.push(i)
			}
			
    	} else {
			if ( currentPage >= pagesCount-paginationCount  ) {
				for (let i=pagesCount-paginationCount; i <= pagesCount; i++) {
					arr.push(i)
				}
			} else  {
				for (let i=1; i <= paginationCount; i++) {
					arr.push(i)
				}
			}
		}
		return arr
	}


    let arrayPages = createArrayPages(currentPage, pagesCount)

/*
    function scrollDown() {
		    var windowCoords = document.documentElement.clientHeight;
		    (function scroll() {
		      if (window.pageYOffset < windowCoords) {
		        window.scrollBy(0, 10);
		        setTimeout(scroll, 0);
		      }
		      if (window.pageYOffset > windowCoords) {
		        window.scrollTo(0, 896*3);
		      }
		 	})();
  	}
    
    useEffect(() => {
    	scrollDown()
    }, [currentPage])

  */

    
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