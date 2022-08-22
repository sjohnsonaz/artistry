import * as React from 'react';

export interface ICardTitleProps {
    id?: string;
    className?: string;
}

export default class CardTitle extends React.Component<ICardTitleProps, any> {
    render() {
        let {
            id,
            className
        } = this.props;
        let classNames = className ? [className] : [];
        classNames.push('card-title');

        return (
            <header className={classNames.join(' ')} id={id}>
                {this.props.children}
            </header>
        );
    }
}