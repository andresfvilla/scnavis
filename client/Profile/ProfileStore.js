import {assign, contains} from 'underscore';
import alt from '../alt';
import ProfileActions from './ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this._id = 0;
    this.name = 'TBD';
    this.race = 'TBD';
    this.bloodline = 'TBD';
    this.gender = 'TBD';
    this.wins = 0;
    this.losses = 0;
    this.winLossRatio = 0;
    this.isReported = false;
  }

  onGetProfileSuccess(data) {
    assign(this, data);
    $(document.body).attr('class', 'profile ' + this.race.toLowerCase());
    let localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    let reports = localData.reports || [];
    this.isReported = contains(reports, this._id);
    this.winLossRatio = ((this.wins / (this.wins + this.losses) * 100) || 0).toFixed(1);
  }

  onGetProfileFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onReportSuccess() {
    this.isReported = true;
    let localData = localStorage.getItem('NEF') ? JSON.parse(localStorage.getItem('NEF')) : {};
    localData.reports = localData.reports || [];
    localData.reports.push(this._id);
    localStorage.setItem('NEF', JSON.stringify(localData));
    toastr.warning('Profile has been reported.');
  }

  onReportFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(ProfileStore);
