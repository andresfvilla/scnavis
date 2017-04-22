import alt from '../alt';
import superagent from 'superagent';


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

  uploadImage(image){
    var formData = new FormData()
    formData.append("avatar", image)
    $.ajax({
      type: 'POST',
      processData: false,
      contentType: false,
      url: '/api/image',
      data: formData
    })
      .done((data) => {
        console.log("done uploading image")
        console.log(data)
        this.actions.uploadImageSuccess(data);
      })
      .fail((jqXhr) => {
        console.log("done uploading image")
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
