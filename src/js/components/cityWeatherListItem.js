import React from "react";
import {kelvinToFahrenheit, kelvinToCelsius} from "../utilities/utilities"

const selectedListItemStyle = {
  color: 'blue'
}

const deleteStyle = {
  color: 'red',
  float: 'right'

}

const cityLabelStyle = {
  textAlign: 'center',
  borderBottom: '1px solid #eee'
}

export default class CityWeatherListItem extends React.Component
{

  handleMarkerClick = () => {
    this.props.handleMarkerClick( this.props.city.id );
  }

  handleDelete = () => {
    this.props.handleDelete( this.props.city.id  )
  }

  handleRefresh = () => {
    this.props.handleRefresh( this.props.city.id )
    //<button onclick={this.handleRefresh}>Refresh</button>
  }

  render()
  {

    let tempF = kelvinToFahrenheit(this.props.city.main.temp);
    let tempC = kelvinToCelsius(this.props.city.main.temp);

    if( this.props.selectedMarkerID == this.props.city.id )
    {

      let highTemp = kelvinToFahrenheit(this.props.city.main.temp_max);
      let lowTemp = kelvinToFahrenheit(this.props.city.main.temp_min);
        return (
                <span>
                  <p style={cityLabelStyle} key={this.props.city.id}>
                    <span style={selectedListItemStyle} onClick={this.handleMarkerClick}>
                    {this.props.city.name}: {tempC} C, {tempF} F
                  </span>
                  <span style={deleteStyle} onClick={this.handleDelete}> (X)</span>
                </p>
                    Current Conditions: {this.props.city.weather[0].description}
                    <br />
                    High: {highTemp} F
                    <br />
                    Low: {lowTemp} F
                    <br />
                    Humidity: {this.props.city.main.humidity}%
                    <br />
                    Wind Speed: {this.props.city.wind.speed} Mph, {this.props.city.wind.deg} Deg.
                  <br />
                  <br />
                </span>
                )
    }
    else
    {
        return (<span>
          <p style={cityLabelStyle} key={this.props.city.id}>
            <span onClick={this.handleMarkerClick}>
              {this.props.city.name}: {tempC} C, {tempF} F
            </span>
          <span style={deleteStyle} onClick={this.handleDelete}> (X)</span>
        </p>
        <br />
      </span>   )
    }
  }
}
