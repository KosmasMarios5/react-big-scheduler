import React from 'react'

const BodyView = props => {
    const {renderData, headers, config, behaviors, contentCellWidth} = props;
    let cellWidth = contentCellWidth;

    // let displayRenderData = renderData.filter(o => o.expanded);
    // let displayRenderData = renderData.filter(o => o.expanded);
    let tableRows = renderData.map((item) => {
        let rowCells = headers.map((header, index) => {
            let key = item.slotId + '_' + header.time;
            let style = index === headers.length - 1 ? {} : {width: cellWidth};
            if (!!header.nonWorkingTime)
                style = {...style, backgroundColor: config.nonWorkingTimeBodyBgColor};
            if (item.groupOnly)
                style = {...style, backgroundColor: config.groupOnlySlotColor};
            if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
                let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(item.slotId, header);
                if (!!cellBgColor)
                    style = {...style, backgroundColor: cellBgColor};
            }
            return (
                <td key={key} style={style}>
                    <div/>
                </td>
            )
        });

        return (
            <tr key={item.slotId} style={{height: item.rowHeight}}>
                {rowCells}
            </tr>
        );
    });

    return (
        <tbody>
        {tableRows}
        </tbody>
    );
};

BodyView.propTypes = {}

export default BodyView