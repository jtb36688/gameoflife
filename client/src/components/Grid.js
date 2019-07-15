import React from "react";
import Cell from "./Cell";

class Grid extends React.Component {
  renderCell = i => {
    return (
      <Cell       
        onClick={() => this.props.onClick(i)}
      />
    );
  };

  renderGrid = () => {
    let table = [];
    for (let i = 0; i < 49; i++) {
      let children = [];
      for (let x = 0; x < 49; x++) {
        children.push(this.renderCell(x + i * 49));
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
{/* className={this.props.cellmap(i)} */}
export default Grid;
