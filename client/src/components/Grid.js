import React from "react";
import Cell from "./Cell";

class Grid extends React.Component {
  renderCell = i => {
    return (
      <Cell
        cellstyling={this.props.cellstyling(i)}       
        onClick={() => this.props.onClick(i)}
      />
    );
  };

  renderGrid = () => {
    let table = [];
    for (let i = 0; i < 50; i++) {
      let children = [];
      for (let x = 0; x < 50; x++) {
        children.push(this.renderCell(x + i * 50));
      }
      table.push(<div className="GridRow">{children}</div>);
    }
    return table;
  };

  render() {
      return (
          <div>
              {this.renderGrid()}
          </div>
      )
  }
}

export default Grid;
