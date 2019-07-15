import React from 'react';
import './Reset.css';
import './App.css';
import Grid from './components/Grid';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  clickcell = (i) => {
    console.log(`Cell ${i} clicked`)
  }

  render() {  
    return (
      <div className="App">
          <Grid onClick={this.clickcell} />
      </div>
    );
}
}

export default App;
