import alt from '../alt';

class ProfileActions {
  constructor() {
    this.generateActions(
      'getProfileSuccess',
      'getProfileFail'
    );
  }

  getProfile() {
    $.ajax({ url: '/api/profile'})
      .done((data) => {
        this.actions.getProfileSuccess(data);
      })
      .fail((jqXhr) => {
        window.location.replace("/");
        this.actions.getProfileFail(jqXhr);
      })
  }
}

export default alt.createActions(ProfileActions);
