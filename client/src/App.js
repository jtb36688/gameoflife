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
      simulating: false,
      intervalId: null,
      currentGeneration: null
    };
  }

  startAnimation = () => {
    let nextstate = this.createFrame(); 
    let currentGeneration = 0 
    let intervalId = setInterval(() => {
      currentGeneration++
      this.setState({
        celldata: nextstate,
        currentGeneration
      }, () => {
        nextstate = this.createFrame();
      })
    }, 1000)
    this.setState({
      simulating: true,
      intervalId
    })
  }

  endAnimation = () => {
    clearInterval(this.state.intervalId)
    this.setState({
      simulating: false,
      intervalId: null
    })
  }

  createFrame = () => {
    let simulation = this.state.celldata.slice().map((cell, index) => {
      let neighborcount = 0;
      // Check and keep count of all neighbors to particular Cell.
      // index % 50 check is used to assure cells do not check next/prev
      // rows for neighbors.
      if (((index-1) % 50 !== 0) && (this.state.celldata[index - 51])) {
        // Upper Left Neighbor
        neighborcount++;
      }
      if (this.state.celldata[index - 50]) {
        // Upper Center Neighbor
        neighborcount++;
      }
      if ((index % 50 !== 0) && this.state.celldata[index - 49]) {
        // Upper Right Neighbor
        neighborcount++;
      }
      if (((index-1) % 50 !== 0) && this.state.celldata[index - 1]) {
        // Left Neighbor
        neighborcount++;
      }
      if (((index === 0) || ((index % 50 !== 0))) && this.state.celldata[index + 1]) {
        // Right Neighbor
        neighborcount++;
      }
      if (((index-1) % 50 !== 0) && this.state.celldata[index + 49]) {
        // Lower Left Neighbor
        neighborcount++;
      }
      if (this.state.celldata[index + 50]) {
        // Lower Center Neighbor
        neighborcount++;
      }
      if ((index % 50 !== 0) && this.state.celldata[index + 51]) {
        // Lower Right Neighbor
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
    return simulation;
  };

  cellStyling = i => {
    if (this.state.celldata[i]) {
      return "Cell LiveCell";
    } else {
      return "Cell";
    }
  };

  clickCell = i => {
    if (!this.state.simulating) {
      console.log(`Cell ${i}`);
      const changedstate = this.state.celldata.slice();
      changedstate[i] = !changedstate[i];
      this.setState({
        celldata: changedstate
      });
  }
  };

  clearGrid = () => {
    if (!this.state.simulating) {
      this.setState({
        celldata
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="InfoRow">
          {!!this.state.currentGeneration ?
          (`Generation ${this.state.currentGeneration}`) :
          ("Click cells below or select a preset and start the simulation!")}
        </div>
        <Grid cellstyling={this.cellStyling} onClick={this.clickCell} />
        <div classname="ButtonRow">
          {!!this.state.simulating ? (<Button
            onClick={this.endAnimation}
          >
            Stop Simulation
          </Button>) : (<Button
            onClick={this.startAnimation}
          >
            Start Simulation
          </Button>)}
          
          <Button onClick={this.clearGrid}>
            Clear Grid
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
