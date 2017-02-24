import React from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
