import React from "react";
import "./Reset.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Grid from "./components/Grid";
import {cellData, gosperGun, flower, eureka, gliderDiamond, shuttle, fireworks} from "./defaultdata.js"
import {
  Button
} from "reactstrap";
import Conway from "./Conway.jpg"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellData,
      rewind: null,
      simulating: false,
      intervalId: null,
      currentGeneration: 0,
      frameNum: "",
      ffError: false,
      simSpeed: "200",
      preset: null
    };
  }

  startAnimation = () => {
    if (this.state.currentGeneration == 0) {
      let rewind = this.state.cellData.slice();
      let consolearray = []
      rewind.forEach((cell, index) => {
        if (cell) {
          consolearray.push(index+1)
        }
      })
      console.log(consolearray)
      this.setState({
        rewind
      });
    }
    let nextstate = this.createFrame(this.state.cellData);
    let intervalId = setInterval(() => {
      this.setState(
        currentState => ({
          cellData: nextstate,
          currentGeneration: ++currentState.currentGeneration
        }),
        () => {
          nextstate = this.createFrame(this.state.cellData);
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
      let nextstate = this.state.cellData.slice();
      if (this.state.currentGeneration === 0) { 
        let rewind = this.state.cellData.slice();
        this.setState({
          rewind
        });
      }
      for (let i = 1; i <= frameNum; i++) {
        nextstate = this.createFrame(nextstate);
      }
      this.setState(currentState => ({
        cellData: nextstate,
        currentGeneration: currentState.currentGeneration + frameNum
      }));
      this.setState({
        ffError: false
      });
    } else {
      this.setState({
        ffError: true
      });
    }
  };

  rewindGrid = () => {
    if (this.state.simulating) {
      clearInterval(this.state.intervalId);
    }
    const rewind = this.state.rewind.slice();
    this.setState({
      cellData: rewind,
      currentGeneration: 0
    }, () => {
      if (this.state.simulating) {
        this.startAnimation()
      }
    })
  }

  cellStyling = i => {
    if (this.state.cellData[i]) {
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
      const changedstate = this.state.cellData.slice();
      changedstate[i] = !changedstate[i];
      this.setState({
        cellData: changedstate
      });
    }
  };

  clearGrid = () => {
    if (!this.state.simulating) {
      this.setState({
        cellData,
        currentGeneration: 0
      });
    }
  };

  handleChanges = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.preset)
  };

  submitPreset = e => {
    e.preventDefault()
    if (this.state.preset === "cellData") {
      this.setState({
        cellData,
        currentGeneration: 0
      })
    }
    if (this.state.preset === "shuttle") {
      this.setState({
        cellData: shuttle,
        currentGeneration: 0
      })
    }
    if (this.state.preset === "fireworks") {
      this.setState({
        cellData: fireworks,
        currentGeneration: 0
      })
    }
    if (this.state.preset === "gosperGun") {
      this.setState({
        cellData: gosperGun,
        currentGeneration: 0
      })
    }
    if (this.state.preset == "eureka") {
      this.setState({
        cellData: eureka,
        currentGeneration: 0
      })
    }
    if (this.state.preset == "gliderDiamond") {
      this.setState({
        cellData: gliderDiamond,
        currentGeneration: 0
      })
    }
    if (this.state.preset == "flower") {
      this.setState({
        cellData: flower,
        currentGeneration: 0
      })
    }
  }

  render() {
    return (
      <div className="App">
        <h1 className="Title">Conway's Game of Life</h1>
        <p className="SubTitle">{!!this.state.currentGeneration
            ? `Generation ${this.state.currentGeneration}`
            : "Click cells below or select a preset and start the simulation!"}</p>
        <div className="GameWrapper">
        {!!this.state.simulating ? (
          <div className="LeftButtons">
              <div className="FastForwardWrapper">
                <Button disabled onClick={this.fastForwardGrid}>Fast Forward</Button>
                <div className="FFSelectorWrapper Hidden">
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="1" onChange={this.handleChanges} checked={this.state.frameNum === '1'}/>
                    <label>1x</label>
                  </div>
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="5" onChange={this.handleChanges} checked={this.state.frameNum === '5'}/>
                    <label>5x</label>
                  </div>
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="10" onChange={this.handleChanges} checked={this.state.frameNum === '10'}/>
                    <label>10x</label>
                  </div>
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="20" onChange={this.handleChanges} checked={this.state.frameNum === '20'}/>
                    <label>20x</label>
                  </div>
                </div>
                {!!this.state.rewind ? (
              <Button onClick={this.rewindGrid}>Rewind to Generation 0</Button>
              ) : (
              <Button disabled onClick={this.rewindGrid}>Rewind to Generation 0</Button>
              ) }
              </div>
              
              <div className="FastForwardWrapper Hidden">
              Speed of Simulation
                <div>
                  <input className="SpeedSelector" type="radio" id="1x" name="simSpeed" value="1000" onChange={this.handleChanges} checked={this.state.simSpeed === '1000'}/>
                  <label>1x</label>
                </div>
                <div>
                  <input className="SpeedSelector" type="radio" id="2x" name="simSpeed" value="500" onChange={this.handleChanges} checked={this.state.simSpeed === '500'}/>
                  <label>2x</label>
                </div>
                <div>
                  <input className="SpeedSelector" type="radio" id="5x" name="simSpeed" value="200" onChange={this.handleChanges} checked={this.state.simSpeed === '200'}/>
                  <label>5x</label>
                </div>
                <div>
                  <input className="SpeedSelector" type="radio" id="10x" name="simSpeed" value="100" onChange={this.handleChanges} checked={this.state.simSpeed === '100'}/>
                  <label>10x</label>
                </div>
              </div>
            </div>
        
        ) :
            (<div className="LeftButtons">
              <div className="FastForwardWrapper">
                <Button onClick={this.fastForwardGrid}>Fast Forward</Button>
                <div className="FFSelectorWrapper">
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="1" onChange={this.handleChanges} checked={this.state.frameNum === '1'}/>
                    <label>1x</label>
                  </div>
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="5" onChange={this.handleChanges} checked={this.state.frameNum === '5'}/>
                    <label>5x</label>
                  </div>
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="10" onChange={this.handleChanges} checked={this.state.frameNum === '10'}/>
                    <label>10x</label>
                  </div>
                  <div>
                    <input className="FFSelector" type="radio" name="frameNum" value="20" onChange={this.handleChanges} checked={this.state.frameNum === '20'}/>
                    <label>20x</label>
                  </div>
                </div>
                {!!this.state.rewind ? (
              <Button onClick={this.rewindGrid}>Rewind to Generation 0</Button>
              ) : (
              <Button disabled onClick={this.rewindGrid}>Rewind to Generation 0</Button>
              ) }
              </div>
              
              <div className="FastForwardWrapper">
              Speed of Simulation
                <div>
                  <input className="SpeedSelector" type="radio" id="1x" name="simSpeed" value="1000" onChange={this.handleChanges} checked={this.state.simSpeed === '1000'}/>
                  <label>1x</label>
                </div>
                <div>
                  <input className="SpeedSelector" type="radio" id="2x" name="simSpeed" value="500" onChange={this.handleChanges} checked={this.state.simSpeed === '500'}/>
                  <label>2x</label>
                </div>
                <div>
                  <input className="SpeedSelector" type="radio" id="5x" name="simSpeed" value="200" onChange={this.handleChanges} checked={this.state.simSpeed === '200'}/>
                  <label>5x</label>
                </div>
                <div>
                  <input className="SpeedSelector" type="radio" id="10x" name="simSpeed" value="100" onChange={this.handleChanges} checked={this.state.simSpeed === '100'}/>
                  <label>10x</label>
                </div>
              </div>
            </div>
        )}
          <Grid cellstyling={this.cellStyling} onClick={this.clickCell} />
            {!!this.state.simulating ? (
              <div className="RightButtons">
              <Button disabled onClick={this.clearGrid}>Clear Grid</Button>
                <Button style={{padding: "40px 0", borderRadius: "40%"}} className="StartStopButton" onClick={this.endAnimation}><i class="fas fa-stop"></i><p></p>Stop Simulation<p></p></Button>
                <form className="PresetForm" onSubmit={this.submitPreset}>
                  <select
                    className="PresentSelect Hidden"
                    name="preset"
                    onChange={this.handleChanges}>
                      <option value="cellData">Select a preset..</option>
                      <option value="gosperGun">
                        Gosper Glider Gun
                      </option>
                      <option value="flower">
                        Flower
                      </option>
                      <option value="fireworks">
                        Fireworks
                      </option>
                      <option value="gliderDiamond">
                        Glider Diamond
                      </option>
                      <option value="shuttle">
                        Glider shuttle
                      </option>
                      <option value="eureka">
                        Eureka stars
                      </option>
                    </select>
                    <Button className="btn-block" disabled>Enable Preset</Button>
                  </form>
                </div>
            ) : (
              <div className="RightButtons">
                <Button onClick={this.clearGrid}>Clear Grid</Button>
                <Button style={{padding: "40px 0", borderRadius: "40%"}} onClick={this.startAnimation}><i class="fas fa-play"></i><p></p>Start Simulation<p></p></Button>
                <form className="PresetForm" onSubmit={this.submitPreset}>
                  <select
                  className="PresentSelect"
                    name="preset"
                    onChange={this.handleChanges}>
                      <option value="cellData">Select a preset..</option>
                      <option value="gosperGun">
                        Gosper Glider Gun
                      </option>
                      <option value="flower">
                        Flower
                      </option>
                      <option value="fireworks">
                        Fireworks
                      </option>
                      <option value="gliderDiamond">
                        Glider Diamond
                      </option>
                      <option value="shuttle">
                        Glider shuttle
                      </option>
                      <option value="eureka">
                        Eureka stars
                      </option>
                    </select>
                    <Button className="btn-block">Enable Preset</Button>
                  </form>
                </div>
            )}
          </div>
          <div className="Title">
            About
          </div>
            <div className="About1">
              <p className="GameDescription">Game of Life is a schema developed in 1970 by mathematician John Conway. 
                Its rules are applied to create what we call a Cellular Automaton, 
                a fancy word for a grid of cells that cycle through different states over time.
                It is "Turing Complete", and fully reprogrammable to be used to carry out 
                any other computable function. <br/>It involves <strong>4 simple rules</strong> which result in wildy differing sequences. 
                An initial group of live cells can create an unpredictable, chaotic sequence. 
                Other times, it will create a repeating sequence, such as a glider creation or the flower preset. 
                Often all cells will quickly die off or stabilize into a still life, like a 2x2 square. </p>
              <div className="ConwayImageWrapper">
                <img src={Conway} className="ConwayImage" alt="Image of mathematician John Conway" />
                <p>John Conway, 2005</p>
              </div>
            </div>
              <ol className="RulesList">
                
                <p className="ListTitle">There are four rules for this game:</p>
                <li>Any live cell with fewer than two live neighbours dies (referred to as underpopulation or exposure[1]).</li>
                <li>Any live cell with more than three live neighbours dies (referred to as overpopulation or overcrowding).</li>
                <li>Any live cell with two or three live neighbours lives, unchanged, to the next generation.</li>
                <li>Any dead cell with exactly three live neighbours will come to life.</li>
              </ol>

              
  


      </div>
    );
  }
}

export default App;
