import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import UserListStore from './UserListStore';
import UserListActions from './UserListActions';

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
    let usersList = this.state.users.map((user, index) => {
      return (
        <div key={user.local.displayName} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>
            <div className='pull-left thumb-lg'>
              <Link to={'/users/' + user._id}>
                <img className='media-object' src={'/api/profilepicture/' + user._id} />
              </Link>
            </div>
            <div className='media-body'>
              <h4 className='media-heading'>
                <Link to={'/users/' + user.local.displayName}>{user.local.displayName}</Link>
              </h4>
              <br />
              <small>Teams: <strong>{user.local.teams}</strong></small>
              <br />
              <small>Organizations: <strong>{user.local.organizations}</strong></small>
              <br />
              <small>Wins: <strong>{user.local.wins}</strong> Losses: <strong>{user.local.losses}</strong></small>
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
