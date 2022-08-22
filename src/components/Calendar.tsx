import * as React from 'react';

import Button from './Button';
import ButtonGroup from './ButtonGroup';

type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

var monthNames: Month[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export interface ICalendarProps {
    date?: Date;
    onSelect?: (date: Date) => any;
}

export interface ICalendarState {
    month: number;
    year: number;
    date: Date;
}

export default class Calendar extends React.Component<ICalendarProps, any> {

    constructor(props?: ICalendarProps) {
        super(props);
        var date = this.props.date || new Date(Date.now());
        this.state = {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date
        };
    }

    increaseMonth = () => {
        this.setState({ month: (this.state.month + 1) % 12 });
    }

    decreaseMonth = () => {
        this.setState({ month: (this.state.month + 11) % 12 });
    }

    increaseYear = () => {
        this.setState({ year: this.state.year + 1 });
    }

    decreaseYear = () => {
        this.setState({ year: this.state.year - 1 });
    }

    selectDay = (day) => {
        if (this.props.onSelect) {
            this.props.onSelect(day);
        }
    }

    getDays(year: number, month: number) {
        var firstDay = new Date(year, month, 1);
        var lastDay = new Date(year, month + 1, 0);

        var days = [firstDay];
        for (var index = 2, length = lastDay.getDate(); index < length; index++) {
            days.push(new Date(year, month, index));
        }
        days.push(lastDay);

        return days;
    }

    getWeeks(year: number, month: number) {
        var days = this.getDays(year, month);

        var weeks: Date[][] = [];
        var week: Date[];

        if (days[0].getDay() !== 0) {
            week = [];
            weeks.push(week);
        }
        days.forEach(function (day) {
            if (day.getDay() === 0) {
                week = [];
                weeks.push(week);
            }
            week.push(day);
        });

        return weeks;
    }

    componentWillReceiveProps(nextProps: ICalendarProps): void {
        if (nextProps.date) {
            let year = nextProps.date.getFullYear();
            let month = nextProps.date.getMonth();
            if (
                !this.props.date ||
                this.props.date.getFullYear() !== year ||
                this.props.date.getMonth() !== month
            ) {
                this.setState({
                    year: year,
                    month: month
                });
            }
        }
    }

    render() {
        var weeks = this.getWeeks(this.state.year, this.state.month);
        let years = [];
        let year = this.state.year;
        for (let index = -100, length = 200; index <= length; index++) {
            years.push(year + index);
        }
        if (this.props.date) {
            var selectedDate: ISelectedDate = {
                year: this.props.date.getFullYear(),
                month: this.props.date.getMonth(),
                date: this.props.date.getDate()
            };
        }
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayTime = today.getTime();
        return (
            <div className="calendar">
                <div className="calendar-title">
                    <ButtonGroup>
                        <Button onClick={this.decreaseYear}>-</Button>
                        <select
                            className="input"
                            style={{ flexGrow: 1 }}
                            value={this.state.year}
                            onChange={(event) => {
                                this.setState({
                                    year: parseInt((event.target as any).value)
                                });
                            }}>
                            {years.map(year => <option value={year} key={year}>{year}</option>)}
                        </select>
                        <Button onClick={this.increaseYear}>+</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={this.decreaseMonth}>-</Button>
                        <select
                            className="input"
                            style={{ flexGrow: 1 }}
                            value={this.state.month + 1}
                            onChange={(event) => {
                                this.setState({
                                    month: parseInt((event.target as any).value) - 1
                                });
                            }}>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <Button onClick={this.increaseMonth}>+</Button>
                    </ButtonGroup>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>S</th>
                            <th>M</th>
                            <th>T</th>
                            <th>W</th>
                            <th>T</th>
                            <th>F</th>
                            <th>S</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeks.map((week, index, array) => {
                            return (
                                <tr key={this.state.year + ' ' + this.state.month + ' ' + index}>
                                    {index === 0 && week.length < 7 ?
                                        <td colSpan={7 - week.length}></td>
                                        : undefined}
                                    {week.map((day, index, array) => {
                                        var selected = compareDays(selectedDate, day);
                                        var current = todayTime === day.getTime();
                                        let dayClassName = undefined;
                                        if (selected) {
                                            dayClassName = 'calendar-day-selected';
                                        } else if (current) {
                                            dayClassName = 'calendar-day-current';
                                        }
                                        return (
                                            <td key={this.state.year + ' ' + this.state.month + ' ' + index}>
                                                <a className={dayClassName} onClick={this.selectDay.bind(this, day)}>{day.getDate()}</a>
                                            </td>
                                        );
                                    })}
                                    {index > 0 && week.length < 7 ?
                                        <td colSpan={7 - week.length}></td>
                                        : undefined}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface ISelectedDate {
    year: number;
    month: number;
    date: number;
}

function compareDays(selectedDate: ISelectedDate, date: Date) {
    if (
        selectedDate &&
        selectedDate.year === date.getFullYear() &&
        selectedDate.month === date.getMonth() &&
        selectedDate.date === date.getDate()
    ) {
        return true;
    } else {
        return false;
    }
}