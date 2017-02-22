import alt from '../alt';

class SignupActions {
  constructor() {
    this.generateActions(
      'signupSuccess',
      'signupFail',
      'updateUsername',
      'updatePassword',
      'updateEmail',
      'updateRsiHandle',
      'invalidUsername',
      'invalidPassword',
      'invalidEmail',
      'invalidRsiHandle'
    );
  }

  addUser(username, password) {
    $.ajax({
      type: 'POST',
      url: '/api/signup',
      data: { username: username, password: password}
    })
      .done((data) => {
        this.actions.signupSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.signupFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(SignupActions);
