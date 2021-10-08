import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const withDragDropContext = (Component) => (props) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <Component {...props}/>
        </DndProvider>
    )
}
export default withDragDropContext(HTML5Backend);