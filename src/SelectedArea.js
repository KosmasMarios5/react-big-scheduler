import React from 'react'
import {PropTypes} from "prop-types";

const SelectedArea = props => {
    const {left, width, config} = props;
    return (
        <div className="selected-area"
             style={{left: left, width: width, top: 0, bottom: 0, backgroundColor: config.selectedAreaColor}}>
        </div>
    );
};

SelectedArea.propTypes = {
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
}

export default SelectedArea