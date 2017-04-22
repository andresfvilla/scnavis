import {assign, contains} from 'underscore';
import alt from '../alt';
import EditProfileActions from './EditProfileActions';

class EditProfileStore {
  constructor() {
    this.bindActions(EditProfileActions);
    this.id = 0;
    this.email = '';
    this.displayName = '';
    this.profilePicture = '';
    this.organization = [];
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.uploadedFile = []
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
  }

  onUpdateDisplayName(event) {
    this.displayName = event.target.value;
  }

  onUpdateOldPassword(event) {
    this.oldPassword = event.target.value;
  }

  onUpdateNewPassword(event) {
    this.newPassword = event.target.value;
  }

  onUpdateConfirmPassword(event) {
    this.confirmPassword = event.target.value;
  }

  onGetProfileSuccess(data) {
    this.email = data.local.email
    this.displayName = data.local.displayName
    this.profilePicture = data.local.profilePicture
    this.organization = data.local.organization;
    this.id = data._id
  }

  onGetProfileFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onUpdateProfileSuccess(data){
    this.email = data.local.email
    this.displayName = data.local.displayName
    this.profilePicture = data.local.profilePicture
    this.organization = data.local.organization;
    this.id = data._id
    window.location.reload()
  }

  onUpdateProfileFail(jqXhr){
    console.log('testing the fail');
  }

  onUploadImageSuccess(data){
    console.log("testing")
    window.location.reload()
    //EditProfileActions.updateProfile(data);
  }

  onUploadImageFail(jqXhr){
    console.log('testing the fail');
  }

}

export default alt.createStore(EditProfileStore);
