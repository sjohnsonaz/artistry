import * as React from 'react';

import { ProgressBar, Section } from 'modules/ArtistryReact';

export interface IProgressBarViewProps {

}

export default class ProgressBarView extends React.Component<IProgressBarViewProps, any> {
    render() {
        return (
            <Section header="Progress Bar" space headerSpace>
                <h3>Default</h3>
                <ProgressBar value={50} min={0} max={100} decimal={2} decimalFixed showPercentage />
                <h3>Success</h3>
                <ProgressBar value={50} min={0} max={100} decimal={2} decimalFixed showPercentage type="success" />
            </Section>
        );
    }
}
