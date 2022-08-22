import * as React from 'react';

import { Code, Section } from 'modules/ArtistryReact';

export interface ICodeViewProps {

}

export default class CodeView extends React.Component<ICodeViewProps, any> {
    render() {
        return (
            <Section header="Code" space headerSpace>
                <Code>{'\
window.onload = function() {\r\n\
    console.log(\'started...\');\r\n\
}\
            '}</Code>
            </Section>
        );
    }
}
