

export default function reducer(state=
  {
    hideMapProperties: false,
  }, action)
  {

    switch (action.type)
    {
      case "HIDE_MAP_PROPERTIES":
        {
          return {
            ...state,
            hideMapProperties: true
          }
        }


        case "SHOW_MAP_PROPERTIES":
        {
          return {
            ...state,
            hideMapProperties: false
          }
        }
    }
    return state
}
