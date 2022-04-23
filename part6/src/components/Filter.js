import React from 'react';
import { connect } from 'react-redux';
import { sendFilter } from '../reducers/filterReducer';

function Filter(props) {
    // const dispatch = useDispatch();

    function handleFilterChange(e) {
        if (e.target.value === "") {
            props.sendFilter("EMPTY", "");
            // dispatch(sendFilter("EMPTY", ""));
        } else props.sendFilter("FILTER", e.target.value);
    };

    return (
        <div style={{ margin: "1em auto" }} >
            Filter <input name="filter" onChange={ (e) => handleFilterChange(e) }/>
        </div>
    );
};

const mapDispatchToProps = {
    sendFilter
}

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter)

export default ConnectedFilter;
