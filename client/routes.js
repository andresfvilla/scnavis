import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import AddCharacter from './components/AddCharacter';
import Signup from './components/Signup'
import NotFoundPage from './components/NotFoundPage';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/stats' component={Stats} />
    <Route path='/shame' component={CharacterList} />
    <Route path='/add' component={AddCharacter} />
    <Route path='/signup' component={Signup} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
