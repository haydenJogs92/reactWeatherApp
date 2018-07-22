
const kelvinOffsetCelsius = 273.15;
const kelvinOffsetFahrenheit = 459.67;

export function kelvinToFahrenheit( tempKelvin )
{
  return (tempKelvin * (9/5) - kelvinOffsetFahrenheit).toFixed(2);
}


export function kelvinToCelsius( tempKelvin )
{
  return (tempKelvin - kelvinOffsetCelsius).toFixed(2);
}
