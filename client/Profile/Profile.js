import React from 'react';
import ProfileStore from './ProfileStore';
import ProfileActions from './ProfileActions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
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
//          <a ref='magnificPopup' className='magnific-popup' href={'https://image.eveonline.com/Character/' + this.state.characterId + '_1024.jpg'}>
// </a>

/*<div className='profile-img'>
  <img className='media-object' src={'/api/profilepicture/'} />
</div>
<div className='profile-info clearfix'>
  <h2><strong>{this.state.name}</strong></h2>
  <h4 className='lead'>Race: <strong>{this.state.race}</strong></h4>
  <h4 className='lead'>Bloodline: <strong>{this.state.bloodline}</strong></h4>
  <h4 className='lead'>Gender: <strong>{this.state.gender}</strong></h4>
  <button className='btn btn-transparent'
          onClick={ProfileActions.report.bind(this, this.state._id)}
          disabled={this.state.isReported}>
    {this.state.isReported ? 'Reported' : 'Report Profile'}
  </button>
</div>
<div className='profile-stats clearfix'>
  <ul>
    <li><span className='stats-number'>{this.state.winLossRatio}</span>Winning Percentage</li>
    <li><span className='stats-number'>{this.state.wins}</span> Wins</li>
    <li><span className='stats-number'>{this.state.losses}</span> Losses</li>
  </ul>
</div>*/

  render() {
    return (
      <div className='container'>
        <p>test</p>
      </div>
    );
  }
}

export default Profile;
