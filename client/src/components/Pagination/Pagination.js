import React from 'react';

const Pagination = props => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(props.totalChords / props.chordsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div style={{background: '#a333c8'}} className='ui borderless menu mb-5'>
            {pageNumbers.map(number => (
                <a style={{color: 'white'}} onClick={() => props.paginate(number)} class='item'>{number}</a>
            ))}
        </div>
    )
}

export default Pagination;