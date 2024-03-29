import {assign, contains} from 'underscore';
import alt from '../alt';
import ProfileActions from './ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.id = 0;
    this.displayName = 'TBD';
    this.deaths = 'TBD';
    this.kills = 'TBD';
    this.losses = 0;
    this.organization = [];
    this.winLossRatio = 0;
    this.profilePicture = '/api/profilePicture';
  }

  onGetProfileSuccess(data) {
    assign(this, data.local);
    this.id = data._id
    // let localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    // let reports = localData.reports || [];
    // this.isReported = contains(reports, this._id);
    // this.winLossRatio = ((this.wins / (this.wins + this.losses) * 100) || 0).toFixed(1);
  }

  onGetProfileFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileStore);
