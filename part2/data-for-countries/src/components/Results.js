import React, { useState } from 'react';
import '../App.css';
import Country from './Country';
import ShowDetails from './ShowDetails';

function Results(props) {
    const [showDetailsSwitch, setShowDetailsSwitch] = useState(false);
    function showDetails() {
        setShowDetailsSwitch(!showDetailsSwitch);
    }

    if (props.multipleResults !== undefined) {
        if (showDetailsSwitch === false) {
            return (
                <p>
                    { props.CName } <ShowDetails text="Show details" onClick={showDetails} />
                </p>
            )
        }
        else if (showDetailsSwitch === true) {
            console.log("here in results.js")
            return (
                <div>
                    {props.CName} <ShowDetails text="Hide details"onClick={showDetails}/>
                    <Country CName={props.CName} CCapital={props.CCapital} CPopulation={props.CPopulation} 
                        CLanguages={ props.CLanguages } CFlags={props.CFlags} multiResultDisplay={showDetailsSwitch} />
                </div>
            )
        }
    }
    return (
        <p>
            { props.CName }
        </p>
    )
}

export default Results;