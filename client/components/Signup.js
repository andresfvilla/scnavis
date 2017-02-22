import React from 'react';
import SignupStore from '../stores/SignupStore';
import SignupActions from '../actions/SignupActions';

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

    var username = this.state.username.trim();
    var password = this.state.password.trim();
    // var email = this.state.email.trim();
    // var rsiHandle = this.state.rsiHandle.trim();
    console.log('test');

    // if (!username || !password || !name || !email || !rsiHandle) {
    //   SignupActions.invalidSignup();
    //   //this.refs.nameTextField.getDOMNode().focus();
    // }

    //if (username && password && name && email && rsiHandle) {
    if (username && password) {
      SignupActions.addUser(username, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Signup</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.usernameValidationState}>
                    <label className='control-label'>Username</label>
                    <input type='text' className='form-control' ref='usernameTextField' value={this.state.username}
                           onChange={SignupActions.updateUsername} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='text' className='form-control' ref='passwordTextField' value={this.state.password}
                           onChange={SignupActions.updatePasword} autoFocus/>
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
