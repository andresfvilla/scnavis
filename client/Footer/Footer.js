import React from 'react';
import {Link} from 'react-router';
import FooterStore from './FooterStore'
import FooterActions from './FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    FooterActions.getTopCharacters();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-5'>
              <h3 className='lead'><strong>SCNAVIS</strong></h3>
              <p>Tournament organizer. Come challenge friends.</p>
              <p>what else should i put?</p>
              <p>© 2017 Andres Villa.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
