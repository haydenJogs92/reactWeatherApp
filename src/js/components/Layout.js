import React from "react"


import { connect } from "react-redux"

//import actions to fire from the view layer

import { fetchWeatherByCity, fetchWeatherByLatLong, changeSelectedLocationID, removeCityWeather, undo, redo } from "../actions/weatherActions"
import {hideProperties, showProperties} from "../actions/mapActions"
import {kelvinToFahrenheit, kelvinToCelsius} from "../utilities/utilities"

import AddCityForm from './addCityForm'
import GoogleWeatherMap from './googleMap'
import CityWeatherListItem from './CityWeatherListItem'
import UndoRedo from './undo-redo-buttons'
import ErrorBox from './errorBox';

//uses a connect decorator (an es 6 feature )
//this wraps our layout component in the connect decorator
//which renders our layout component and injexts props into it
//runs two functions - the first sets our store as props on the layout component
//this allows us to shorten this.props.store.user.user -> this.props.user
//the second function does something else?
//in this case, we pull in the parts of the store that matter to this component
//when to use connect (smart components use connect and pass data & actions to dumb components as props)


//maybe try to create history
//http://redux.js.org/docs/recipes/ImplementingUndoHistory.html
//there is also redux-undo

//use redux deep freeze middle ware https://github.com/buunguyen/redux-freeze to

var pageStyle = {
  textAlign: 'center',
}

var listStyle = {
  textAlign: 'left',
  margin: 'auto',
  maxWidth: '400px',
  padding: '10px'
}

@connect((store) => {
  return {
    weather: store.weather.cityWeatherPast,
    selectedMarkerID: store.weather.selectedMarkerID,
    apiError: store.weather.error,
    hideMapProperties: store.map.hideMapProperties

  };
})
export default class Layout extends React.Component {
  componentWillMount() {

  }

  addCityWeather( city, state )
  {
    console.log(city);
    console.log(state);
    this.props.dispatch( fetchWeatherByCity(city, state) );
  }

  addLatLongWeather( lat, long )
  {
    this.props.dispatch( fetchWeatherByLatLong( lat, long ) )
  }

  handleMapClick = ({x, y, lat, lng, event}) => {
    this.addLatLongWeather(lat, lng);
  }

  handleMarkerClick = ( markerID ) => {
    console.log('marker selected');
    console.log( markerID );
    this.props.dispatch( changeSelectedLocationID( markerID ) );
  }


  handleDelete = ( markerID ) => {
    this.props.dispatch( removeCityWeather( markerID ) );
  }

  handleRefresh = ( markerID ) => {
    this.props.dispatch( refreshCityWeather( markerID ) );
  }

  handleUndo = () => {
    this.props.dispatch( undo() );
  }
  handleRedo= () => {
    this.props.dispatch( redo() );
  }

  //handle methods for map
  handleHideProperties = () => {
    this.props.dispatch( hideProperties() )
  }

  handleShowProperties = () => {
    this.props.dispatch( showProperties() )
  }



  render() {
    const cityWeather = this.props.weather;

    const mappedCityWeather = cityWeather.map(
      city => {
        return <CityWeatherListItem
                city={city}
                key={city.id}
                selectedMarkerID={ this.props.selectedMarkerID }
                handleMarkerClick={ (markerID) => { this.handleMarkerClick( markerID ) } }
                handleDelete={ (markerID) => { this.handleDelete( markerID ) } }
                handleRefresh={ (markerID) => { this.handleRefresh( markerID ) } } />
      }
    )
    //<AddCityForm fetchCityWeather={(city) => this.fetchCityWeather(city)} />
    //<UndoRedo handleUndo={this.handleUndo}  handleRedo={this.handleRedo}/>
      return (
        <div style={pageStyle}>
          <br />
          <br />
          <h1>How's The Weather?</h1>
          <AddCityForm addCityWeather={(city,state) => {this.addCityWeather(city,state)}} />
          <ErrorBox apiError={this.props.apiError} />
          <GoogleWeatherMap
            mapMarkerLocations={this.props.weather}
            handleMapClick={ this.handleMapClick }
            handleMarkerClick={ (markerID) => { this.handleMarkerClick( markerID ) } }
            selectedMarkerID={ this.props.selectedMarkerID }
            hideProperties={ () => { this.handleHideProperties() } }
            showProperties={ () => { this.handleShowProperties() } }
            hideMapProperties={this.props.hideMapProperties}
          />
            <br />
            <br />
          <ul style={listStyle}>{ mappedCityWeather }</ul>
        </div>
      )

  }
}
