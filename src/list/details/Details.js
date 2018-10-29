import React from 'react';
import Loading from '../../loading/Loading';
import {API_URL} from '../../conf';
import {handleResponse,handleChange} from '../../Helpers';
import './Details.css';

class Details  extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currency:{},
            loading:true,
            error:null
        }
    }
  componentDidMount(){
      const currencyId=this.props.match.params.id;
      this.fetchData(currencyId);
  }
  componentWillReceiveProps(nextProps){
      if(this.props.location.pathname !== nextProps.location.pathname ){
          const newCurrencyId = nextProps.match.params.id;
          this.fetchData(newCurrencyId);
      }
     
  }
  fetchData(currencyId){
    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
    .then(handleResponse)
    .then((data) => {
        this.setState({
           currency:data,
            loading:false ,
            error:null
        });
      console.log('Success', data);

    })
    .catch((error) => {
        this.setState({
           error:error.errorMessage,
           loading:false
        });
      console.log('Error', error);
    });
  }
    render() {
        const {loading,error,currency} = this.state;
        // render only loading component
        if (loading) {
            return <div className='Loading-container'><Loading /> </div>
        }
        // render error when error accured
        if(error){
            return <div  >{error} </div>  
        }
       
        return(
        <div className='Detail'>
        <h1 className='Detail-heading '>{currency.name} ({currency.symbol})
        </h1>
        <div className='Detail-container'>
        <div className='Detail-item'>Price
        <span className='Detail-value'> $ {currency.price}  </span>
        </div>
        <div className='Detail-item'>Rank
        <span className='Detail-value'> $ {currency.rank}  </span>
        </div> 
        <div className='Detail-item'>Change24h
        <span className='Detail-value' >  {handleChange(currency.percentChange24h)}  </span>
        </div> 
        <div className='Detail-item'>Market Cap
        <span className='Detail-value'> $ {currency.marketCap}  </span>
        </div> 
         </div>
         </div>
        )
    };
}

export default Details;