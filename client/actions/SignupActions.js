import alt from '../alt';

class SignupActions {
  constructor() {
    this.generateActions(
      'signupSuccess',
      'signupFail',
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
      url: '/api/signup',
      data: { email: email, displayName:displayName, password: password}
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
