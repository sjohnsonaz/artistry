import React from 'react';

import ClassNames from '../util/ClassNames';

export interface IBreadcrumbs {
    children?: React.ReactNode;
    id?: string;
    className?: string;
}

const BREADCRUMBS = 'breadcrumbs';

export function Breadcrumbs({ children, id, className }: IBreadcrumbs) {
    const classNames = new ClassNames(className, BREADCRUMBS);

    return (
        <div className={classNames.toString()} id={id}>
            {children}
        </div>
    );
}
