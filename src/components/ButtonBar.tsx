import React from 'react';

import ClassNames from '../util/ClassNames';

export interface IButtonBarProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
}

const BUTTON_BAR = 'button-bar';

export function ButtonBar({ children, className, id }: IButtonBarProps) {
    const classNames = new ClassNames(className, BUTTON_BAR);

    return (
        <div className={classNames.toString()} id={id}>
            {children}
        </div>
    );
}
