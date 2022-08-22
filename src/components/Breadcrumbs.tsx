import * as React from 'react';

export interface IBreadcrumbs {
    id?: string;
    className?: string;
}

export default class Breadcrumbs extends React.Component<IBreadcrumbs, any> {
    render() {
        let {
            id,
            className
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('breadcrumbs');

        return (
            <div
                className={classNames.join(' ')}
                id={id}
            >
                {this.props.children}
            </div>
        );
    }
}