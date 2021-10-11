import React from 'react';

const SlotItem = props => {
    const {
        item,
        slotClickedFunc,
        slotItemTemplateResolver,
        width,
        config
    } = props

    let indents = [];
    for (let i = 0; i < item.indent; i++) {
        indents.push(<span key={`es${i}`} className="expander-space"/>);
    }

    let a = typeof slotClickedFunc !== "undefined" ?
        <span className="slot-cell">{indents}
            <span style={{cursor: "pointer"}} className="slot-text" onClick={() => slotClickedFunc(item)}>{item.slotName}</span></span>
        : <span className="slot-cell">{indents}<span className="slot-text">{item.slotName}</span></span>;
    let slotItem = (
        <div title={item.slotName} className="overflow-text" style={{textAlign: "left"}}>
            {a}
        </div>
    );
    if (!!slotItemTemplateResolver) {
        let temp = slotItemTemplateResolver(item, slotClickedFunc, width, "overflow-text header2-text");
        if (!!temp)
            slotItem = temp;
    }

    let tdStyle = {height: item.rowHeight};
    if (item.groupOnly) {
        tdStyle = {
            ...tdStyle,
            backgroundColor: config.groupOnlySlotColor
        };
    }

    return (
        <tr key={item.slotId}>
            <td data-resource-id={item.slotId} style={tdStyle}>
                {slotItem}
            </td>
        </tr>
    );
}

SlotItem.propTypes = {};

export default SlotItem;