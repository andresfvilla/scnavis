import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import EditProfileStore from './EditProfileStore';
import EditProfileActions from './EditProfileActions';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = EditProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    EditProfileStore.listen(this.onChange);
    EditProfileActions.getProfile();

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  componentWillUnmount() {
    EditProfileStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      EditProfileActions.getProfile();
    }
  }

  onChange(state) {
    this.setState(state);
  }

  handleGeneralSubmit(event) {
    event.preventDefault();

    var email = this.state.email.trim();
    var displayName = this.state.displayName.trim();

    if (email && displayName ) {

      var data = {};
      data.email = email
      data.displayName = displayName
      data.id = this.state.id
      EditProfileActions.updateProfile(data);
    }
  }

  handlePasswordSubmit(event) {
    event.preventDefault();

    const oldPassword = this.state.oldPassword;
    const newPassword = this.state.newPassword;

    if (oldPassword !== newPassword) {
      EditProfileActions.invalidEditProfile();
    }
  }

  handleTeamsSubmit(event) {
    event.preventDefault();

    var email = this.state.email.trim();
    var displayName = this.state.displayName.trim();

    var password = this.state.password.trim();

    if (!email || !displayName || !password) {
      EditProfileActions.invalidEditProfile();
    }

    if (email && displayName && password) {
      EditProfileActions.addUser(email, displayName, password);
    }
  }

  render() {
      return (
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8 col-md-offset-2'>
              <div className='panel panel-default'>
                <div className='panel-heading'>General Info</div>
                <div className='panel-body'>
                  <form onSubmit={this.handleGeneralSubmit.bind(this)}>
                    <div className={'form-group ' + this.state.emailValidationState}>
                      <label className='control-label'>Email</label>
                      <input type='text' className='form-control' ref='emailTextField' value={this.state.email}
                             onChange={EditProfileActions.updateEmail} autoFocus/>
                    </div>
                    <div className={'form-group ' + this.state.displayNameValidationState}>
                      <label className='control-label'>Display Name</label>
                      <input type='text' className='form-control' ref='displayNameTextField' value={this.state.displayName}
                             onChange={EditProfileActions.updateDisplayName} autoFocus/>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-8 col-md-offset-2'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Change Password</div>
                <div className='panel-body'>
                  <form onSubmit={this.handlePasswordSubmit.bind(this)}>
                    <div className={'form-group ' + this.state.displayNameValidationState}>
                      <label className='control-label'>Old Password</label>
                      <input type='password' className='form-control' ref='passwordTextField' value={this.state.password}
                             onChange={EditProfileActions.updateOldPassword} autoFocus/>
                    </div>
                    <div className={'form-group ' + this.state.passwordValidationState}>
                      <label className='control-label'>New Password</label>
                      <input type='password' className='form-control' ref='passwordTextField' value={this.state.password}
                             onChange={EditProfileActions.updateNewPassword} autoFocus/>
                    </div>
                    <div className={'form-group ' + this.state.passwordValidationState}>
                      <label className='control-label'>Confirm New Password</label>
                      <input type='password' className='form-control' ref='passwordTextField' value={this.state.password}
                             onChange={EditProfileActions.updateConfirmPassword} autoFocus/>
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

export default EditProfile;
