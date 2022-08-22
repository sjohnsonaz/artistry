import * as React from 'react';


export interface IActionBarProps {
    className?: string;
    id?: string;
    direction?: 'forward' | 'reverse';
    align?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    displaySize?: 'default' | 'small' | 'large';
}

export default class ActionBar extends React.Component<IActionBarProps, any>{
    render() {
        let {
            id,
            className,
            direction,
            align,
            displaySize
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('action-bar');

        return (
            <div
                className={classNames.join(' ')}
                id={id}
                data-direction={direction}
                data-align={align}
                data-size={displaySize}
            >
                {this.props.children}
            </div>
        );
    }
}