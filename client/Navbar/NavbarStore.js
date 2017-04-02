import alt from '../alt';
import NavbarActions from './NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);
    this.totalCharacters = 0;
    this.onlineUsers = 0;
    this.searchQuery = '';
    this.ajaxAnimationClass = '';
    this.displayName = '';
    this.isLoggedIn = false;
  }

  onFindCharacterSuccess(payload) {
    payload.history.pushState(null, '/characters/' + payload.characterId);
  }

  onFindCharacterFail(payload) {
    payload.searchForm.classList.add('shake');
    setTimeout(() => {
      payload.searchForm.classList.remove('shake');
    }, 1000);
  }

  onUpdateOnlineUsers(data) {
    this.onlineUsers = data.onlineUsers;
  }

  onUpdateAjaxAnimation(className) {
    this.ajaxAnimationClass = className; //fadein or fadeout
  }

  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }

  onGetCharacterCountSuccess(data) {
    this.totalCharacters = data.count;
  }

  onGetCharacterCountFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onGetUserSuccess(data) {
    this.isLoggedIn = true;
    //console.log(data.local);
    this.displayName = data.local.displayName;
  }

  onGetUserFail(jqXhr) {
    console.log("get user request failed")
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(NavbarStore);
