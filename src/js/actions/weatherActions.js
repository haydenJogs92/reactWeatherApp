import axios from "axios";
import {openWeatherMapKey} from '../../api/apiKeys';


//change to fetchWeatherByCity
export function fetchWeatherByCity( city/*, state*/ )
{
  return function(dispatch)
  {
    //let store know we are fecthing weather
    dispatch({type: "FETCH_WEATHER"});

    /*
    var query = '';
    if ( state == '')
    {
      query = city;
    }
    else
    {
      query = city + ',' + state;
    }
    */

    var query = city;


    axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + query + "&APPID=" + openWeatherMapKey)
      .then((response) => {
        dispatch({type: "FETCH_WEATHER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_WEATHER_REJECTED", payload: err})
      })
  }
}


export function fetchWeatherByLatLong(lat, long)
{
  return function(dispatch) {
    //let store know we are fecthing weather
    dispatch({type: "FETCH_WEATHER"});
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=" + openWeatherMapKey)
      .then((response) => {
        dispatch({type: "FETCH_WEATHER_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_WEATHER_REJECTED", payload: err})
      })
  }
}


export function changeSelectedLocationID( locationID )
{
  return function(dispatch)
  {
    dispatch({type: "CHANGE_SELECTED_LOCATION_ID", payload: locationID});
  }
}

/*
  Toggle Celcius/Farenheight
*/



export function removeCityWeather( cityID ) {
  return {
    type: "REMOVE_CITY_WEATHER",
    payload: cityID
  }
}

export function refreshCityWeather( cityID ) {
  return {
    type: "REFRESH_CITY_WEATHER",
    payload: cityID
  }
}


export function undo() {
  return {
    type: "UNDO"
  }
}


export function redo() {
  return {
    type: "REDO"
  }
}
