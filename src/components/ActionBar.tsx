import React from 'react';

import ClassNames from '../util/ClassNames';

export interface IActionBarProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    direction?: 'forward' | 'reverse';
    align?:
        | 'start'
        | 'end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    displaySize?: 'default' | 'small' | 'large';
}

const ACTION_BAR = 'action-bar';

export function ActionBar({
    children,
    id,
    className,
    direction,
    align,
    displaySize,
}: IActionBarProps) {
    const classNames = new ClassNames(className, ACTION_BAR);

    return (
        <div
            className={classNames.toString()}
            id={id}
            data-direction={direction}
            data-align={align}
            data-size={displaySize}
        >
            {children}
        </div>
    );
}
