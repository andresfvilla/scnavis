import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats';
import Character from './components/Character';
import CharacterList from './components/CharacterList';
import UserList from './components/UserList';
import AddCharacter from './components/AddCharacter';
import Signup from './components/Signup'
import NotFoundPage from './components/NotFoundPage';

export default (
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path='/' component={Home} />
      <Route path='/stats' component={Stats} />
      <Route path='/shame' component={CharacterList} />
      <Route path='/characters/:id' component={Character} />
      <Route path='/users' component={UserList} />
      <Route path='/add' component={AddCharacter} />
      <Route path='/signup' component={Signup} />
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Router>
);
