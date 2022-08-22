import * as React from 'react';

import Carousel, { ICarouselProps } from './Carousel';
//import Card from './Card';
import CardContainer from './CardContainer';

export interface ICardCarouselProps extends ICarouselProps {
    minWidth?: number;
    maxWidth?: number;
    cardSpacing?: number;
    carouselSpacing?: number;
    onChangeSize?: (index: number, slideSize?: number, oldSlideSize?: number) => any;
}

export interface ICardCarouselState {
    rendered?: boolean;
    slideSize?: number;
}

export default class CardCarousel extends React.Component<ICardCarouselProps, ICardCarouselState> {
    element: React.RefObject<HTMLDivElement> = React.createRef();
    state: ICardCarouselState = {
        rendered: false,
        slideSize: 1
    };

    componentDidMount() {
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHandler);
    }

    onChangeSize = (slideSize: number, oldSlideSize: number) => {
        if (this.props.onChangeSize) {
            let oldIndex = this.props.activeIndex;
            if (oldIndex < 0) {
                let length = React.Children.count(this.props.children);
                oldIndex = (oldIndex % length) + length;
            }
            let newIndex = Math.floor(oldIndex * oldSlideSize / slideSize);
            this.props.onChangeSize(newIndex, slideSize, oldSlideSize);
        }
    }

    resizeHandler = () => {
        let {
            minWidth,
            cardSpacing,
            carouselSpacing
        } = this.props;

        let slideSize = 1;
        let element = this.element.current;
        if (element) {
            minWidth = minWidth || 300;
            cardSpacing = cardSpacing || 10;
            carouselSpacing = carouselSpacing || 10;
            minWidth += cardSpacing;
            let width = element.clientWidth;
            if (width > minWidth + cardSpacing) {
                let remainder = (width - cardSpacing) % minWidth;
                slideSize = (width - cardSpacing - remainder) / minWidth;
            }
        }

        if (!this.state.rendered) {
            let oldSlideSize = this.state.slideSize;
            this.setState({
                rendered: true,
                slideSize: slideSize
            });
            this.onChangeSize(slideSize, oldSlideSize);
        } else if (slideSize !== this.state.slideSize) {
            let oldSlideSize = this.state.slideSize;
            this.setState({
                slideSize: slideSize
            });
            this.onChangeSize(slideSize, oldSlideSize);
        }
    };

    componentDidUpdate() {
        this.resizeHandler();
    }

    render() {
        let {
            id,
            className,
            minWidth,
            maxWidth,
            children,
            ...props
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('card-carousel');

        let wrappedChildren: React.ReactNode[][] = [];

        let innerWrapper: React.ReactNode[];
        React.Children.forEach(children, (child, index) => {
            if (index % this.state.slideSize === 0) {
                innerWrapper = [];
                wrappedChildren.push(innerWrapper);
            }
            innerWrapper.push(child);
        });

        return (
            <div
                ref={this.element}
                id={id}
                className={classNames.join(' ')}
            >
                {this.state.rendered ?
                    <Carousel
                        {...props}
                    >
                        {wrappedChildren.map((children, index) => {
                            return (
                                <CardContainer
                                    className="space"
                                    minWidth={minWidth}
                                    maxWidth={maxWidth}
                                    key={index}>
                                    {children}
                                </CardContainer>
                            );
                        })}
                    </Carousel> :
                    undefined}
            </div>
        );
    }
}