import alt from '../alt';
import HomeActions from './HomeActions';

class HomeStore {
  constructor() {
    this.bindActions(HomeActions);
  }
}

export default alt.createStore(HomeStore);
