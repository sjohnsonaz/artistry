import * as React from 'react';

import ClassNames from '../util/ClassNames';

export type FormRowSize = 'none' | 'small' | 'medium' | 'large' | 'x-large' | 'stacked';

export interface IFormRowProps {
    className?: string;
    id?: string;
    screenSize?: FormRowSize;
}

export default class FormRow extends React.Component<IFormRowProps, any>{
    render() {
        let {
            id,
            className,
            screenSize
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('form-text');

        switch (screenSize) {
            case 'small':
                classNames.add('form-text-sm');
                break;
            case 'medium':
                classNames.add('form-text-md');
                break;
            case 'large':
                classNames.add('form-text-lg');
                break;
            case 'x-large':
                classNames.add('form-text-xl');
                break;
            case 'stacked':
                classNames.add('form-text-stacked');
                break;
        }

        return (
            <div
                className={classNames.toString()}
                id={id}
            >
                {this.props.children}
            </div>
        );
    }
}