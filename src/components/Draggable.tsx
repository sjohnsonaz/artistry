import * as React from 'react';

export interface IDraggableProps {
    item: any;
}

export default class Draggable extends React.Component<IDraggableProps, any> {
    dragging: boolean = false;

    onDrag = () => {
        this.dragging = true;
    }

    onDragEnd = () => {
        this.dragging = false;
    }

    render() {
        return (
            <div
                draggable
                onDrag={this.onDrag}
                onDragEnd={this.onDragEnd}>
                {this.props.item}
            </div>
        );
    }
}
