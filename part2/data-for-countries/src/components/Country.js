import React from 'react';

function Country(props) {

    const compass = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S",
                    "SSW","SW","WSW","W","WNW","NW","NNW","N"];

    function degToCompass(windDir) {
        let index = windDir % 360;
        index = Math.round(index / 22.5) + 1;
        return compass[index];
    } 

    console.log(props.weatherResults)

    if (props.multiResultDisplay === true) {
        return (
            <div>
                <h1>{ props.CName }</h1>
                <p>Capital: { props.CCapital } </p>
                <p>Population: { props.CPopulation }</p>
                <h2>Languages</h2>
                <ul>
                    { props.CLanguages.map(e => <li>{ e }</li>) }
                </ul>
                <img style={{width:"150px", height:"auto"}} src={ props.CFlags } alt='Country Flag' />
            </div>
        )
    }
    else if (props.weatherResults.length === 0) {
        return (
            <h1>Gathering data...</h1>
        )
    }
    else if (props.weatherResults.length !== 0) {    
        console.log(props.weatherResults)
        return (
            <div>
                <h1>{ props.CName }</h1>
                <p>Capital: { props.CCapital } </p>
                <p>Population: { props.CPopulation }</p>
                <h2>Languages</h2>
                <ul>
                    { props.CLanguages.map(e => <li>{ e }</li>) }
                </ul>
                <img style={{width:"150px", height:"auto"}} src={ props.CFlags } alt='Country Flag' />
                <h2>Weather in { props.CCapital }</h2>
                <p>Temperature: { props.weatherResults.main.temp } Celsius</p>
                <img src={ `http://openweathermap.org/img/wn/${props.weatherResults.weather[0].icon}@2x.png` } alt="Weather Icon" />
                <p>Wind: { props.weatherResults.wind.speed } mph, direction: { degToCompass(props.weatherResults.wind.deg) } </p>
            </div>
        )
    }
}

export default Country;


// useEffect(() => {
    //     if ((props.multipleResults === false) && (props.result.length === 1)) {
    //         console.log("hi")
    //         axios
    //         .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.CCapital}&units=metric&appid=${api_key}`)
    //         .then(response => {
    //             console.log(1, response);
    //             // weatherResults = response.data.map(e => [e.main.temp, e.weather[0].icon, e.wind.speed, e.wind.deg]);
    //             // weatherResults = [response.data];
    //             // setWeatherResults([response.data]);
    //             weatherResults[0] = response.data.main.temp;
    //             weatherResults[1] = response.data.weather[0].icon;
    //             weatherResults[2] = response.data.wind.speed;
    //             weatherResults[3] = response.data.wind.deg;
    //             console.log(1, weatherResults);
    //             // weatherResults = [ weatherResults[0].main.temp, weatherResults[0].weather[0].icon, weatherResults[0].wind.speed, weatherResults[0].wind.deg ];
    //             // setWeatherResults([ weatherResults[0].main.temp, weatherResults[0].weather[0].icon, weatherResults[0].wind.speed, weatherResults[0].wind.deg ])
    //             console.log(2, weatherResults, typeof(weatherResults));
    //             console.log(2, weatherResults[0],weatherResults[1], weatherResults[2], weatherResults[3]);
    //             return weatherResults;
    //         })
    //     }
    // }, [props.multiResultDisplay, props.CCapital]);