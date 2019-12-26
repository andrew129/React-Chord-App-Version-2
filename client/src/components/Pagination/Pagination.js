import React from 'react';

const Pagination = props => {
    console.log(props)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(props.totalChords / props.chordsPerPage); i++) {
        pageNumbers.push(i)
    }
    console.log(pageNumbers)
    return (
        <div class='ui borderless menu mb-5'>
            {pageNumbers.map(number => (
                <a onClick={() => props.paginate(number)} class='item'>{number}</a>
            ))}
        </div>
    )
}

export default Pagination;