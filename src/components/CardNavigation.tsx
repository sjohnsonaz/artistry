import * as React from 'react';

export interface ICardNavigationProps {
    id?: string;
    className?: string;
    align?: 'start' | 'end';
}

export default class CardNavigation extends React.Component<ICardNavigationProps, any> {
    render() {
        let {
            id,
            className,
            align
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card-nav');

        if (align === 'end') {
            classNames.push('card-nav-align-end');
        }

        return (
            <nav className={classNames.join(' ')} id={id}>
                {this.props.children}
            </nav>
        );
    }
}