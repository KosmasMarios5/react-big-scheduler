/* eslint-disable no-restricted-globals */
import React, {Component} from 'react'

import Scheduler, {DATE_FORMAT, ViewTypes} from "./lib";
import moment from "moment";
import "./lib/css/style.css"
import 'moment/locale/el';
import DemoData from "./DemoData";


class Basic extends Component {


    state = {
        events: DemoData.events,
        resources: DemoData.resources,
        date: Date.parse('04 Dec 2017 00:12:00 GMT')
    }

    componentDidMount() {
        moment.locale("el")
        console.log(this.state.date)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.date !== prevState.date) {
            console.log(this.state.date)
        }
    }

    prevClick = () => {
    }

    nextClick = () => {
    }

    onViewChange = (view) => {
    }

    onCellClick = (slotId, slotName, start, end, type, item) => {

        this.setState({
            date: Date.parse(start)
        })
        // if (confirm(`Do you want to create a new event? {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`)) {
        //     const {events} = this.state;
        //     let newFreshId = 0;
        //     events.forEach((item) => {
        //         if (item.id >= newFreshId)
        //             newFreshId = item.id + 1;
        //     });
        //     let newEvent = {
        //         id: newFreshId,
        //         title: 'New event you just created',
        //         start: start,
        //         end: end,
        //         resourceId: slotId,
        //         bgColor: 'purple'
        //     }
        //     this.setState({
        //         events: [
        //             ...events,
        //             newEvent
        //         ]
        //     })
        // }


        console.log(`Clicked slot: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}`);
    }

    updateEventStart = (event, newStart) => {
        if (confirm(`Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`)) {
        }
    }

    updateEventEnd = (event, newEnd) => {
        if (confirm(`Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`)) {
        }
    }

    onMoveEvent = (event, slotId, slotName, start, end) => {
        if (confirm(`Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`)) {

        }
    }

    onScrollRight = (viewType, schedulerContent, maxScrollLeft, next) => {
        if (viewType === ViewTypes.Day) {
            next();
            schedulerContent.scrollLeft = maxScrollLeft - 10;
        }
    }

    onScrollLeft = (viewType, schedulerContent, maxScrollLeft, prev) => {
        if (viewType === ViewTypes.Day) {
            prev();
            schedulerContent.scrollLeft = 10;
        }
    }

    onScrollTop = (schedulerContent, maxScrollTop) => {
        console.log('onScrollTop');
    }

    onScrollBottom = (schedulerContent, maxScrollTop) => {
        console.log('onScrollBottom');
    }

    render() {
        const {events, resources} = this.state;
        return (
            <Scheduler
                events={events}
                resources={resources}
                localeMoment={moment}
                date={moment(this.state.date).format(DATE_FORMAT)}

                onPreviousClick={this.prevClick}
                onNextClick={this.nextClick}

                onSelectDate={this.onSelectDate}
                onViewChange={this.onViewChange}

                updateEventStart={this.updateEventStart}
                updateEventEnd={this.updateEventEnd}
                onMoveEvent={this.onMoveEvent}

                onCellClick={this.onCellClick}

                onScrollLeft={this.onScrollLeft}
                onScrollRight={this.onScrollRight}
                onScrollTop={this.onScrollTop}
                onScrollBottom={this.onScrollBottom}
            />
        )
    }
}

export default Basic
