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
      'updateProfileSuccess',
      'updateProfileFail',
      'uploadImageSuccess',
      'uploadImageFail'
    );
  }

  uploadImage(file){
    $.ajax({
      type: 'POST',
      url: '/api/image',
      data: file.value
    })
      .done((data) => {
        this.actions.uploadImageSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.uploadImageFail(jqXhr.responseJSON.message);
      });
  }

  updateProfile(profileData) {
    $.ajax({
      type: 'PUT',
      url: '/api/profile/' + profileData.id,
      data: profileData
    })
      .done((data) => {
        this.actions.updateProfileSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.updateProfileFail(jqXhr.responseJSON.message);
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
