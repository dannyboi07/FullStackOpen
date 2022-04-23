import { useEffect, useState } from "react";
import axios from "axios";

export default function useCountry(name) {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        if (name !== "") {
            axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then(respCountry => setCountry(respCountry.data))
            .catch(err => console.error(err));
        };
    }, [name]);

    return country;
};