import React from 'react';
import './Reset.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from './components/Grid';
import celldata from './defaultdata.js'
import { Button } from 'reactstrap';

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
        <Button onClick={() => {console.log("Simulation started")}}>Start Simulation</Button>
      </div>
    );
}
}

export default App;
