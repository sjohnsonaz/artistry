import * as React from 'react';
import DepthStack from '../util/DepthStack';

export interface IDepthStackInterceptorProps {

}

export default class DepthStackInterceptor extends React.Component<IDepthStackInterceptorProps, any> {
    rootRef: React.RefObject<HTMLDivElement> = React.createRef();

    handleClick = (event: MouseEvent) => {
        let root = this.rootRef.current;
        if (root) {
            root.dispatchEvent(event);
        }
    }

    handleKeyDown = (event: KeyboardEvent) => {
        let root = this.rootRef.current;
        if (root) {
            root.dispatchEvent(event);
        }
    }

    onClick = (event: React.MouseEvent<HTMLElement>) => {
        DepthStack.close(event);
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
        DepthStack.close(event);
    }

    componentDidMount() {
        window.addEventListener('click', this.handleClick);
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleClick);
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <div
                ref={this.rootRef}
                onClick={this.onClick}
                onKeyDown={this.onKeyDown}
            >
                {this.props.children}
            </div>
        );
    }
}