import * as React from 'react';

export interface IIconProps {
    pack?: string;
    name: string;
}

export default class Icon extends React.Component<IIconProps, any> {
    render() {
        let {
            pack,
            name
        } = this.props;

        let iconName;
        if (pack) {
            iconName = '#' + pack + '___' + name;
        } else {
            iconName = '#' + name;
        }

        return (
            <i className="icon">
                <svg xmlns="http://www.w3.org/2000/svg">
                    <use xlinkHref={iconName} />
                </svg>
            </i>
        );
    }
}