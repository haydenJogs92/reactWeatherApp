import React from "react";

//an uncontrolled form input - no way to set the value from up top
//more on this here: https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
export default class AddCityForm extends React.Component
{

  handleSubmit = () =>
  {
    const city = this.cityName.value;
    //const state = this.stateName.value;
    this.props.addCityWeather( city /*, state */);
    this.cityName.value = '';
    //this.stateName.value = '';
  }

  render()
  {

    return (
      <div>
        <br />
        <br />
        <h4>Click any point on the map or enter a city name to view current weather conditions.</h4>
        <br />
        <label>City</label>
        <br />
        <input type="text" ref={input => this.cityName = input} placeholder="ex: Chicago" />
        <br />
        <br />
        <button onClick={this.handleSubmit}>Add City</button>
        <br />
        <br />
      </div>
    )
  }
}
