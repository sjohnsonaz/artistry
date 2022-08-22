import * as React from 'react';
import ClassNames from '../util/ClassNames';

export interface ISpacerProps {
    className?: string;
    id?: string;
    list?: boolean;
}

export default class Spacer extends React.Component<ISpacerProps, any> {
    render() {
        let {
            className,
            id,
            list
        } = this.props;
        let classNames = new ClassNames(className, 'spacer');
        if (list) {
            return (
                <li className={classNames.toString()} id={id}></li>
            );
        } else {
            return (
                <div className={classNames.toString()} id={id}></div>
            );
        }
    }
}
