import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './header/Header';
import List from './list/List';
import Details from './list/details/Details';
import NotFound from './list/notFound/NotFound';
import { BrowserRouter, Route,Switch } from 'react-router-dom';

ReactDOM.render(

<BrowserRouter>
<div>
<Header />
<Switch>
<Route path='/' component={List} exact/>
<Route path='/currency/:id' component={Details} exact/>
<Route component={NotFound} exact/>
</Switch>
</div>
</BrowserRouter>
, 
document.getElementById('root'));


