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

  uploadImage(file){
    superagent.post('/api/image')
      .attach('avatar', file)
      .end((err, res) => {
        if (err) console.log(err);
        console.log(res);
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
