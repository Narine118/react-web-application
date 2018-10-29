import React from 'react';

export const handleResponse = (response) =>{
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json);
        
      })
}

export const  handleChange = (percent) => {
  if(percent>0){
      return <div className='percent-raised'> {percent} &uarr;</div>
  } else if(percent<0){
      return <div  className='percent-fallen'> {percent} &darr;</div>
  } else {
      return <div> {percent} </div>
  }
 }