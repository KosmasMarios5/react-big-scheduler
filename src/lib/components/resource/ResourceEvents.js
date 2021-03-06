import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import SelectedArea from './SelectedArea'
import {getPos} from '../../helpers/Util'
import {DnDTypes} from '../dnd/DnDTypes'
import DnDSource from "../dnd/DnDSource";
import CellUnits from "../../types/CellUnits";
import SummaryPos from "../../types/SummaryPos";
import {DATETIME_FORMAT} from "../../index";

const supportTouch = 'ontouchstart' in window;

class ResourceEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelecting: false,
            left: 0,
            width: 0,
        }
    }

    static propTypes = {
        resourceEvents: PropTypes.object.isRequired,
        onSetAddMoreState: PropTypes.func,
        updateEventStart: PropTypes.func,
        updateEventEnd: PropTypes.func,
        moveEvent: PropTypes.func,
        movingEvent: PropTypes.func,
        conflictOccurred: PropTypes.func,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText: PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        eventItemTemplateResolver: PropTypes.func,
    }

    componentDidMount() {
        const {config} = this.props;
        if (config.creatable === true) {
            if (supportTouch) {
                // this.eventContainer.addEventListener('touchstart', this.initDrag, false);
            } else {
                this.eventContainer.addEventListener('mousedown', this.initDrag, false);
            }
        }
    }

    componentWillUnmount() {
        if (supportTouch) {
            // this.eventContainer.removeEventListener('touchstart', this.initDrag, false);
        } else {
            this.eventContainer.removeEventListener('mousedown', this.initDrag, false);
        }
    }

    initDrag = (ev) => {
        const {isSelecting} = this.state;
        if (isSelecting) return;
        if ((ev.srcElement || ev.target) !== this.eventContainer) return;

        ev.stopPropagation();

        const {resourceEvents, contentCellWidth} = this.props;
        if (resourceEvents.groupOnly) return;
        let clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length === 0) return;
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            if (ev.buttons !== undefined && ev.buttons !== 1) return;
            clientX = ev.clientX;
        }

        let cellWidth = contentCellWidth;
        let pos = getPos(this.eventContainer);
        let startX = clientX - pos.x;
        let leftIndex = Math.floor(startX / cellWidth);
        let left = leftIndex * cellWidth;
        let rightIndex = Math.ceil(startX / cellWidth);
        let width = (rightIndex - leftIndex) * cellWidth;

        this.setState({
            startX: startX,
            left: left,
            leftIndex: leftIndex,
            width: width,
            rightIndex: rightIndex,
            isSelecting: true
        });

        if (supportTouch) {
            document.documentElement.addEventListener('touchmove', this.doDrag, false);
            document.documentElement.addEventListener('touchend', this.stopDrag, false);
            document.documentElement.addEventListener('touchcancel', this.cancelDrag, false);
        } else {
            document.documentElement.addEventListener('mousemove', this.doDrag, false);
            document.documentElement.addEventListener('mouseup', this.stopDrag, false);
        }
        document.onselectstart = function () {
            return false;
        };
        document.ondragstart = function () {
            return false;
        };
    }

    doDrag = (ev) => {
        ev.stopPropagation();

        let clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length === 0) return;
            const touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        const {startX} = this.state;
        const {headers, contentCellWidth} = this.props;
        let cellWidth = contentCellWidth;
        let pos = getPos(this.eventContainer);
        let currentX = clientX - pos.x;
        let leftIndex = Math.floor(Math.min(startX, currentX) / cellWidth);
        leftIndex = leftIndex < 0 ? 0 : leftIndex;
        let left = leftIndex * cellWidth;
        let rightIndex = Math.ceil(Math.max(startX, currentX) / cellWidth);
        rightIndex = rightIndex > headers.length ? headers.length : rightIndex;
        let width = (rightIndex - leftIndex) * cellWidth;

        this.setState({
            leftIndex: leftIndex,
            left: left,
            rightIndex: rightIndex,
            width: width,
            isSelecting: true
        });
    }

    stopDrag = (ev) => {
        ev.stopPropagation();

        const {onSelection, resourceEvents} = this.props;
        const {headers, events, config, cellUnit, localeMoment} = this.props;
        const {leftIndex, rightIndex} = this.state;
        if (supportTouch) {
            document.documentElement.removeEventListener('touchmove', this.doDrag, false);
            document.documentElement.removeEventListener('touchend', this.stopDrag, false);
            document.documentElement.removeEventListener('touchcancel', this.cancelDrag, false);
        } else {
            document.documentElement.removeEventListener('mousemove', this.doDrag, false);
            document.documentElement.removeEventListener('mouseup', this.stopDrag, false);
        }
        document.onselectstart = null;
        document.ondragstart = null;

        let startTime = headers[leftIndex].time;
        let endTime = resourceEvents.headerItems[rightIndex - 1].end;
        if (cellUnit !== CellUnits.Hour)
            endTime = localeMoment(resourceEvents.headerItems[rightIndex - 1].start).hour(23).minute(59).second(59).format(DATETIME_FORMAT);
        let slotId = resourceEvents.slotId;
        let slotName = resourceEvents.slotName;

        let hasConflict = false;
        if (config.checkConflict) {
            let start = localeMoment(startTime),
                end = localeMoment(endTime);
            const {getEventSlotId} = this.props
            events.forEach((e) => {
                if (getEventSlotId(e) === slotId) {
                    let eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if ((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                        hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            const {conflictOccurred} = this.props;
            if (typeof conflictOccurred !== "undefined") {
                conflictOccurred('New', {
                    id: undefined,
                    start: startTime,
                    end: endTime,
                    slotId: slotId,
                    slotName: slotName,
                    title: undefined,
                }, DnDTypes.EVENT, slotId, slotName, startTime, endTime);
            } else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
        } else {
            if (typeof onSelection !== "undefined")
                onSelection(slotId, slotName, startTime, endTime, this.state.left, this.state.width);
        }

        this.setState({
            startX: 0,
            leftIndex: 0,
            left: 0,
            rightIndex: 0,
            width: 0,
            isSelecting: false
        });

    }

    cancelDrag = (ev) => {
        ev.stopPropagation();

        const {isSelecting} = this.state;
        if (isSelecting) {
            document.documentElement.removeEventListener('touchmove', this.doDrag, false);
            document.documentElement.removeEventListener('touchend', this.stopDrag, false);
            document.documentElement.removeEventListener('touchcancel', this.cancelDrag, false);
            document.onselectstart = null;
            document.ondragstart = null;
            this.setState({
                startX: 0,
                leftIndex: 0,
                left: 0,
                rightIndex: 0,
                width: 0,
                isSelecting: false
            });
        }
    }

    eventContainerRef = (element) => {
        this.eventContainer = element;
    }

    render() {
        const {resourceEvents, connectDropTarget} = this.props;
        const {
            cellUnit,
            startDate,
            endDate,
            config,
            localeMoment,
            contentCellWidth,
            cellMaxEvents,
            schedulerWidth,
            selectedSlot
        } = this.props;
        const {isSelecting, left, width} = this.state;
        let cellWidth = contentCellWidth;
        let rowWidth = schedulerWidth + 1;

        let eventList = [];
        resourceEvents.headerItems.forEach((headerItem, index) => {

            if (headerItem.count > 0 || typeof headerItem.summary !== "undefined") {

                let isTop = config.summaryPos === SummaryPos.TopRight || config.summaryPos === SummaryPos.Top || config.summaryPos === SummaryPos.TopLeft;
                let marginTop = resourceEvents.hasSummary && isTop ? 1 + config.eventItemLineHeight : 1;
                let renderEventsMaxIndex = headerItem.addMore === 0 ? cellMaxEvents : headerItem.addMoreIndex;

                headerItem.events.forEach((evt, idx) => {
                    if (idx < renderEventsMaxIndex && evt !== undefined && evt.expanded) {
                        let durationStart = localeMoment(startDate);
                        let durationEnd = localeMoment(endDate).add(1, 'days');
                        if (cellUnit === CellUnits.Hour) {
                            durationStart = localeMoment(startDate).add(config.dayStartFrom, 'hours');
                            durationEnd = localeMoment(endDate).add(config.dayStopTo + 1, 'hours');
                        }
                        let eventStart = localeMoment(evt.eventItem.start);
                        let eventEnd = localeMoment(evt.eventItem.end);
                        let isStart = eventStart >= durationStart;
                        let isEnd = eventEnd <= durationEnd;
                        let left = index * cellWidth + (index > 0 ? 2 : 3);
                        let width = (evt.span * cellWidth - (index > 0 ? 5 : 6)) > 0 ? (evt.span * cellWidth - (index > 0 ? 5 : 6)) : 0;
                        let top = marginTop + idx * config.eventItemLineHeight;
                        let eventItem = (
                            <DnDSource
                                {...this.props}
                                key={evt.eventItem.id}
                                eventItem={evt.eventItem}
                                isStart={isStart}
                                isEnd={isEnd}
                                isInPopover={false}
                                left={left}
                                width={width}
                                top={top}
                                leftIndex={index}
                                rightIndex={index + evt.span}
                            />
                        )
                        eventList.push(eventItem);
                    }
                });
            }
        });

        return (
            <tr>
                <td style={{width: rowWidth}}>
                    {connectDropTarget(
                        <div
                            ref={this.eventContainerRef}
                            className="event-container"
                            style={{height: resourceEvents.rowHeight}}
                        >
                            {selectedSlot && selectedSlot.slotId === resourceEvents.slotId && (
                                <SelectedArea
                                    background={config.selectedAreaColor}
                                    left={selectedSlot.left}
                                    width={selectedSlot.width}
                                />
                            )}
                            {isSelecting && (
                                <SelectedArea
                                    background={config.isSelectingAreaColor}
                                    left={left}
                                    width={width}/>
                            )}
                            {eventList}
                        </div>
                    )}
                </td>
            </tr>
        );
    }
}

export default ResourceEvents
