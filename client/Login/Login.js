import React from 'react';
import LoginStore from './LoginStore';
import LoginActions from './LoginActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = LoginStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email.trim();
    var password = this.state.password.trim();

    if (!email || !password) {
      LoginActions.invalidLogin();
      //this.refs.nameTextField.getDOMNode().focus();
    }

    if (email && password) {
      console.log(email + " password:" +  password);
      LoginActions.login(email, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Login</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.emailValidationState}>
                    <label className='control-label'>Email</label>
                    <input type='text' className='form-control' ref='emailTextField' value={this.state.email}
                           onChange={LoginActions.updateEmail} autoFocus/>
                    <span className='help-block'>{this.state.helpBlock}</span>
                  </div>
                  <div className={'form-group ' + this.state.passwordValidationState}>
                    <label className='control-label'>Password</label>
                    <input type='password' className='form-control' ref='passwordTextField' value={this.state.password}
                           onChange={LoginActions.updatePassword} autoFocus/>
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

export default Login;
