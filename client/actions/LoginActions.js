import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'updateDisplayName',
      'updatePassword',
      'updateEmail',
      'invalidDisplayName',
      'invalidPassword',
      'invalidEmail',
    );
  }

  addUser(email, displayName, password) {
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: { email: email, password: password}
    })
      .done((data) => {
        this.actions.loginSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(LoginActions);
