import { combineReducers } from "redux"


import weather from "./cityWeatherReducer";
import map from "./mapReducer";

export default combineReducers({
  weather,
  map
})
