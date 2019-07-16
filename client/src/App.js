import React from 'react';
import './Reset.css';
import './App.css';
import Grid from './components/Grid';
import celldata from './defaultdata.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    celldata
    }
  }

  cellstyling = (i) => {
    if (this.state.celldata[i]) {
      return "Cell LiveCell"
    } else {
      return "Cell"
    }
  }

  clickcell = (i) => {
    const changedstate = this.state.celldata.slice()
    changedstate[i] = !changedstate[i]
    this.setState({
      celldata: changedstate
    })
  }

  render() {  
    return (
      <div className="App">
          <Grid cellstyling={this.cellstyling} onClick={this.clickcell} />
      </div>
    );
}
}

export default App;
