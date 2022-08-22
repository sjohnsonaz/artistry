import * as React from 'react';

import { Tab, Section } from 'modules/ArtistryReact';

export interface ITabViewProps {

}

export default class TabView extends React.Component<ITabViewProps, any> {
    render() {
        return (
            <Section header="Tab" space headerSpace>
                <Tab titles={['Tab 1', 'Tab 2', 'Tab 3']} animated space>
                    <div>Tab 1 Content<br />
                        <input type="text" className="input" />
                    </div>
                    <div>
                        Tab 2 Content<br />
                        More Content<br />
                        <input type="text" className="input" />
                    </div>
                    <div>
                        Tab 3 Content<br />
                        Event more Content<br />
                        Another line of Content<br />
                        <input type="text" className="input" />
                    </div>
                </Tab>
            </Section>
        );
    }
}
