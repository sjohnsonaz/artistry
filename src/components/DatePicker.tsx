import * as React from 'react';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

import Calendar, { ICalendarProps } from './Calendar';
import MaskedInput from './MaskedInput';
export { Calendar, ICalendarProps };

export interface IDatePickerProps {
    id?: string;
    className?: string;
    mask?: string;
    date: Date | string;
    fill?: boolean;
    onSelect: (date: Date) => void;
}

export default class DatePicker extends React.Component<IDatePickerProps, any>{
    onSelect = (date: Date) => {
        this.props.onSelect(date);
    }

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
        let value = (event.target as any).value;
        let output = new Date(value);
        if (!isNaN(output.getTime())) {
            this.props.onSelect(output);
        }
    }

    render() {
        let {
            id,
            className
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('popover-trigger');

        var date: Date = undefined;
        switch (typeof this.props.date) {
            case 'object':
                if (this.props.date instanceof Date) {
                    date = this.props.date as Date;
                }
                break;
            case 'string':
                date = new Date(this.props.date as string);
                break;
        }

        return (
            <ButtonGroup
                id={id}
                className={classNames.join(' ')}
                fill={this.props.fill}
            >
                <MaskedInput
                    mask={'[[0-12]]/[[0-31]]/[[0-9999]]'}
                    value={getDateFormatted(date)}
                    fill={this.props.fill}
                    onChange={this.onChange}
                />
                <Button
                    link
                    noTrigger
                    popoverDirection="bottom"
                    popoverAlign="right"
                    popoverFill
                    popoverSpace
                    popover={<Calendar
                        date={date}
                        onSelect={this.onSelect}
                    />}
                >Calendar</Button>
            </ButtonGroup>
        );
    }
}

function getDateFormatted(date: Date) {
    if (date) {
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();

        var day = dd < 10 ? '0' + dd : '' + dd;
        var month = mm < 10 ? '0' + mm : '' + mm;
        return month + '/' + day + '/' + yyyy;
    } else {
        return '__/__/____';
    }
}