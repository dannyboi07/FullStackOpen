import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FormattedDisplayComps from './components/FormattedDisplayComps';

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [search, setSearch] = useState('');
  const [resultAndMulti, setResultAndMulti] = useState({result: [''], multipleResults: true})
  const [weatherResults, setWeatherResults] = useState([]);
  
  function submitOnChange(e) {
    setSearch(e.target.value);
    if (search === '') {
      setResultAndMulti({ result: [''], multipleResults: true});
    }   
  }

  useEffect(() => {
    if (search !== '') {  
      axios
      .get(`https://restcountries.com/v3.1/name/${search}`)
      .then(response => {
        if (response.data.length > 10) {
          setResultAndMulti({
            result: ['Too many countries, specify another filter'],
            multipleResults: true,
          });
          return resultAndMulti;
        }
        else if ((response.data.length > 1) && (response.data.length <= 10)){
          setResultAndMulti({
            result: response.data.map(e => e),
            multipleResults: true,
          })
          return resultAndMulti;
        }
        else if (response.data.length === 1) {
          setResultAndMulti({
            result: response.data,
            multipleResults: false,
          })

          const getWeather = async () => {
            let response2 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${resultAndMulti.result[0].capital}&units=metric&appid=${api_key}`);
            console.log(1, response2);
            setWeatherResults(response2.data);
            console.log(1, weatherResults);
            console.log(2, weatherResults, typeof(weatherResults));
            return [resultAndMulti, weatherResults];
          };
          getWeather();
        }
      })
    }
  }, [search]);

  return (
    <div className="App">
      <form>
        Find Countries <input type="text" value={search} onChange={submitOnChange}/>
      </form>
      <FormattedDisplayComps Type={((search === '') || 
        ((search !== '') && (resultAndMulti.multipleResults === true))) ? 1 : 2}
        result={resultAndMulti.result} search={search} multipleResults={ resultAndMulti.multipleResults }
        weatherResults={weatherResults}
      />
    </div>
  );
}

export default App;