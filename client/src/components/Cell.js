import React from 'react';

function Cell(props) {
    return (
        <button className="CellTest" onClick={props.onClick} />
    )
}

export default Cell;