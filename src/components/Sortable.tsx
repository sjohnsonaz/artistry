import * as React from 'react';

import Draggable from './Draggable';

export interface ISortableProps {
    items: any[];
}

export default class Sortable extends React.Component<ISortableProps, any> {
    render() {
        return (
            <div>
                {this.props.items.map((item) => {
                    <Draggable item={item} />
                })}
            </div>
        );
    }
}
