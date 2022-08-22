import * as React from 'react';

export interface IRangeProps extends React.HTMLProps<HTMLInputElement> {

}

export default class Range extends React.Component<IRangeProps, any> {
    render() {
        return (
            <input type="range" className="range" {...this.props} />
        );
    }
}
