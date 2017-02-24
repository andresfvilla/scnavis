import React from 'react';
import {Link} from 'react-router';
import HomeStore from './HomeStore'
import HomeActions from './HomeActions';
import {first, without, findWhere} from 'underscore';

var LogoStars = '../img/logo_stars.png';


class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <h3 className='text-center'>SCNAVIS.</h3>
        <img className='center-block' width="80%" height="auto"  src={LogoStars} />
      </div>
    );
  }
}

export default Home;
