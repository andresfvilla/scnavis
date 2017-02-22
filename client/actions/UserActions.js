import alt from '../alt';

class CharacterActions {
  constructor() {
    this.generateActions(
      'reportSuccess',
      'reportFail',
      'getCharacterSuccess',
      'getCharacterFail'
    );
  }

  getCharacter(useId) {
    $.ajax({ url: '/api/users/' + characterId })
      .done((data) => {
        this.actions.getUserSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getUserFail(jqXhr);
      });
  }

  report(characterId) {
    $.ajax({
      type: 'POST',
      url: '/api/report',
      data: { characterId: characterId }
    })
      .done(() => {
        this.actions.reportSuccess();
      })
      .fail((jqXhr) => {
        this.actions.reportFail(jqXhr);
      });
  }
}

export default alt.createActions(CharacterActions);
