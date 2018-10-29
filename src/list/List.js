import React from 'react';
import Loading from '../loading/Loading';
import Table from '../table/Table';
import Pagination from '../pagination/Pagination';
import {API_URL} from '../conf';
import {handleResponse,handleChange} from '../Helpers';

class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:true,
            error:null,
            currencies:[],
            page:1,
            totalPage:0
        }
        this.pagination=this.pagination.bind(this);
    }
    componentDidMount(){
       this.fetchCurrencies();
    }
   fetchCurrencies(){
         this.setState({
            loading:true
        });
      const { page,totalPage } = this.state;
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            this.setState({
                currencies:data.currencies,
                totalPage:data.totalPages,
                loading:false 
            });
          console.log('Success', data.totalPages);
 
        })
        .catch((error) => {
            this.setState({
               error:error.errorMessage
            });
          console.log('Error', error);
        });
    }

//  pagination
pagination(direction){
    const {page} = this.state;
  let nextPage = page;
  if(direction == 'next'){
    nextPage ++;
  }else {
     nextPage --;
  }
  this.setState({ page : nextPage },()=>{ this.fetchCurrencies()});
 
}
    render() {
   const { loading, currencies, error,page,totalPage } = this.state;
//    loading
     if(loading){
        return <div className='loading-container'>  <Loading /> </div>
     }
    //  error
    if(error) {
        return <div> {error} </div>
    }
     return (
         <div>
        <Table currencies={currencies}  />
        <Pagination page={this.pagination} perpage={page} total={totalPage}/>
        </div>
        )
         
  }
}
  export default List;