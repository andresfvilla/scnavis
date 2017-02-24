import alt from '../alt';

class UserListActions {
  constructor() {
    this.generateActions(
      'getUsersSuccess',
      'getUsersFail'
    );
  }

  getUsers(payload) {
    let url = '/api/users';
    let params = {
    };
    $.ajax({ url: url, data: params })
      .done((data) => {
        this.actions.getUsersSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getUsersFail(jqXhr);
      });
  }
}

export default alt.createActions(UserListActions);
