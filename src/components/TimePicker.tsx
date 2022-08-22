import * as React from 'react';

export interface ITimePickerProps {
    minuteInterval?: number;
    value: Date;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>, date: Date) => any;
    utc?: boolean;
}

export interface ITimePickerState {
}

function getState(value: Date, utc: boolean) {
    let currentHour = utc ? value.getUTCHours() : value.getHours();
    let currentMinute = utc ? value.getUTCMinutes() : value.getMinutes();
    let currentMeridiem = currentHour > 11 ? true : false;
    currentHour = ((currentHour + 12 - 1) % 12) + 1;

    return {
        hours: currentHour,
        minutes: currentMinute,
        meridiem: currentMeridiem
    };
}

export default class TimePicker extends React.Component<ITimePickerProps, ITimePickerState> {

    onChangeHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let {
            value,
            utc
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);

        let state = getState(date, utc);

        let hours = parseInt(event.target.value);
        hours %= 12;
        hours = state.meridiem ? hours + 12 : hours;
        date.setHours(hours);

        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    onChangeMinute = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let {
            value
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);
        let minutes = parseInt(event.target.value);
        date.setMinutes(minutes);
        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    onChangeMeridiem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let {
            value,
            utc
        } = this.props;
        let date: Date = new Date(value ? value.toUTCString() : undefined);

        let state = getState(value, utc);

        let meridiemValue = event.target.value;
        let meridiem: boolean;
        switch (meridiemValue) {
            case 'AM':
                meridiem = false;
                break;
            case 'PM':
                meridiem = true;
                break;
        }
        let hours = state.hours % 12;
        hours = meridiem ? hours + 12 : hours;
        date.setHours(hours);
        if (this.props.onChange) {
            this.props.onChange(event, date);
        }
    }

    render() {
        let {
            value,
            utc,
            minuteInterval
        } = this.props;

        let state = getState(value, utc);
        minuteInterval = minuteInterval || 1;

        let hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let minutes = [];
        for (let index = 0; index < 60; index += minuteInterval) {
            minutes.push(index);
        }

        return (
            <span>
                <select
                    className="input"
                    value={state.hours}
                    onChange={this.onChangeHour}
                >
                    {hours.map((hour) => <option value={hour} key={hour}>{prependZero(hour)}</option>)}
                </select>
                <select
                    className="input"
                    value={state.minutes}
                    onChange={this.onChangeMinute}
                >
                    {minutes.map((minute) => <option value={minute} key={minute}>{prependZero(minute)}</option>)}
                </select>
                <select
                    className="input"
                    value={state.meridiem ? 'PM' : 'AM'}
                    onChange={this.onChangeMeridiem}
                >
                    <option value="AM" key="AM">AM</option>
                    <option value="PM" key="PM">PM</option>
                </select>
            </span>
        );
    }
}

function prependZero(value: number) {
    let output = '' + value;
    if (output.length < 2) {
        return '0' + output;
    } else {
        return output;
    }
}