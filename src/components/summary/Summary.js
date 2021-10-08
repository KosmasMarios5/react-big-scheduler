import React from 'react'
import {PropTypes} from 'prop-types'
import SummaryPos from "../../types/SummaryPos";

const Summary = props => {
    const {summary, left, width, top, config} = props;
    let color = config.summaryColor;
    if (typeof summary.color !== "undefined")
        color = summary.color;
    let textAlign = 'center';
    if (config.summaryPos === SummaryPos.TopRight || config.summaryPos === SummaryPos.BottomRight)
        textAlign = 'right';
    else if (config.summaryPos === SummaryPos.TopLeft || config.summaryPos === SummaryPos.BottomLeft)
        textAlign = 'left';
    let style = {
        height: config.eventItemHeight,
        color: color,
        textAlign: textAlign,
        marginLeft: '6px',
        marginRight: '6px'
    };
    if (typeof summary.fontSize !== "undefined")
        style = {...style, fontSize: summary.fontSize};

    return (
        <a className="timeline-event header2-text" style={{left: left, width: width, top: top, cursor: 'default'}}>
            <div style={style}>
                {summary.text}
            </div>
        </a>
    );
};

Summary.propTypes = {
    config: PropTypes.object.isRequired,
    summary: PropTypes.object.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
}

export default Summary