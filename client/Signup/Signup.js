import React from 'react';
import SignupStore from './SignupStore';
import SignupActions from './SignupActions';
import {Router, browserHistory} from 'react-router';


class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email.trim();
    var displayName = this.state.displayName.trim();
    var password = this.state.password.trim();

    if (!email || !displayName || !password) {
      SignupActions.invalidSignup();
      //this.refs.nameTextField.getDOMNode().focus();
    }

    if (email && displayName && password) {
      SignupActions.addUser(email, displayName, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 col-md-offset-2'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Signup</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.emailValidationState}>
                    <label className='control-label'>Email</label>
                    <input type='text' className='form-control' ref='emailTextField' value={this.state.email}
                           onChange={SignupActions.updateEmail} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.displayNameValidationState}>
                    <label className='control-label'>Display Name (This will be the name that is displayed on SCNAVIS)</label>
                    <input type='text' className='form-control' ref='displayNameTextField' value={this.state.displayName}
                           onChange={SignupActions.updateDisplayName} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='password' className='form-control' ref='passwordTextField' value={this.state.password}
                           onChange={SignupActions.updatePassword} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
