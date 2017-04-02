import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import ProfileStore from './ProfileStore';
import ProfileActions from './ProfileActions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    ProfileActions.getProfile();

    $('.magnific-popup').magnificPopup({
      type: 'image',
      mainClass: 'mfp-zoom-in',
      closeOnContentClick: true,
      midClick: true,
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
    $(document.body).removeClass();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      ProfileActions.getProfile();
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <div className='profile-img'>
          <a ref='magnificPopup' className='magnific-popup' href={'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg'}>
            <img className='media-object' src={'/api/profilepicture/'+this.state.profilePicture} />
          </a>
        </div>
        <div className='profile-info clearfix'>
          <h2><strong>{this.state.displayName}</strong></h2>
          <h4 className='lead'>Organizations: <strong>{this.state.organizations}</strong></h4>
          <h4 className='lead'>Teams: <strong>{this.state.teams}</strong></h4>
          <h4 className='lead'>Kills: <strong>{this.state.kills}</strong></h4>
          <h4 className='lead'>Deaths: <strong>{this.state.deaths}</strong></h4>
        </div>
        <div className='profile-stats clearfix'>
          <ul>
            <li><span className='stats-number'>{this.state.winLossRatio}</span>Winning Percentage</li>
            <li><span className='stats-number'>{this.state.wins}</span> Wins</li>
            <li><span className='stats-number'>{this.state.losses}</span> Losses</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Profile;
