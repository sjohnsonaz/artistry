import * as React from 'react';

import ClassNames from '../util/ClassNames';

export interface IButtonGroupProps {
    children?: React.ReactNode;
    className?: string;
    id?: string;
    fill?: boolean;
}

const BUTTON_GROUP = 'button-group';
const FILL_WIDTH = 'fill-width';

export function ButtonGroup({
    children,
    className,
    id,
    fill,
}: IButtonGroupProps) {
    const classNames = new ClassNames(className, BUTTON_GROUP);
    if (fill) {
        classNames.add(FILL_WIDTH);
    }

    return (
        <div className={classNames.toString()} id={id}>
            {children}
        </div>
    );
}
