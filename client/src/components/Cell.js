import React from 'react';

function Cell(props) {
    return (
        <button className={props.cellstyling} onClick={props.onClick} />
    )
}

export default Cell;