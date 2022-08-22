import * as React from 'react';

import Button from './Button';
import ButtonGroup from './ButtonGroup';
import Input from './Input';
import Icon from './Icon';

export enum RoundingType {
    None = 0,
    Round = 1,
    Floor = 2,
    Ceiling = 3
}

export interface IAmountInputProps {
    id?: string;
    className?: string;
    value?: number;
    minimum?: number;
    maximum?: number;
    onChange?: (value: number, event: React.FormEvent<any>) => void | boolean;
    onIncrement?: (value: number, event: React.MouseEvent<any>) => void | boolean;
    onDecrement?: (value: number, event: React.MouseEvent<any>) => void | boolean;
    incrementText?: string;
    decrementText?: string;
    incrementIcon?: string;
    decrementIcon?: string;
    defaultValue?: number;
    showReset?: boolean;
    hideIncrementIcon?: boolean;
    hideDecrementIcon?: boolean;
    disabled?: boolean;
    disableDecrement?: boolean;
    disableIncrement?: boolean;
    disableInput?: boolean;
    right?: boolean;
    fill?: boolean;
    round?: RoundingType;
    nonZero?: boolean;
    nonNegative?: boolean;
}

export interface IAmountInputState {
    value?: number;
}

export default class AmountInput extends React.Component<IAmountInputProps, IAmountInputState> {
    constructor(props?: IAmountInputProps) {
        super(props);
        let {
            value,
            defaultValue,
            round,
            nonZero,
            nonNegative,
            minimum,
            maximum
        } = props;
        let cleanedValue: number;
        try {
            cleanedValue = cleanValue(value, round, nonZero, nonNegative);
            cleanedValue = fixValueBounds(value, minimum, maximum)
        }
        catch (e) {
            cleanedValue = defaultValue
        }
        this.state = {
            value: cleanedValue
        };
    }

    change = (event: React.FormEvent<any>) => {
        let value = (event.target as any).value;
        let {
            onChange,
            round,
            nonZero,
            nonNegative,
            minimum,
            maximum
        } = this.props;
        if (onChange) {
            try {
                let cleanedValue = cleanValue(value, round, nonZero, nonNegative);
                cleanedValue = fixValueBounds(value, minimum, maximum);
                onChange(cleanedValue, event);
                this.setState({
                    value: value
                });
            }
            catch (e) {
                this.setState({
                    value: value
                });
            }
        }
    }

    increment = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        let {
            value,
            onChange,
            onIncrement,
            round,
            nonZero,
            nonNegative,
            minimum,
            maximum
        } = this.props;
        try {
            let cleanedValue = cleanValue(value, round, nonZero, nonNegative);
            cleanedValue = fixValueBounds(value + 1, minimum, maximum);
            let processChange: boolean;
            if (onIncrement) {
                processChange = onIncrement(cleanedValue, event) as any;
            }
            if (onChange && processChange !== false) {
                onChange(cleanedValue, event);
            }
            this.setState({
                value: cleanedValue
            });
        }
        catch (e) {

        }
    }

    decrement = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        let {
            value,
            onChange,
            onDecrement,
            round,
            nonZero,
            nonNegative,
            minimum,
            maximum
        } = this.props;
        try {
            let cleanedValue = cleanValue(value, round, nonZero, nonNegative);
            cleanedValue = fixValueBounds(value - 1, minimum, maximum);
            let processChange: boolean;
            if (onDecrement) {
                processChange = onDecrement(cleanedValue, event) as any;
            }
            if (onChange && processChange !== false) {
                onChange(cleanedValue, event);
            }
            this.setState({
                value: cleanedValue
            });
        }
        catch (e) {

        }
    }

    reset = (event: React.MouseEvent<any>) => {
        let value = this.props.defaultValue;
        let {
            onChange,
            round,
            nonZero,
            nonNegative,
            minimum,
            maximum
        } = this.props;
        let cleanedValue: number;
        try {
            cleanedValue = cleanValue(value, round, nonZero, nonNegative);
            cleanedValue = fixValueBounds(value, minimum, maximum);
            if (onChange) {
                onChange(cleanedValue, event);
            }
            this.setState({
                value: cleanedValue
            });
        }
        catch (e) {

        }
    }

    componentWillReceiveProps(props: IAmountInputProps) {
        let {
            value,
            defaultValue,
            round,
            nonZero,
            nonNegative,
            minimum,
            maximum
        } = props;
        let cleanedValue: number;
        try {
            cleanedValue = cleanValue(value, round, nonZero, nonNegative);
            cleanedValue = fixValueBounds(value, minimum, maximum);
        }
        catch (e) {
            cleanedValue = defaultValue
        }
        this.setState({
            value: cleanedValue
        });
    }

    render() {
        let {
            id,
            className,
            value,
            minimum,
            maximum,
            incrementText,
            decrementText,
            incrementIcon,
            decrementIcon,
            showReset,
            hideIncrementIcon,
            hideDecrementIcon,
            disabled,
            right,
            disableDecrement: _disableDecrement,
            disableIncrement: _disableIncrement,
            disableInput,
            fill
        } = this.props;

        let disableDecrement = _disableDecrement || disabled || value <= minimum;
        let disableIncrement = _disableIncrement || disabled || value >= maximum;

        let decrementIconFull = hideDecrementIcon ? undefined : ["-"];
        let incrementIconFull = hideIncrementIcon ? undefined : ["+"];

        if (right) {
            let classNames = className ? [className] : [];
            classNames.push('pull-right');
            className = classNames.join(' ');
        }

        return (
            <ButtonGroup id={id} className={className} fill={fill}>
                <Button
                    onClick={this.decrement}
                    disabled={disableDecrement}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {decrementIconFull}
                    {decrementText}
                </Button>
                <Input
                    value={this.state.value}
                    onChange={this.change}
                    disabled={disableInput || disabled}
                    fill={fill}
                />
                <Button
                    theme="primary"
                    onClick={this.increment}
                    disabled={disableIncrement}
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {incrementIconFull}
                    {incrementText}
                </Button>
                {showReset ? <Button><Icon name="times" /> </Button> : null}
            </ButtonGroup>
        );
    }
}

function cleanValue(
    value: any,
    round: RoundingType = 0,
    nonZero: boolean = false,
    nonNegative: boolean = false
) {
    let cleanedValue: number = parseFloat(value);

    if (isNaN(cleanedValue)) {
        throw 'Value is not a number';
    }
    if (!isFinite(cleanedValue)) {
        throw 'Value is not finite'
    }
    if (nonZero && (cleanedValue === 0)) {
        throw 'Value is zero';
    }
    if (nonNegative && (cleanedValue < 0)) {
        throw 'Value is negative';
    }

    switch (round) {
        case RoundingType.Round:
            cleanedValue = Math.round(cleanedValue);
            break;
        case RoundingType.Floor:
            cleanedValue = Math.floor(cleanedValue);
            break;
        case RoundingType.Ceiling:
            cleanedValue = Math.ceil(cleanedValue);
            break;
    }

    return cleanedValue;
}

function fixValueBounds(
    value: number,
    minimum: number,
    maximum: number
) {
    if (typeof minimum === 'number' && value < minimum) {
        value = minimum;
    }
    if (typeof maximum === 'number' && value > maximum) {
        value = maximum;
    }
    return value;
}