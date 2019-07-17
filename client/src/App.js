import React from "react";
import "./Reset.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "./components/Grid";
import celldata from "./defaultdata.js";
import {
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      celldata,
      rewind: null,
      simulating: false,
      intervalId: null,
      currentGeneration: 0,
      frameNum: "",
      ffError: false,
      simSpeed: "1000"
    };
  }

  startAnimation = () => {
    let rewind = this.state.celldata.slice();
    let nextstate = this.createFrame(this.state.celldata);
    this.setState({
      rewind
    });
    let intervalId = setInterval(() => {
      this.setState(
        currentState => ({
          celldata: nextstate,
          currentGeneration: ++currentState.currentGeneration
        }),
        () => {
          nextstate = this.createFrame(this.state.celldata);
        }
      );
    }, parseInt(this.state.simSpeed, 10));
    this.setState({
      simulating: true,
      intervalId
    });
  };

  endAnimation = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      simulating: false,
      intervalId: null
    });
  };

  createFrame = datasource => {
    let simulation = datasource.map((cell, index) => {
      let neighborcount = 0;
      // Check and keep count of all neighbors to particular Cell.
      // index % 50 check is used to assure cells do not check next/prev
      // rows for neighbors.
      if ((index - 1) % 50 !== 0 && datasource[index - 51]) {
        // Upper Left Neighbor
        neighborcount++;
      }
      if (datasource[index - 50]) {
        // Upper Center Neighbor
        neighborcount++;
      }
      if (index % 50 !== 0 && datasource[index - 49]) {
        // Upper Right Neighbor
        neighborcount++;
      }
      if ((index - 1) % 50 !== 0 && datasource[index - 1]) {
        // Left Neighbor
        neighborcount++;
      }
      if ((index === 0 || index % 50 !== 0) && datasource[index + 1]) {
        // Right Neighbor
        neighborcount++;
      }
      if ((index - 1) % 50 !== 0 && datasource[index + 49]) {
        // Lower Left Neighbor
        neighborcount++;
      }
      if (datasource[index + 50]) {
        // Lower Center Neighbor
        neighborcount++;
      }
      if (index % 50 !== 0 && datasource[index + 51]) {
        // Lower Right Neighbor
        neighborcount++;
      }
      if (datasource[index]) {
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

  fastForwardGrid = () => {
    if (/^\d+$/.test(this.state.frameNum)) {
      let frameNum = parseInt(this.state.frameNum, 10);
      let nextstate = this.state.celldata.slice();
      if (this.state.currentGeneration === 0) { 
        let rewind = this.state.celldata.slice();
        this.setState({
          rewind
        });
      }
      for (let i = 1; i <= frameNum; i++) {
        nextstate = this.createFrame(nextstate);
      }
      this.setState(currentState => ({
        celldata: nextstate,
        currentGeneration: currentState.currentGeneration + frameNum
      }));
      this.setState({
        ffError: false,
        frameNum: ""
      });
    } else {
      this.setState({
        ffError: true,
        frameNum: ""
      });
    }
  };

  rewindGrid = () => {
    this.setState(currentState => ({
      celldata: currentState.rewind,
      currentGeneration: 0
    }), () => {
      this.setState({
        rewind: null
      })
    })
  }

  cellStyling = i => {
    if (this.state.celldata[i]) {
      return "Cell LiveCell";
    } else {
      return "Cell";
    }
  };

  clickCell = i => {
    if (!this.state.simulating) {
      if (this.state.currentGeneration) {
        this.setState({
          currentGeneration: 0
        });
      }
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
        celldata,
        currentGeneration: 0
      });
    }
  };

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div className="App">
        <div className="InfoRow">
          {!!this.state.currentGeneration
            ? `Generation ${this.state.currentGeneration}`
            : "Click cells below or select a preset and start the simulation!"}
        </div>
        <Grid cellstyling={this.cellStyling} onClick={this.clickCell} />
        <div className="ButtonRow">
          {!!this.state.simulating ? (
            <Button onClick={this.endAnimation}>Stop Simulation</Button>
          ) : (
            <Button onClick={this.startAnimation}>Start Simulation</Button>
          )}
        </div>
        {!this.state.simulating && (
          <div className="ButtonRow2">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <Button onClick={this.fastForwardGrid}>Fast Forward</Button>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                className="FastForwardInput"
                placeholder="Number of Generations..."
                name="frameNum"
                value={this.state.frameNum}
                onChange={this.handleChanges}
              />
            </InputGroup>
            <Button onClick={this.clearGrid}>Clear Grid</Button>
            <Button onClick={this.rewindGrid}>Rewind to Generation 0</Button>
            <div className="SpeedSelectorContainer">
              <div>
                <input className="SpeedSelector" type="radio" id="1x" name="simSpeed" value="1000" onChange={this.handleChanges} checked={this.state.simSpeed === '1000'}/>
                <label for="1x">1x</label>
              </div>
              <div>
                <input className="SpeedSelector" type="radio" id="2x" name="simSpeed" value="500" onChange={this.handleChanges} checked={this.state.simSpeed === '500'}/>
                <label for="2x">2x</label>
              </div>
              <div>
                <input className="SpeedSelector" type="radio" id="5x" name="simSpeed" value="200" onChange={this.handleChanges} checked={this.state.simSpeed === '200'}/>
                <label for="5x">5x</label>
              </div>
              <div>
                <input className="SpeedSelector" type="radio" id="10x" name="simSpeed" value="100" onChange={this.handleChanges} checked={this.state.simSpeed === '100'}/>
                <label for="10x">10x</label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
