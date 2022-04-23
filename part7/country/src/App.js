import { useState } from "react";
import useField from "./hooks/useField";
import useCountry from "./hooks/useCountry";

const Country = ({ country }) => {
    console.log(country);
    if (!country) {
        return <div>not found...</div>;
    }

    return (
        <div>
        <h3>{country.name.common}</h3>
        <div>population {country.population}</div>
        <div>capital {country.capital}</div>
        <img
            src={country.flags.png}
            height="100"
            alt={`flag of ${country.name.common}`}
        />
        </div>
    );
};

const App = () => {
    const nameInput = useField("text");
    const [name, setName] = useState("");
    const country = useCountry(name);

    const fetch = (e) => {
        e.preventDefault();
        setName(nameInput.value);
    };

    return (
        <div>
        <form onSubmit={fetch}>
            <input {...nameInput} />
            <button>find</button>
        </form>

        {country && country.length === 0 ? (
            <p>Not found...</p>
        ) : (
            country &&
            country.map((mapcountry, i) => <Country key={i} country={mapcountry} />)
        )}
        </div>
    );
};

export default App;
