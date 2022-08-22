import * as React from 'react';

export interface IToggleProps extends React.HTMLProps<HTMLInputElement>{
}

export default class Toggle extends React.Component<IToggleProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('toggle');

        return (
            <div className={classNames.join(' ')}>
                <label>
                    <div className="toggle-box">
                        <input type="checkbox" {...this.props} />
                        <div className="toggle-button"> </div>
                    </div>
                </label>
            </div>
        );
    }
}
