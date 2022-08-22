import * as React from 'react';

import { Pager, Section } from 'modules/ArtistryReact';

export interface IPagerViewProps {

}

export interface IPagerViewState {
    index: number;
}

export default class PagerView extends React.Component<IPagerViewProps, any> {
    count = 20;

    constructor(props?: IPagerViewProps) {
        super(props);
        this.state = {
            index: 1
        };
    }

    onClickIndex = (index: number, event: React.MouseEvent<HTMLElement>) => {
        this.setState({ index: index });
    }

    onClickBack = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ index: this.state.index - 1 });
    }

    onClickForward = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ index: this.state.index + 1 });
    }

    onClickStart = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ index: 0 });
    }

    onClickEnd = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ index: this.count - 1 });
    }
    render() {
        return (
            <Section header="Pager" space headerSpace>
                <Pager
                    count={20}
                    index={this.state.index}
                    showCount={7}
                    showArrows
                    showEnds
                    onClickIndex={this.onClickIndex}
                    onClickEnd={this.onClickEnd}
                />
            </Section>
        );
    }
}
