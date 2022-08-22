import * as React from 'react';

import { Button, Carousel, Section, ActionBar, Divider } from 'modules/ArtistryReact';

export interface ICarouselViewProps {

}

export interface ICarouselViewState {
    activeIndex: number;
}

export default class CarouselView extends React.Component<ICarouselViewProps, any> {
    constructor(props?: ICarouselViewProps) {
        super(props);
        this.state = {
            activeIndex: 0
        };
    }

    nextCarouselSlide = () => {
        this.setState({ activeIndex: this.state.activeIndex + 1 });
    }

    backCarouselSlide = () => {
        this.setState({ activeIndex: this.state.activeIndex - 1 });
    }

    render() {
        return (
            <Section header="Carousel" headerSpace>
                <ActionBar align="space-between">
                    <Button onClick={this.backCarouselSlide}>Back</Button>
                    <Button onClick={this.nextCarouselSlide}>Next</Button>
                </ActionBar>
                <Divider />
                <Carousel activeIndex={this.state.activeIndex} animation="slide" space>
                    <div style={{ backgroundColor: "red", padding: "10px" }}>
                        Content 0
                    </div>
                    <div style={{ backgroundColor: "blue", padding: "10px" }}>
                        Content 1
                        <br /> Line 2
                    </div>
                    <div style={{ backgroundColor: "yellow", padding: "10px" }}>
                        Content 2
                        <br /> Line 2
                        <br /> Line 3
                    </div>
                </Carousel>
                <Divider />
                <Carousel activeIndex={this.state.activeIndex} animation="flip" space>
                    <div style={{ backgroundColor: "red", padding: "10px" }}>
                        Content 0
                    </div>
                    <div style={{ backgroundColor: "blue", padding: "10px" }}>
                        Content 1
                        <br /> Line 2
                    </div>
                    <div style={{ backgroundColor: "yellow", padding: "10px" }}>
                        Content 2
                        <br /> Line 2
                        <br /> Line 3
                    </div>
                </Carousel>
            </Section >
        );
    }
}
