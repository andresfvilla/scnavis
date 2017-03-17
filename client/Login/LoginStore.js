import alt from '../alt';
import LoginActions from './LoginActions';

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

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.passwordValidationState = '';
    this.helpBlock = '';
  }

  onInvalidEmail() {
    this.emailValidationState = 'has-error';
    this.helpBlock = 'Please enter an email.';
  }

  onInvalidPassword() {
    this.passwordValidationState = 'has-error';
    this.helpBlock = 'Please enter a password.';
  }
}

export default alt.createStore(LoginStore);
