import React from "react";


export default class ErrorBox extends React.Component
{

  //test edit here

  

  render()
  {

    const errorBoxStyle = {
      color: '#a94442',
      backgroundColor: '#f2dede',
      borderColor: '#ebccd1'
    }
    if ( this.props.apiError != null )
    {
      return (
        <div style={errorBoxStyle}>Api Error: {this.props.apiError.status} {this.props.apiError.statusText}</div>
      )
    }
    else
    {
        return (<div></div>)
    }

  }

}
