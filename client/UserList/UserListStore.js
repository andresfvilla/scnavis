import alt from '../alt';
import UserListActions from './UserListActions';

class UserListStore {
  constructor() {
    this.bindActions(UserListActions);
    this.users = [];
  }

  onGetUsersSuccess(data) {
    this.users = data;
  }

  onGetUsersFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(UserListStore);
