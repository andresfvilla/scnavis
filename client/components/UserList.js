import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import UserListStore from '../stores/UserListStore';
import UserListActions from '../actions/UserListActions';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = UserListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserListStore.listen(this.onChange);
    UserListActions.getUsers(this.props.params);
  }

  componentWillUnmount() {
    UserListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      UserListActions.getUsers(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let UsersList = this.state.users.map((user, index) => {
      return (
        <div key={use.displayName} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>
            <div className='pull-left thumb-lg'>
              // <Link to={'/users/' + user.id}>
              //   <img className='media-object' src={'http://image.eveonline.com/Character/' + character.characterId + '_128.jpg'} />
              // </Link>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <Link to={'/users/' + users.displayName}>{user.displayName}</Link>
              </h4>
              <br />
              <small>Wins: <strong>{user.wins}</strong> Losses: <strong>{user.losses}</strong></small>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {usersList}
        </div>
      </div>
    );
  }
}

export default UserList;
