import alt from '../alt';
import SignupActions from '../actions/SignupActions';

class SignupStore {
  constructor() {
    this.bindActions(SignupActions);
    this.username = '';
    this.password = '';
    this.helpBlock = '';
    this.usernameValidationState = '';
    this.passwordValidationState = '';
  }

  onSignupSuccess(successMessage) {
    this.usernameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onSignupFail(errorMessage) {
    this.usernameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateUsername(event) {
    this.username = event.target.value;
    this.usernameValidationState = '';
    this.helpBlock = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.passwordValidationState = '';
    this.helpBlock = '';
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
    this.emailValidationState = '';
    this.helpBlock = '';
  }
  onUpdateRsiHandle(event) {
    this.rsiHandle = event.target.value;
    this.rsiHandleValidationState = '';
    this.helpBlock = '';
  }

  onInvalidUsername() {
    this.usernameValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
  }

  onInvalidPassword() {
    this.passwordValidationState = 'has-error';
    this.helpBlock = 'Please enter a password.';
  }
}

export default alt.createStore(SignupStore);
