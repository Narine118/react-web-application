import React from 'react';
import './NotFound.css';
import {Link} from 'react-router-dom';

const Notfound =() =>{
return(
    <div className='NotFound'>
        <h2 className='NotFound-title'>Page not found </h2>
        <Link  className='NotFound-link' to='/'> Go to home page</Link>
    </div>
)
}
export default Notfound;