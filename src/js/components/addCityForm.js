import React from "react";

//an uncontrolled form input - no way to set the value from up top
//more on this here: https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
export default class AddCityForm extends React.Component
{

  handleSubmit = () =>
  {
    const city = this.cityName.value;
    const state = this.stateName.value;
    this.props.addCityWeather( city, state );
    this.cityName.value = '';
    this.stateName.value = '';
  }

  render()
  {
  
    return (
      <div>
        <h4>Enter a city or click on the map to view current weather conditions.</h4>
        <label>City</label>
        <br />
        <input type="text" ref={input => this.cityName = input} />
        <br />
        <label>Country Code</label>
        <br />
        <input type="text" ref={input => this.stateName = input} placeholder="Optional"/>
        <br />
        <br />
        <button onClick={this.handleSubmit}>Add City</button>
        <br />
        <br />
      </div>
    )
  }
}
