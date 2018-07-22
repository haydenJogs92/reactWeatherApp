/*

now useing this one

https://github.com/istarkov/google-map-react
 */


 import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import MapLocation from './mapLocation'


var markerStyle = {
  backgroundColor: 'red',
  height: '10px',
  width: '10px',
  borderRadius: '50%'
}

  var mapSize = {
    height: '400px',
    width: '100%',
    margin: 'auto'
  }

export default class GoogleWeatherMap extends Component {

  hideProperties = () => {
    this.props.hideProperties();

  };

  showProperties = () => {
    this.props.showProperties();
  };


  static defaultProps = {
    center: {lat: 41.88, lng: -87.62},
    zoom: 8
  };




  render() {

    /* make an array of map marker components with weather api data passed in from parent */
    var weatherLocationData = this.props.mapMarkerLocations;
    if (this.props.mapMarkerLocations == null){
      weatherLocationData = new Array()
    }


    /* When zooming in or out, don't show the map points because they move oddly on the map.
  hide and then reshow them once zoom ends */
    var onZoomStart = () => {
      this.hideProperties();
    }

    var onZoomEnd = () => {
      this.showProperties();
    }



    const weatherMapLocations = weatherLocationData.map( (data) => {
      //if the map is not zooming in or out, show the properties
          if ( this.props.hideMapProperties == false )
          {
            return <MapLocation
              data={data}
              key={data.id}
              lat={data.coord.lat}
              lng={data.coord.lon}
              markerClicked={this.props.handleMarkerClick}
              selectedMarkerID={this.props.selectedMarkerID}
              />;
            }
    });

    /* If marker is selected, get the marker by ID an mark it as selected  */
    var currentSelectedCity = this.props.center;
    if (weatherLocationData.length != 0)
    {

      for (var i = 0; i < weatherLocationData.length; i++)
      {
        if(weatherLocationData[i].id == this.props.selectedMarkerID)
        {

          currentSelectedCity = weatherLocationData[i];
          currentSelectedCity = {lat: currentSelectedCity.coord.lat, lng: currentSelectedCity.coord.lon}
        }
      }

    }



    /* If selected map ID does not Equal previous state selected map ID, go to this location - makes the code above unecessary  */


    return (
      <div style={mapSize}>
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        center={currentSelectedCity}
        onClick={this.props.handleMapClick}
        onZoomAnimationStart={onZoomStart}
        onZoomAnimationEnd={onZoomEnd}
      >

        {weatherMapLocations}


      </GoogleMapReact>
      </div>
    );
  }
}
