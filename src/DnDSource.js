import {DragSource} from 'react-dnd'
import {DATETIME_FORMAT, ViewTypes} from './index_2'
import {DnDTypes} from './DnDTypes'
import EventItem from "./EventItem";


const eventSource = {
    beginDrag: (props) => {
        return props.eventItem;
    },
    endDrag: (props, monitor, component) => {
        if (!monitor.didDrop()) return;

        const item = monitor.getItem();
        const type = monitor.getItemType();

        const {moveEvent, newEvent} = props;
        const {events, config, viewType, localeMoment} = props;
        const {getEventSlotId, getSlotById} = props
        const dropResult = monitor.getDropResult();
        let slotId = dropResult.slotId, slotName = dropResult.slotName;
        let newStart = dropResult.start, newEnd = dropResult.end;
        let initialStart = dropResult.initialStart, initialEnd = dropResult.initialEnd;
        let action = 'New';

        let isEvent = type === DnDTypes.EVENT;
        if (isEvent) {
            const event = item;
            if (config.relativeMove) {
                newStart = localeMoment(event.start).add(localeMoment(newStart).diff(localeMoment(initialStart)), 'ms').format(DATETIME_FORMAT);
            } else {
                if (viewType !== ViewTypes.Day) {
                    let tmpMoment = localeMoment(newStart);
                    newStart = localeMoment(event.start).year(tmpMoment.year()).month(tmpMoment.month()).date(tmpMoment.date()).format(DATETIME_FORMAT);
                }
            }
            newEnd = localeMoment(newStart).add(localeMoment(event.end).diff(localeMoment(event.start)), 'ms').format(DATETIME_FORMAT);

            //if crossResourceMove disabled, slot returns old value
            if (config.crossResourceMove === false) {

                slotId = getEventSlotId(item);
                slotName = undefined;
                let slot = getSlotById(slotId);
                if (!!slot)
                    slotName = slot.name;
            }

            action = 'Move';
        }

        let hasConflict = false;
        if (config.checkConflict) {
            let start = localeMoment(newStart),
                end = localeMoment(newEnd);

            events.forEach((e) => {
                if (getEventSlotId(e) === slotId && (!isEvent || e.id !== item.id)) {
                    let eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if ((start >= eStart && start < eEnd) || (end > eStart && end <= eEnd) || (eStart >= start && eStart < end) || (eEnd > start && eEnd <= end))
                        hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            const {conflictOccurred} = props;
            if (typeof conflictOccurred !== "undefined") {
                conflictOccurred(action, item, type, slotId, slotName, newStart, newEnd);
            } else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
        } else {
            if (isEvent) {
                if (moveEvent !== undefined) {
                    moveEvent(item, slotId, slotName, newStart, newEnd);
                }
            } else {
                if (newEvent !== undefined)
                    newEvent(slotId, slotName, newStart, newEnd, type, item);
            }
        }
    },
    canDrag: (props, monitor) => {
        const {config, eventItem, isResizing, resourceEvents} = props;
        if (isResizing) return false;
        return config.movable && (typeof resourceEvents === "undefined" || !resourceEvents.groupOnly) && (typeof eventItem.movable === "undefined" || eventItem.movable !== false);
    },
}

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDragSource: connect.dragSource(),
        // You can ask the monitor about the current drag state:
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview()
    }
}

export default DragSource(DnDTypes.EVENT, eventSource, collect)(EventItem)