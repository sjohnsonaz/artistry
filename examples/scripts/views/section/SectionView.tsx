import * as React from 'react';

import { Button, Section } from 'modules/ArtistryReact';

export interface ISectionViewProps {

}

export interface ISectionViewState {
    locked: boolean;
    closed: boolean;
}

export default class SectionView extends React.Component<ISectionViewProps, ISectionViewState> {
    constructor(props?: ISectionViewProps) {
        super(props);
        this.state = {
            locked: false,
            closed: false
        };
    }
    close = () => {
        this.setState({ closed: !this.state.closed });
    }

    lockContents = () => {
        this.setState({ locked: true });
        window.setTimeout(() => {
            this.setState({ locked: false });
        }, 1000);
    }

    render() {
        return (
            <Section header="Section" space headerSpace lockable closeable locked={this.state.locked} closed={this.state.closed} onClose={this.close}>
                Section Content<br />
                <Button onClick={this.lockContents}>Lock</Button>
            </Section>
        );
    }
}
