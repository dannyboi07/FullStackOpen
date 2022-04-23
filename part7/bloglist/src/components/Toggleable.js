import React, { useState, useImperativeHandle } from 'react';

function Toggleable(props, ref) {
    const [visibility, setVisibility] = useState(false);
    const showHideBlog = { display: visibility ? "" : "none" };
    const buttonLabel = visibility ? "Cancel" : props.buttonLabel;

    function toggleVisibility() {
        setVisibility(!visibility); 
    };

    useImperativeHandle(ref, () => {
        return {toggleVisibility};
    });

    return (
        <>
            <div style={ showHideBlog }>
                { props.children }
            </div>
            <button id="create-new" onClick={ toggleVisibility }>{ buttonLabel }</button>
        </>
    );
};

export default React.forwardRef(Toggleable);