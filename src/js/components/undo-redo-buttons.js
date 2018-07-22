import React from "react";


export default class UndoRedo extends React.Component
{

//if there is nothing in past, fade out undo
//if there is nothing in future, fade out redo

  handleRedo = () => {
    this.props.handleRedo();
  }

  handleUndo = () => {
    this.props.handleUndo();
  }

  render()
  {
    return (
      <div>
        <button onClick={this.handleUndo}>
          Undo
        </button>
        <button onClick={this.handleRedo}>
          Redo
        </button>
      </div>
    )

  }

}
