import alt from '../alt';

class ProfileActions {
  constructor() {
    this.generateActions(
      'reportSuccess',
      'reportFail',
      'getProfileSuccess',
      'getProfileFail'
    );
  }

  getProfile() {
    $.ajax({ url: '/api/profile'})
      .done((data) => {
        console.log(data)
        this.actions.getProfileSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getProfileFail(jqXhr);
      });
  }
}

export default alt.createActions(ProfileActions);
