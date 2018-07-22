import React from "react";


export default class MapLocation extends React.Component
{

  handleMarkerClick = () => {
    this.props.markerClicked( this.props.data.id );
  }


  render()
  {
    const markerStyle = {
      backgroundColor: 'red',
      height: '10px',
      width: '10px',
      borderRadius: '50%'
    };


    const selectedMarkerStyle = {
      backgroundColor: 'blue',
      height: '15px',
      width: '15px',
      borderRadius: '50%'
    };

    //if this is the selected marker, then highlight it
    if ( this.props.selectedMarkerID == this.props.data.id ){
      return (
        <div
          style={selectedMarkerStyle}
          key={this.props.data.id}
          onClick={this.handleMarkerClick}
          ></div>
      )
    }
    else
    {
      return (
        <div
          style={markerStyle}
          key={this.props.data.id}
          onClick={this.handleMarkerClick}
          ></div>
      )
    }
  }
}
