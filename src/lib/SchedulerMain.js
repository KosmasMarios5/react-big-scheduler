import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import DnDContext from './components/dnd/DnDContext'
import ResourceView from './components/resource/ResourceView'
import HeaderView from './components/partials/header/HeaderView'
import BodyView from './components/partials/BodyView'
import AgendaView from './components/agenda/AgendaView'
import Header from "./components/header/header";

class SchedulerMain extends Component {
    constructor(props) {
        super(props);
        const {contentHeight, isSchedulerResponsive} = props;

        this.currentArea = -1;

        this.state = {
            visible: false,
            contentHeight: contentHeight,
            contentScrollbarHeight: 17,
            contentScrollbarWidth: 17,
            resourceScrollbarHeight: 17,
            resourceScrollbarWidth: 17,
            scrollLeft: 0,
            scrollTop: 0,
            documentWidth: document.documentElement.clientWidth,
            documentHeight: document.documentElement.clientHeight,
        };

        if (isSchedulerResponsive)
            window.onresize = this.onWindowResize;
    }

    onWindowResize = (e) => {
        const {setDocumentWidth} = this.props;
        setDocumentWidth(document.documentElement.clientWidth);
        this.setState({
            documentWidth: document.documentElement.clientWidth,
            documentHeight: document.documentElement.clientHeight,
        });
    }

    static propTypes = {
        prevClick: PropTypes.func.isRequired,
        nextClick: PropTypes.func.isRequired,
        onViewChange: PropTypes.func.isRequired,
        onSelectDate: PropTypes.func.isRequired,
        onSetAddMoreState: PropTypes.func,
        updateEventStart: PropTypes.func,
        updateEventEnd: PropTypes.func,
        moveEvent: PropTypes.func,
        movingEvent: PropTypes.func,
        newEvent: PropTypes.func,
        subtitleGetter: PropTypes.func,
        eventItemClick: PropTypes.func,
        viewEventClick: PropTypes.func,
        viewEventText: PropTypes.string,
        viewEvent2Click: PropTypes.func,
        viewEvent2Text: PropTypes.string,
        conflictOccurred: PropTypes.func,
        eventItemTemplateResolver: PropTypes.func,
        dndSources: PropTypes.array,
        slotClickedFunc: PropTypes.func,
        toggleExpandFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func,
        nonAgendaCellHeaderTemplateResolver: PropTypes.func,
        onScrollLeft: PropTypes.func,
        onScrollRight: PropTypes.func,
        onScrollTop: PropTypes.func,
        onScrollBottom: PropTypes.func,
    }

    componentDidMount() {
        this.resolveScrollbarSize();
    }

    componentDidUpdate(props, state, s) {
        this.resolveScrollbarSize();

        const {
            headers,
            localeMoment,
            behaviors,
            scrollToSpecialMoment,
            setScrollToSpecialMoment,
            startDate,
            endDate,
            contentCellWidth
        } = this.props;

        if (scrollToSpecialMoment && !!behaviors.getScrollSpecialMomentFunc) {
            if (!!this.schedulerContent && this.schedulerContent.scrollWidth > this.schedulerContent.clientWidth) {
                let start = localeMoment(startDate).startOf('day'),
                    end = localeMoment(endDate).endOf('day'),
                    specialMoment = behaviors.getScrollSpecialMomentFunc(localeMoment, start, end);
                if (specialMoment >= start && specialMoment <= end) {
                    let index = 0;
                    headers.forEach((item) => {
                        let header = localeMoment(item.time);
                        if (specialMoment >= header)
                            index++;
                    })
                    this.schedulerContent.scrollLeft = (index - 1) * contentCellWidth;
                    setScrollToSpecialMoment(false);
                }
            }
        }
    }

    resolveScrollbarSize = () => {
        let contentScrollbarHeight = 17,
            contentScrollbarWidth = 17,
            resourceScrollbarHeight = 17,
            resourceScrollbarWidth = 17,
            contentHeight = this.props.contentHeight;

        if (!!this.schedulerContent) {
            contentScrollbarHeight = this.schedulerContent.offsetHeight - this.schedulerContent.clientHeight;
            contentScrollbarWidth = this.schedulerContent.offsetWidth - this.schedulerContent.clientWidth;
        }
        if (!!this.schedulerResource) {
            resourceScrollbarHeight = this.schedulerResource.offsetHeight - this.schedulerResource.clientHeight;
            resourceScrollbarWidth = this.schedulerResource.offsetWidth - this.schedulerResource.clientWidth;
        }
        if (!!this.schedulerContentBgTable && !!this.schedulerContentBgTable.offsetHeight) {
            contentHeight = this.schedulerContentBgTable.offsetHeight;
        }

        let tmpState = {};
        let needSet = false;
        if (contentScrollbarHeight !== this.state.contentScrollbarHeight) {
            tmpState = {...tmpState, contentScrollbarHeight: contentScrollbarHeight};
            needSet = true;
        }
        if (contentScrollbarWidth !== this.state.contentScrollbarWidth) {
            tmpState = {...tmpState, contentScrollbarWidth: contentScrollbarWidth};
            needSet = true;
        }
        if (contentHeight !== this.state.contentHeight) {
            tmpState = {...tmpState, contentHeight: contentHeight};
            needSet = true;
        }
        if (resourceScrollbarHeight !== this.state.resourceScrollbarHeight) {
            tmpState = {...tmpState, resourceScrollbarHeight: resourceScrollbarHeight};
            needSet = true;
        }
        if (resourceScrollbarWidth !== this.state.resourceScrollbarWidth) {
            tmpState = {...tmpState, resourceScrollbarWidth: resourceScrollbarWidth};
            needSet = true;
        }
        if (needSet)
            this.setState(tmpState);
    }

    schedulerHeadRef = (element) => {
        this.schedulerHead = element;
    }

    onSchedulerHeadMouseOver = () => {
        this.currentArea = 2;
    }

    onSchedulerHeadMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerHeadScroll = (proxy, event) => {
        if ((this.currentArea === 2 || this.currentArea === -1) && this.schedulerContent.scrollLeft != this.schedulerHead.scrollLeft)
            this.schedulerContent.scrollLeft = this.schedulerHead.scrollLeft;
    }

    schedulerResourceRef = (element) => {
        this.schedulerResource = element;
    }

    onSchedulerResourceMouseOver = () => {
        this.currentArea = 1;
    }

    onSchedulerResourceMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerResourceScroll = (proxy, event) => {
        if ((this.currentArea === 1 || this.currentArea === -1) && this.schedulerContent.scrollTop != this.schedulerResource.scrollTop)
            this.schedulerContent.scrollTop = this.schedulerResource.scrollTop;
    }

    schedulerContentRef = (element) => {
        this.schedulerContent = element;
    }

    schedulerContentBgTableRef = (element) => {
        this.schedulerContentBgTable = element;
    }

    onSchedulerContentMouseOver = () => {
        this.currentArea = 0;
    }

    onSchedulerContentMouseOut = () => {
        this.currentArea = -1;
    }

    onSchedulerContentScroll = (proxy, event) => {
        if (this.currentArea === 0 || this.currentArea === -1) {
            if (this.schedulerHead.scrollLeft !== this.schedulerContent.scrollLeft)
                this.schedulerHead.scrollLeft = this.schedulerContent.scrollLeft;
            if (this.schedulerResource.scrollTop !== this.schedulerContent.scrollTop)
                this.schedulerResource.scrollTop = this.schedulerContent.scrollTop;
        }

        const {onScrollLeft, onScrollRight, onScrollTop, onScrollBottom} = this.props;
        const {scrollLeft, scrollTop} = this.state;
        if (this.schedulerContent.scrollLeft !== scrollLeft) {
            if (this.schedulerContent.scrollLeft === 0 && typeof onScrollLeft !== "undefined") {
                onScrollLeft(this.schedulerContent, this.schedulerContent.scrollWidth - this.schedulerContent.clientWidth);
            }
            if (this.schedulerContent.scrollLeft === this.schedulerContent.scrollWidth - this.schedulerContent.clientWidth && onScrollRight != undefined) {
                onScrollRight(this.schedulerContent, this.schedulerContent.scrollWidth - this.schedulerContent.clientWidth);
            }
        } else if (this.schedulerContent.scrollTop !== scrollTop) {
            if (this.schedulerContent.scrollTop === 0 && typeof onScrollTop !== "undefined") {
                onScrollTop(this.schedulerContent, this.schedulerContent.scrollHeight - this.schedulerContent.clientHeight);
            }
            if (this.schedulerContent.scrollTop === this.schedulerContent.scrollHeight - this.schedulerContent.clientHeight && onScrollBottom != undefined) {
                onScrollBottom(this.schedulerContent, this.schedulerContent.scrollHeight - this.schedulerContent.clientHeight);
            }
        }
        this.setState({
            scrollLeft: this.schedulerContent.scrollLeft,
            scrollTop: this.schedulerContent.scrollTop
        });
    }

    onViewChange = (item) => {
        // let viewType = parseInt(e.target.value.charAt(0));
        // let showAgenda = e.target.value.charAt(1) === '1';
        // let isEventPerspective = e.target.value.charAt(2) === '1';
        this.props.onViewChange(item.viewType, item.showAgenda, item.isEventPerspective);
    }

    goNext = () => {
        const {nextClick} = this.props;
        nextClick();
    }

    goBack = () => {
        const {prevClick} = this.props;
        prevClick();
    }

    handleVisibleChange = (visible) => {
        this.setState({visible});
    }

    onSelect = (date) => {
        this.setState({
            visible: false,
        });

        const {onSelectDate} = this.props;
        onSelectDate(date);
    }

    render() {
        const {width, dateLabel, renderData, viewType, showAgenda, isEventPerspective, config} = this.props;

        let tbodyContent = <tr/>;
        if (showAgenda) {
            tbodyContent = (
                <AgendaView
                    {...this.props}
                />
            )
        } else {
            let {resourceTableWidth, schedulerWidth} = this.props;
            let schedulerContainerWidth = width - resourceTableWidth + 1;

            let contentScrollbarHeight = this.state.contentScrollbarHeight,
                contentScrollbarWidth = this.state.contentScrollbarWidth,
                resourceScrollbarHeight = this.state.resourceScrollbarHeight,
                resourceScrollbarWidth = this.state.resourceScrollbarWidth,
                contentHeight = this.state.contentHeight;
            let resourcePaddingBottom = resourceScrollbarHeight === 0 ? contentScrollbarHeight : 0;
            let contentPaddingBottom = contentScrollbarHeight === 0 ? resourceScrollbarHeight : 0;
            let schedulerContentStyle = {
                overflow: 'auto',
                margin: "0px",
                position: "relative",
                paddingBottom: contentPaddingBottom
            };
            let resourceContentStyle = {
                overflowX: "auto",
                overflowY: "auto",
                width: resourceTableWidth + resourceScrollbarWidth - 2,
                margin: `0px -${contentScrollbarWidth}px 0px 0px`
            };
            if (config.schedulerMaxHeight > 0) {
                schedulerContentStyle = {
                    ...schedulerContentStyle,
                    maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                };
                resourceContentStyle = {
                    ...resourceContentStyle,
                    maxHeight: config.schedulerMaxHeight - config.tableHeaderHeight
                };
            }

            tbodyContent = (
                <tr>
                    <td style={{width: resourceTableWidth, verticalAlign: 'top'}}>
                        <div className="resource-view">
                            <div style={{
                                overflow: "hidden",
                                borderBottom: "1px solid #e9e9e9",
                                height: config.tableHeaderHeight
                            }}>
                                <div style={{
                                    overflowX: "scroll",
                                    overflowY: "hidden",
                                    margin: `0px 0px -${contentScrollbarHeight}px`
                                }}>
                                    <table className="resource-table">
                                        <thead>
                                        <tr style={{height: config.tableHeaderHeight}}>
                                            <th className="rbc-header">
                                                <span>
                                                    {isEventPerspective ? config.taskName : config.resourceName}
                                                </span>
                                            </th>
                                        </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div
                                style={resourceContentStyle}
                                ref={this.schedulerResourceRef}
                                onMouseOver={this.onSchedulerResourceMouseOver}
                                onMouseOut={this.onSchedulerResourceMouseOut}
                                onScroll={this.onSchedulerResourceScroll}>
                                <ResourceView
                                    {...this.props}
                                    contentScrollbarHeight={resourcePaddingBottom}
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="scheduler-view" style={{width: schedulerContainerWidth, verticalAlign: 'top'}}>
                            <div style={{
                                overflow: "hidden",
                                borderBottom: "1px solid #e9e9e9",
                                height: config.tableHeaderHeight
                            }}>
                                <div style={{
                                    overflowX: "scroll",
                                    overflowY: "hidden",
                                    margin: `0px 0px -${contentScrollbarHeight}px`
                                }} ref={this.schedulerHeadRef} onMouseOver={this.onSchedulerHeadMouseOver}
                                     onMouseOut={this.onSchedulerHeadMouseOut} onScroll={this.onSchedulerHeadScroll}>
                                    <div style={{
                                        paddingRight: `${contentScrollbarWidth}px`,
                                        width: schedulerWidth + contentScrollbarWidth
                                    }}>
                                        <table className="scheduler-bg-table">
                                            <HeaderView {...this.props}/>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div style={schedulerContentStyle} ref={this.schedulerContentRef}
                                 onMouseOver={this.onSchedulerContentMouseOver}
                                 onMouseOut={this.onSchedulerContentMouseOut} onScroll={this.onSchedulerContentScroll}>
                                <div style={{width: schedulerWidth, height: contentHeight}}>
                                    <div className="scheduler-content">
                                        <table className="scheduler-content-table">
                                            <tbody>
                                            {renderData
                                                // .filter(o => o.expanded)
                                                .map((item) => (
                                                    <DnDContext
                                                        {...this.props}
                                                        key={item.slotId}
                                                        resourceEvents={item}
                                                    />
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="scheduler-bg">
                                        <table
                                            className="scheduler-bg-table"
                                            style={{width: schedulerWidth}}
                                            ref={this.schedulerContentBgTableRef}
                                        >
                                            <BodyView {...this.props}/>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            );
        }

        return (
            <div className="rbc-scheduler">
                {config.headerEnabled && (
                    <Header
                        dateLabel={dateLabel}
                        isEventPerspective={isEventPerspective}
                        showAgenda={showAgenda}
                        viewType={viewType}
                        views={config.views}
                        messages={config.messages}
                        onViewChange={this.onViewChange}
                        selectedDate={this.props.selectedDate}

                        goBack={this.goBack}
                        goNext={this.goNext}
                    />
                )}
                <table id="RBS-Scheduler-root" style={{width: `${width}px`}}>
                    <tbody>
                    {tbodyContent}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SchedulerMain