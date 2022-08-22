import * as React from 'react';

export interface IButtonBarProps {
    className?: string;
    id?: string;
}

export default class ButtonBar extends React.Component<IButtonBarProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('button-bar');
        let className = classNames.join(' ');
        return <div className={className} id={this.props.id}>{this.props.children}</div>
    }
}
