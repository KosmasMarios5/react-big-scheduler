import React from 'react';
import ReactDOM from 'react-dom';
import {HTML5Backend} from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd'
import Basic from "./Basic";

ReactDOM.render(
    <React.StrictMode>
        <DndProvider backend={HTML5Backend}>
            <Basic />
        </DndProvider>
    </React.StrictMode>,
    document.getElementById('root')
);