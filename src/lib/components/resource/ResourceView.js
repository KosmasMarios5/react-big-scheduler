import React from 'react'
import {PropTypes} from "prop-types";
import SlotItem from "../slotItem/slotItem";

const ResourceView = props => {
    const {
        renderData,
        resourceTableWidth,
        config,
        contentScrollbarHeight,
        slotClickedFunc,
        slotItemTemplateResolver,
        onSlotItemExpandToggle
    } = props;
    let width = resourceTableWidth - 2;

    return (
        <div style={{paddingBottom: contentScrollbarHeight}}>
            <table className="resource-table">
                <tbody>
                {renderData.map((item) => (
                    <SlotItem
                        key={item.slotId}
                        config={config}
                        item={item}
                        width={width}
                        slotClickedFunc={slotClickedFunc}
                        slotItemTemplateResolver={slotItemTemplateResolver}
                        onSlotItemExpandToggle={onSlotItemExpandToggle}
                    />
                ))}
                </tbody>
            </table>
        </div>
    )
};

ResourceView.propTypes = {
    contentScrollbarHeight: PropTypes.number.isRequired,
    slotClickedFunc: PropTypes.func,
    slotItemTemplateResolver: PropTypes.func,
    toggleExpandFunc: PropTypes.func
}

export default ResourceView