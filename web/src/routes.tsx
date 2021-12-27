import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import CollectionMap from './pages/CollectionMap';
import CreateLocal from './pages/CreateLocal';
import Local from './pages/Local';
import Login from './pages/Login';

import UpdateLocal from './pages/UpdateLocal';


export default function Routes(){

     return (
            <BrowserRouter>
             <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/login" component={Login} />
                <Route path="/local/create" component={CreateLocal}/>

                <Route path="/local/:id" component={Local}/>
                <Route path="/app" component={CollectionMap}/>

                <Route path="/update/:id" component={UpdateLocal}/>
               
                
               
             </Switch>
            </ BrowserRouter>
    );
     }