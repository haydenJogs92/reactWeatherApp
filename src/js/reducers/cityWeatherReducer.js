export default function reducer(state={

    //cities added in the future
    cityWeatherFuture: [],
    //all current and last cities
    cityWeatherPast: [],
    fetching: false,
    fetched: false,
    error: null,
    //id of the current selected marker
    selectedMarkerID: null
  }, action) {

    switch (action.type)
    {
      case "FETCH_WEATHER":
      {
        return {...state, fetching: true}
      }
      case "FETCH_WEATHER_REJECTED":
      {
        return {...state, fetching: false, error: action.payload}
      }
      //add city weather to list without mutating state
      case "FETCH_WEATHER_FULFILLED":
      {

        var bNewLocation = true

        /* prevent duplicates from being added */
        for (var i = 0; i < state.cityWeatherPast.length; i++)
        {
          if(state.cityWeatherPast[i].id == action.payload.id   )
          {
            bNewLocation = false;
          }
        }

        if(bNewLocation)
        {
          return {
            ...state,
            fetching: false,
            fetched: true,
            cityWeatherPast: [...state.cityWeatherPast, action.payload],
            selectedMarkerID: action.payload.id,
            error: null
          }
        }
        else
        {
          /* Maybe fire a new action to refresh the data for this point and make it the selected point */
          return {
            ...state,
            fetching: false,
            fetched: true,
            selectedMarkerID: action.payload.id,
            error: null
        }

        }
    }
    case "CHANGE_SELECTED_LOCATION_ID":
    {

        return {
          ...state,
          selectedMarkerID: state.selectedMarkerID != action.payload ? action.payload : null
        }
    }

      //remove city ID - actually keeps info, but puts it in the future
      case "REMOVE_CITY_WEATHER": {
        let removeIndex;
        let deletedCity;
        for (var i = 0; i < state.cityWeatherPast.length; i++)
        {
          if ( state.cityWeatherPast[i].id == action.payload )
          {
            removeIndex = i;
            deletedCity = state.cityWeatherPast[i];
          }
        }

        //if the cityweather present is deleted - put it in deleted city weathers
        return {
          ...state,
          //cityWeatherFuture: [deletedCity, ...state.cityWeatherFuture],
          cityWeatherPast: [...state.cityWeatherPast.slice(0,removeIndex), ...state.cityWeatherPast.slice(removeIndex + 1)],
        }
      }


      case "REFRESH_CITY_WEATHER": {
        //refresh current city with matching id action.payload
      }

      //Undo - always remove last city from present/past, add it to end of future
      //similar to delete, but only deletes last added city, sets new current city
      case "UNDO":{
        let removedCity;
        if (state.cityWeatherPast.length != 0)
        {
            removedCity = state.cityWeatherPast[state.cityWeatherPast.length - 1];
        }

        if(removedCity != null)
        {
          return {
            ...state,
            cityWeatherFuture: [removedCity, ...state.cityWeatherFuture],
            cityWeatherPast: [...state.cityWeatherPast.slice(0, state.cityWeatherPast.length - 1)]
          }
        }
        else {
          return {
            ...state
          }
        }
      }

      //Redo - always remove first city from future, add it to present/past
      //similar to add city, but just gets cities stored in future, set current city to this new city
      case "REDO":{
        let addedCity;
        if (state.cityWeatherFuture.length != 0)
        {
            addedCity = state.cityWeatherFuture[0];
        }

        if(addedCity != null)
        {
          let newFuture = state.cityWeatherFuture.slice();
          newFuture.shift();

          return {
            ...state,
            cityWeatherFuture: newFuture,
            cityWeatherPast: [...state.cityWeatherPast, addedCity]
          }
        }
        else {
          return {
            ...state
          }
        }

      }

      //add refresh city info - request updated information for city weather


    }

    return state
}
