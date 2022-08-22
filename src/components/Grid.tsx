import * as React from 'react';

export type GridSize = 'default' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large';

export interface IGridProps {
    className?: string;
    id?: string;
    columns?: number;
    screenSize?: GridSize;
    fillWidth?: boolean;
    space?: boolean;
}

export default class Grid extends React.Component<IGridProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        grid(classNames, this.props.columns, this.props.screenSize, this.props.space);

        if (this.props.fillWidth) {
            classNames.push('fill-width');
        }

        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}

function grid(classNames: string[], columns: number, screenSize?: GridSize, space?: boolean) {
    columns = columns || 12;
    switch (screenSize) {
        case 'x-small':
            classNames.push('grid-xs-' + columns);
            break;
        case 'small':
            classNames.push('grid-sm-' + columns);
            break;
        case 'medium':
            classNames.push('grid-md-' + columns);
            break;
        case 'large':
            classNames.push('grid-lg-' + columns);
            break;
        case 'x-large':
            classNames.push('grid-xl-' + columns);
            break;
        default:
            classNames.push('grid-' + columns);
            break;
    }

    if (space) {
        classNames.push('grid-space');
    }
}

export interface IGridExternalProps {
    grid?: boolean;
    gridColumns?: number;
    gridSize?: GridSize;
    gridSpace?: boolean;
}

export function gridConfig(classNames: string[], props: IGridExternalProps) {
    grid(classNames, props.gridColumns, props.gridSize, props.gridSpace);
}