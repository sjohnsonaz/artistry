import * as React from 'react';

import ClassNames from '../util/ClassNames';
import { AlignType, alignClass } from '../util/Align';

export type FormTextTheme = 'default' | 'success' | 'info' | 'warning' | 'danger';

export interface IFormTextProps {
    className?: string;
    id?: string;
    fill?: boolean;
    theme?: FormTextTheme;
    align?: AlignType;
}

export default class FormText extends React.Component<IFormTextProps, any>{
    render() {
        let {
            id,
            className,
            fill,
            theme,
            align
        } = this.props;

        let classNames = new ClassNames(className);
        classNames.add('form-text');

        if (fill) {
            classNames.add('fill');
        }

        if (align) {
            alignClass(align, classNames);
        }

        let _theme: string;
        switch (theme) {
            case 'success':
                _theme = 'success';
                break;
            case 'info':
                _theme = 'info';
                break;
            case 'warning':
                _theme = 'warning';
                break;
            case 'danger':
                _theme = 'danger';
                break;
        }

        return (
            <div
                className={classNames.toString()}
                id={id}
                data-theme={_theme}
            >
                {this.props.children}
            </div>
        );
    }
}