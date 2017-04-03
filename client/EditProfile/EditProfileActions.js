import alt from '../alt';

class EditProfileActions {
  constructor() {
    this.generateActions(
      'getProfileSuccess',
      'getProfileFail',
      'updateDisplayName',
      'updateOldPassword',
      'updateNewPassword',
      'updateEmail',
      'loginSuccess',
      'loginFail'
    );
  }

  updateProfile(profileData) {
    $.ajax({
      type: 'PUT',
      url: '/api/profile/' + profileData.id,
      data: profileData
    })
      .done((data) => {
        this.actions.loginSuccess(data.message);
      })
      .fail((jqXhr) => {
        this.actions.loginFail(jqXhr.responseJSON.message);
      });
  }

  getProfile() {
    $.ajax({ url: '/api/profile'})
      .done((data) => {
        this.actions.getProfileSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getProfileFail(jqXhr);
      })
  }
}

export default alt.createActions(EditProfileActions);
