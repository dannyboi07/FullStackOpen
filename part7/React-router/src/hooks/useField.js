import { useState } from "react";

export function useField(type) {
    const [value, setValue] = useState("");

    function onChange(e) {
        setValue(e.target.value);
    };

    return {
        type,
        value,
        onChange
    }
};