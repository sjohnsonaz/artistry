import * as React from 'react';

import Sortable from '../../../../components/Sortable';

export interface ISortableViewProps {

}

export default class SortableView extends React.Component<ISortableViewProps, any>{
    render() {
        return (
            <Sortable items={[1]} />
        );
    }
}
