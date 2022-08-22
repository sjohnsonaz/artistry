import React from 'react';

import ClassNames from '../util/ClassNames';

export interface ICardContainerProps {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    space?: boolean;
    minWidth?: number | string;
    maxWidth?: number | string;
}

export function CardContainer({
    children,
    id,
    className,
    space,
    minWidth,
    maxWidth,
}: ICardContainerProps) {
    const classNames = new ClassNames(className, 'card-container');

    if (space) {
        classNames.add('space');
    }

    if (minWidth && typeof minWidth === 'number') {
        minWidth += 'px' as any;
    }

    if (maxWidth && typeof maxWidth === 'number') {
        maxWidth += 'px' as any;
    }

    return (
        <div
            className={classNames.toString()}
            id={id}
            style={
                {
                    '--card-min-width': minWidth,
                    '--card-max-width': maxWidth,
                } as any
            }
        >
            {children}
        </div>
    );
}
