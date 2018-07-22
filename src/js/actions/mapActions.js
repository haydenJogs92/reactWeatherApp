


export function hideProperties()
{
  return function(dispatch)
  {
    dispatch({type:"HIDE_MAP_PROPERTIES"});
  }
}

export function showProperties()
{
  return function(dispatch)
  {
    dispatch({type:"SHOW_MAP_PROPERTIES"});
  }
}
