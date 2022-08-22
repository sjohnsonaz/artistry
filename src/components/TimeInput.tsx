import * as React from 'react';
import MaskedInput from './MaskedInput';

export interface ITimeInputProps extends React.HTMLProps<HTMLInputElement> {
    seconds?: boolean;
    value?: string;
    fill?: boolean;
}

export interface ITimeInputState {
}

export default class TimeInput extends React.Component<ITimeInputProps, ITimeInputState> {
    render() {
        let {
            seconds,
            value,
            ...props
        } = this.props;

        let date = new Date(value);

        let timeString = date.toTimeString();

        let mask: string;
        if (seconds) {
            timeString = timeString.substr(0, 8);
            mask = '[[0-23]]:[[0-59]]:[[0-59]]';
        } else {
            timeString = timeString.substr(0, 5);
            mask = '[[0-23]]:[[0-59]]';
        }

        return (
            <MaskedInput
                {...props as any}
                mask={mask}
                value={timeString}
            />
        );
    }
}