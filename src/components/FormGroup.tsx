import * as React from 'react';

import ClassNames from '../util/ClassNames';
import { AlignType } from '../util/Align';

import FormText, { FormTextTheme } from './FormText';

export interface IFormGroupProps {
    className?: string;
    id?: string;
    label?: any;
    text?: any;
    textAlign?: AlignType;
    theme?: FormTextTheme;
    nonLabel?: boolean;
    inline?: boolean;
    stacked?: boolean;
}

export default class FormGroup extends React.Component<IFormGroupProps, any> {
    render() {
        let classNames = new ClassNames(this.props.className);
        classNames.add('form-group');

        if (this.props.inline) {
            classNames.add('form-group-inline');
        }

        if (this.props.stacked) {
            classNames.add('form-group-stacked');
        }

        let input = (
            <div className="form-input">
                {this.props.children}
            </div>
        );

        let label;
        if (this.props.label) {
            if (this.props.nonLabel) {
                label = (
                    <div className="form-title">
                        {this.props.label}
                    </div>
                );
            } else {
                label = (
                    <label className="form-title">
                        {this.props.label}
                    </label>
                );
            }
        }

        return (
            <div className={classNames.toString()} id={this.props.id}>
                {label}
                {input}
                {this.props.text ?
                    <FormText
                        theme={this.props.theme}
                        align={this.props.textAlign}
                    >
                        {this.props.text}
                    </FormText> :
                    null}
            </div>
        );
    }
}
