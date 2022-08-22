import * as React from 'react';

import Closeable from './Closeable';
import { IGridExternalProps, gridConfig } from './Grid';
import { IDisableable, disabledClass } from '../abilities/Disabled';

export type CardType = 'default' | 'success' | 'info' | 'warning' | 'danger';

export type CardHandle = 'default' | 'top' | 'right' | 'bottom' | 'left';

export interface ICardProps extends IGridExternalProps, IDisableable {
    /** id of the root element */
    id?: string;

    /** classes to add to the root element */
    className?: string;

    /** JSX to display in the header */
    header?: any;

    /** JSX to display in the footer */
    footer?: any;

    /** determines whether the card should have padding*/
    space?: boolean;

    /** determines whether the card should fill horizontally */
    fill?: boolean;

    /** JSX to display in the nav section */
    nav?: any;

    type?: CardType;
    handle?: CardHandle;
    square?: boolean;

    /** determines whether the card is clickable */
    clickable?: boolean;

    /** the click event handler */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => any;
}

/** Displays a Card */
export default class Card extends React.Component<ICardProps, any> {
    onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    render() {
        let {
            id,
            className,
            header,
            footer,
            space,
            fill,
            nav,
            type,
            handle,
            square,
            grid,
            clickable,
            disabled
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card');

        let innerClassNames = ['card-content'];
        if (space) {
            innerClassNames.push('card-content-space');
        }
        if (fill) {
            classNames.push('fill');
        }
        if (type) {
            classNames.push('card-type-' + type);
        }
        if (handle) {
            classNames.push('card-handle-' + handle);
        }
        if (square) {
            classNames.push('card-square');
        }
        if (grid) {
            gridConfig(innerClassNames, this.props);
        }
        if (clickable) {
            classNames.push('clickable');
        }
        disabledClass(disabled, classNames);

        return (
            <div className={classNames.join(' ')} id={id} onClick={this.onClick}>
                {header ? <header>{header}</header> : null}
                <div className={innerClassNames.join(' ')}>
                    {this.props.children}
                </div>
                {nav ? <nav className='card-nav'>{nav}</nav> : null}
                {footer ? <footer>{footer}</footer> : null}
            </div>
        );
    }
}