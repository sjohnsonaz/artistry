import * as React from 'react';

export interface IEventContainer {
    events: string | string[];
    preventDefault?: boolean;
    stopPropagation?: boolean;
    block?: boolean;
}

export default class EventContainer extends React.Component<IEventContainer, any> {
    eventHandler = (event: React.SyntheticEvent) => {
        if (this.props.preventDefault) {
            event.preventDefault();
        }
        if (this.props.stopPropagation) {
            event.stopPropagation();
        }
    }
    eventsToHash(events: string | string[]) {
        let hash = {};
        if (typeof events === 'string') {
            events = [events];
        }
        events.forEach(event => {
            hash[event] = this.eventHandler;
        });
        return hash;
    }

    render() {
        let {
            block,
            events
        } = this.props;
        if (block) {
            return (
                <div {...this.eventsToHash(events)}>
                    {this.props.children}
                </div>
            );
        } else {
            return (
                <span {...this.eventsToHash(events)}>
                    {this.props.children}
                </span>
            );
        }
    }
}