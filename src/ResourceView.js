import React from 'react'
import Icon from 'antd/lib/icon'
import {PropTypes} from "prop-types";

const ResourceView = props => {
    const {renderData, resourceTableWidth, config} = props

    const {contentScrollbarHeight, slotClickedFunc, slotItemTemplateResolver, toggleExpandFunc} = props;
    let width = resourceTableWidth - 2;
    let paddingBottom = contentScrollbarHeight;
    let displayRenderData = renderData.filter(o => o.render);
    let resourceList = displayRenderData.map((item) => {
        let indents = [];
        for (let i = 0; i < item.indent; i++) {
            indents.push(<span key={`es${i}`} className="expander-space"/>);
        }
        let indent = <span key={`es${item.indent}`} className="expander-space"/>;
        if (item.hasChildren) {
            indent = item.expanded ? (
                <Icon type="minus-square" key={`es${item.indent}`} style={{}} className=""
                      onClick={() => {
                          if (!!toggleExpandFunc)
                              toggleExpandFunc(item.slotId);
                      }}/>
            ) : (
                <Icon type="plus-square" key={`es${item.indent}`} style={{}} className=""
                      onClick={() => {
                          if (!!toggleExpandFunc)
                              toggleExpandFunc(item.slotId);
                      }}/>
            );
        }
        indents.push(indent);

        let a = typeof slotClickedFunc !== "undefined" ?
            <span className="slot-cell">{indents}<a className="slot-text" onClick={() => {
                slotClickedFunc(item);
            }}>{item.slotName}</a></span>
            : <span className="slot-cell">{indents}<span className="slot-text">{item.slotName}</span></span>;
        let slotItem = (
            <div title={item.slotName} className="overflow-text header2-text" style={{textAlign: "left"}}>
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
    });

    return (
        <div style={{paddingBottom: paddingBottom}}>
            <table className="resource-table">
                <tbody>
                {resourceList}
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