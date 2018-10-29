import React from 'react';
import Loading from '../loading/Loading';
import {API_URL} from '../conf';
import {handleResponse} from '../Helpers';
import {withRouter} from 'react-router-dom';
import './Search.css';

class Search extends React.Component{
    constructor(){
        super();
        this.state={
             searchQuery: [],
             searchResult:'',
             loading:false
        }

        this.handleChange=this.handleChange.bind(this);
        this.handleDirect=this.handleDirect.bind(this);
    }

   handleChange(event){
    const searchResult=event.target.value;
    this.setState({searchResult});
    if(!searchResult){
        return '';
    } 
    this.setState({loading:true})
    fetch(`${API_URL}/autocomplete?searchQuery=${searchResult}`)
    .then(handleResponse)
    .then((result) => {
        this.setState({
            searchQuery:result,
        })
  this.setState({loading:false})
    });
}
handleDirect(currencyId){
    this.setState({
        searchResult:'',
        searchQuery:[]
    });
    this.props.history.push(`/`);
    this.props.history.push(`currency/${currencyId}`);
}
   handleResults(){
       const {searchQuery,loading,searchResult} = this.state;
        if(!searchResult){
            return '';
        }
       if(searchQuery.length>0){
       return(
           <div className='Search-result-container'>
          
           {    
               searchQuery.map(result => (
               <div className='Search-result'
               key={result.id}
               onClick={()=> this.handleDirect(result.id)}
               > {result.name} ({result.symbol})    </div>
               ))     }
               </div>
                   )}
        if(!loading){
            return(
                <div className='Search-result-container'>
                <div className='Search-no-resul'> No serach results</div>
                </div> 
            )
        }
               
                
             
   }
    render (){
        const {loading,searchResult} = this.state;
        return (
               <div className='Search'>
                 <input 
                 className='Search-input'
                 type='text' 
                 placeholder='Search...' 
                 value={searchResult}
                 onChange={this.handleChange}/>
             {loading &&
                <div className='Search-loading'>
                <Loading  
                width='12px' 
                height='12px'/>
                    </div>
             }
             {this.handleResults()}
                    </div>

        )
    }
}

export default withRouter(Search) ;