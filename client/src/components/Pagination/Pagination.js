import React from 'react';

const Pagination = props => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(props.totalChords / props.chordsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div style={{background: '#a333c8', border: 'solid 2px black'}} className='ui borderless menu mb-5'>
            {pageNumbers.map(number => (
                <a href='#' style={{color: 'white'}} onClick={() => props.paginate(number)} className='item'>{number}</a>
            ))}
        </div>
    )
}

export default Pagination;