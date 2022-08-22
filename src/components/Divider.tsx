import * as React from 'react';

export interface IDividerProps {
    className?: string;
    id?: string;
}

export default class Divider extends React.Component<IDividerProps, any>{
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('divider');
        return <div className={classNames.join(' ')} id={this.props.id}>{this.props.children}</div>
    }
}