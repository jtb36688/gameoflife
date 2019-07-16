import React from "react";
import "./Reset.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "./components/Grid";
import celldata from "./defaultdata.js";
import { Button } from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      celldata,
      simulating: false
    };
  }

  startsimulation = () => {
    console.log(101 % 50)
    let nextstate = this.state.celldata.slice().map((cell, index) => {
      let neighborcount = 0;
      // Check and keep count of all neighbors to particular Cell.
      if (this.state.celldata[index - 51]) {
        neighborcount++;
      }
      if (this.state.celldata[index - 50]) {
        neighborcount++;
      }
      if (this.state.celldata[index - 49]) {
        neighborcount++;
      }
      if (this.state.celldata[index - 1]) {
        neighborcount++;
      }
      if (this.state.celldata[index + 1]) {
        neighborcount++;
      }
      if (this.state.celldata[index + 49]) {
        neighborcount++;
      }
      if (this.state.celldata[index + 50]) {
        neighborcount++;
      }
      if (this.state.celldata[index + 51]) {
        neighborcount++;
      }
      if (this.state.celldata[index]) {
        if (neighborcount < 2 || neighborcount > 3) {
          // Any live cell with fewer than two live neighbours dies.
          // Any live cell with more than three live neighbours dies.
          return false;
        } else {
          // Any live cell with two or three live neighbours lives.
          return true;
        }
      } else {
        // Any dead cell with exactly three live neighbours will come to life.
        if (neighborcount === 3) {
          return true;
        } else {
          return false;
        }
      }
    });
    this.setState({ celldata: nextstate });
  };

  cellstyling = i => {
    if (this.state.celldata[i]) {
      return "Cell LiveCell";
    } else {
      return "Cell";
    }
  };

  clickcell = i => {
    console.log(`Cell ${i}`);
    const changedstate = this.state.celldata.slice();
    changedstate[i] = !changedstate[i];
    this.setState({
      celldata: changedstate
    });
  };

  render() {
    return (
      <div className="App">
        <Grid cellstyling={this.cellstyling} onClick={this.clickcell} />
        <Button
          onClick={this.startsimulation}
        >
          Start Simulation
        </Button>
      </div>
    );
  }
}

export default App;
