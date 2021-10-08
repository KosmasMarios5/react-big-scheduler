import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Basic from './examples/Basic'
// import Readonly from './examples/Readonly'
// import Locale from './examples/Locale'
// import Views from './examples/Views'
// import CustomHeader from './examples/CustomHeader'
// import CustomTableHeaders from './examples/CustomTableHeaders'
// import CustomEventStyle from './examples/CustomEventStyle'
// import AddResource from './examples/AddResource'
// import DragAndDrop from './examples/DragAndDrop'
// import Summary from './examples/Summary'
// import AddMore from './examples/AddMore'
// import OverlapCheck from './examples/OverlapCheck'
// import NoCrossSlotMove from './examples/NoCrossSlotMove'
// import FreezeFirstRow from './examples/FreezeFirstRow'
// import ResourceClickable from './examples/ResourceClickable'
// import HideWeekends from './examples/HideWeekends'
// import CustomTimeWindow from './examples/CustomTimeWindow'
// import InfiniteScroll from './examples/InfiniteScroll'
// import InfiniteScroll2 from './examples/InfiniteScroll2'
// import ComingSoon from './examples/ComingSoon'
// import CustomPopoverStyle from './examples/CustomPopoverStyle'
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'

ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Basic}/>
                    {/*<Route path="/readonly" component={Readonly}/>*/}
                    {/*<Route path="/locale" component={Locale}/>*/}
                    {/*<Route path="/views" component={Views}/>*/}
                    {/*<Route path="/customheader" component={CustomHeader}/>*/}
                    {/*<Route path="/customeventstyle" component={CustomEventStyle}/>*/}
                    {/*<Route path="/addresource" component={AddResource}/>*/}
                    {/*<Route path="/draganddrop" component={DragAndDrop}/>*/}
                    {/*<Route path="/summary" component={Summary}/>*/}
                    {/*<Route path="/addmore" component={AddMore}/>*/}
                    {/*<Route path="/overlapcheck" component={OverlapCheck}/>*/}
                    {/*<Route path="/nocrossslotmove" component={NoCrossSlotMove}/>*/}
                    {/*<Route path="/freezefirstrow" component={FreezeFirstRow}/>*/}
                    {/*<Route path="/resourceclickable" component={ResourceClickable}/>*/}
                    {/*<Route path="/comingsoon" component={ComingSoon}/>*/}
                    {/*<Route path="/customtableheaders" component={CustomTableHeaders}/>*/}
                    {/*<Route path="/hideweekends" component={HideWeekends}/>*/}
                    {/*<Route path="/customtimewindow" component={CustomTimeWindow}/>*/}
                    {/*<Route path="/infinitescroll" component={InfiniteScroll}/>*/}
                    {/*<Route path="/infinitescroll2" component={InfiniteScroll2}/>*/}
                    {/*<Route path="/custompopover" component={CustomPopoverStyle}/>*/}
                </Switch>
            </Router>
        </DndProvider>
    </React.StrictMode>,
    document.getElementById('root')
);