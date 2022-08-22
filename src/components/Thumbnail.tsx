import * as React from 'react';

export interface IThumbnailProps {
    className?: string;
    id?: string;
    src?: string;
}

export default class Thumbnail extends React.Component<IThumbnailProps, any> {
    render() {
        let classNames = this.props.className ? [this.props.className] : [];
        classNames.push('thumbnail');

        return (
            <img className={classNames.join(' ')} id={this.props.id} src={this.props.src} />
        )
    }
}