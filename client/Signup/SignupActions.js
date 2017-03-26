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
      'invalidSignup',
    );
  }

  addUser(email, displayName, password) {
    $.ajax({
      type: 'POST',
      url: '/api/signup',
      data: { email: email, displayName:displayName, password: password}
    })
      .done((data) => {
        console.log("success signup")
        window.location.replace("/");
        this.actions.signupSuccess(data.message);
      })
      .fail((jqXhr) => {
        console.log("failed signup")
        this.actions.signupFail(jqXhr.responseJSON.message);
      });
  }
}

export default alt.createActions(SignupActions);
