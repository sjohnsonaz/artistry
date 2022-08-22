import * as React from 'react';

export interface ICodeProps extends React.HTMLProps<HTMLElement> {

}

export default class Code extends React.Component<ICodeProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('code');
        return (
            <pre className={classNames.join(' ')} {...this.props as any}>
                {this.props.children instanceof Array ?
                    this.props.children.map(child => <code>{child}</code>)
                    : <code>{this.props.children}</code>}
            </pre>
        );
    }
}
