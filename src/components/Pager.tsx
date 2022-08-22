import * as React from 'react';

export interface IPagerProps {
    className?: string;
    id?: string;
    index: number;
    count: number;
    showCount: number;
    showArrows?: boolean;
    showEnds?: boolean;
    zeroIndexed?: boolean;
    onClickIndex: (index: number, event: React.MouseEvent<HTMLElement>) => void;
    onClickEnd?: (event: React.MouseEvent<HTMLElement>) => void;
}

export default class Pager extends React.Component<IPagerProps, any> {
    onClickIndex(index: number, event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        if (this.props.onClickIndex) {
            this.props.onClickIndex(index, event);
        }
    }

    onClickBack = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (this.props.index > 0) {
            if (this.props.onClickIndex) {
                this.props.onClickIndex(this.props.index - 1, event);
            }
        }
    }

    onClickForward = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (this.props.index < this.props.count - 1) {
            if (this.props.onClickIndex) {
                this.props.onClickIndex(this.props.index + 1, event);
            }
        }
    }

    onClickStart = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (this.props.index > 0) {
            if (this.props.onClickIndex) {
                this.props.onClickIndex(0, event);
            }
        }
    }

    onClickEnd = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (this.props.index < this.props.count - 1) {
            if (this.props.onClickEnd) {
                this.props.onClickEnd(event);
            }
        }
    }

    render() {
        let {
            className,
            id,
            index,
            count,
            showCount,
            showArrows,
            showEnds,
            zeroIndexed
        } = this.props;

        let classNames = className ? [className] : [];
        classNames.push('pager');

        let low = Math.max(index - Math.floor(showCount / 2), 0);
        let high = Math.min(low + showCount, count);
        if (high - low < showCount) {
            low = Math.max(high - showCount, 0);
        }

        let offset = zeroIndexed ? 0 : 1;
        let pagers = [];
        for (var pagerIndex = low; pagerIndex < high; pagerIndex++) {
            let active = pagerIndex === index;
            pagers.push(
                <li key={pagerIndex.toString()} className={active ? 'pager-active' : undefined}>
                    <a href="#" onClick={this.onClickIndex.bind(this, pagerIndex)}>
                        {pagerIndex + offset}
                    </a>
                </li>
            );
        }
        return (
            <ul className={classNames.join(' ')} id={id}>
                {showEnds ?
                    <li key="start" className={index === 0 ? 'pager-disabled' : undefined}>
                        <a href="#" onClick={this.onClickStart}>&lt;&lt;</a>
                    </li>
                    : undefined}
                {showArrows ?
                    <li key="back" className={index === 0 ? 'pager-disabled' : undefined}>
                        <a href="#" onClick={this.onClickBack}>&lt;</a>
                    </li>
                    : undefined}
                {pagers}
                {showArrows ?
                    <li key="next" className={index >= count - 1 ? 'pager-disabled' : undefined}>
                        <a href="#" onClick={this.onClickForward}>&gt;</a>
                    </li>
                    : undefined}
                {showEnds ?
                    <li key="end" className={index >= count - 1 ? 'pager-disabled' : undefined}>
                        <a href="#" onClick={this.onClickEnd}>&gt;&gt;</a>
                    </li>
                    : undefined}
            </ul>
        );
    }
}
