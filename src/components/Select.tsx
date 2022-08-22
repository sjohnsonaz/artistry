import * as React from 'react';

export interface ISelectProps<T> {
    id?: string;
    className?: string;
    data: T[];
    template?: (value: T, index: number, data: T[]) => any;
    value?: string | number | string[];
    valueProp?: keyof T;
    displayProp?: keyof T;
    onChange?: (option: T, event?: React.ChangeEvent<HTMLSelectElement>) => any;
    allowEmpty?: boolean;
    emptyValue?: T | string | number | string[];
}

export default class Select<T, U> extends React.Component<ISelectProps<T>> {
    onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let {
            data,
            onChange,
            valueProp
        } = this.props;

        if (onChange) {
            let value = event.target.value;
            if (valueProp) {
                let option = data.find(option => option[valueProp] as any == value);
                onChange(option, event);
            } else {
                let option = data.find(option => option as any == value);
                onChange(option, event);
            }
        }
    }

    render() {
        let {
            id,
            className,
            data,
            template,
            value,
            valueProp,
            allowEmpty,
            emptyValue
        } = this.props;

        let classNames = className ? [className] : [];

        classNames.push('input');

        let emptyOption = undefined;
        if (allowEmpty) {
            let emptyString: string = undefined;
            switch (typeof emptyValue) {
                case 'object':
                    if (emptyValue) {
                        let prop = (emptyValue as T)[valueProp];
                        if (prop) {
                            emptyString = prop.toString();
                        }
                    }
                    break;
                case 'string':
                    emptyString = emptyValue;
                    break;
                case 'number':
                    emptyString = emptyValue.toString();
                    break;
            }
            emptyOption = (
                <option key="_empty_option" value={emptyString}></option>
            )
        }

        return (
            <select
                id={id}
                className={classNames.join(' ')}
                value={value ? value.toString() : undefined}
                onChange={this.onChange}
            >
                {emptyOption}
                {template ?
                    data.map(template) :
                    data.map(option => {
                        if (valueProp) {
                            let optionValue = option[valueProp];
                            return (
                                <option key={optionValue as any} value={optionValue as any}>{optionValue}</option>
                            );
                        } else {
                            return (
                                <option key={option as any} value={option as any}>{option}</option>
                            );
                        }
                    })}
            </select>
        );
    }
}