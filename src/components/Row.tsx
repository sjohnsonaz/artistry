import * as React from 'react';

export interface IRowProps {
    className?: string;
    id?: string;
    reverse?: boolean;
}

export default class Row extends React.Component<IRowProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        if (!this.props.reverse) {
            classNames.push('row');
        } else {
            classNames.push('row-reverse');
        }
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.props.children}</div>
    }
}