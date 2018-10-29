import React from 'react';
import './Pagination.css';
import propTypes from 'prop-types';

const Pagination = (props) => {
  const { page,perpage,total } = props;
return(
    <div className='Pagination'>
    <button className='Pagination-button' onClick={()=>page('prev')} disabled={perpage<=1}> Prev </button>
    <span> {perpage} of {total}</span>
    <button className='Pagination-button' onClick={()=>page('next')}  disabled={perpage>=total}> Next</button>
      </div>
)
}
Pagination.propTypes={
  page:propTypes.func.isRequired,
  perpage:propTypes.number.isRequired,
  total:propTypes.number.isRequired,
}
export default Pagination;