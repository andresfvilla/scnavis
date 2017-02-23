import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.email = '';
    this.password = '';
    this.helpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
  }

  onLoginSuccess(successMessage) {
    this.displayNameValidationState = 'has-success';
    this.helpBlock = successMessage;
  }

  onLoginFail(errorMessage) {
    this.displayNameValidationState = 'has-error';
    this.helpBlock = errorMessage;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
    this.emailValidationState = '';
    this.helpBlock = '';
  }

  onUpdateDisplayName(event) {
    this.displayName = event.target.value;
    this.displayNameValidationState = '';
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

  onInvalidEmail() {
    this.emailValidationState = 'has-error';
    this.helpBlock = 'Please enter an email.';
  }

  onInvalidDisplayName() {
    this.displayNameValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
  }

  onInvalidPassword() {
    this.passwordValidationState = 'has-error';
    this.helpBlock = 'Please enter a password.';
  }
}

export default alt.createStore(LoginStore);
