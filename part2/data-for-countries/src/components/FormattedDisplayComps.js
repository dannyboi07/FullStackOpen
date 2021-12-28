import React from 'react';
import Country from './Country';
import Results from './Results';

function FormattedDisplayComps(props) {

    if (props.Type === 1) {
        if (props.search === '') {
            // console.log("hey");
            return (
                <Results CName={""} />
            )
        }
        else if ( ((props.search !== '') && (props.multipleResults === true)) && ((props.result.length > 1) && (props.result.length <= 10)) )  {
            console.log(props.result);
            return (
                props.result.map(x => {
                    // console.log(x,2);
                    return (
                        <>
                            <Results CName={ x.name.common } CCapital={x.capital} CPopulation={x.population} 
                                CLanguages={Object.values(x.languages).map(e => e)} CFlags={x.flags.png} multipleResults={props.multipleResults} />
                        </>
                    )      
                })
            )
        }
        else if (((props.result.length === 1) && (props.result !== [''])) && (props.search !== '')) {;
            return (
                props.result.map(x => {
                    // console.log(x,2);
                    return (
                        <Results CName={ x } />
                    )
                })
            )
        }
    }
    else if (props.Type === 2) {
        // console.log("Final result", props.result[0].flags.png, typeof(props.result[0].flags.png));
        console.log("here in FComs")
        return (
            <Country CName={ props.result[0].name.common } CCapital={ props.result[0].capital }
            CPopulation={ props.result[0].population } CLanguages={ Object.values(props.result[0].languages).map(e => e) }
            CFlags={ props.result[0].flags.png } search={ props.search } multipleResults={props.multipleResults} result={props.result}
            weatherResults={props.weatherResults}
            />
        )
    }
}

export default FormattedDisplayComps;

// else if ( ((props.search !== '') && (props.multipleResults === true)) && ( ((props.result.length === 1) && (props.result !== [''])) || ((props.result.length > 1) && (props.result.length <= 10)) ) )