import * as React from 'react';
import styled from 'styled-components';

const CODE_NUMBER_COLOR = 'gray';
const Pre = styled.pre`
    counter-reset: listing;
    & > code {
        counter-increment: listing;
        &:before {
            content: counter(listing) '. ';
            color: ${CODE_NUMBER_COLOR};
        }
    }
`;

export interface ICodeProps extends React.HTMLAttributes<HTMLPreElement> {}

export function Code({ children, ...props }: ICodeProps) {
    return (
        <Pre {...props}>
            {children instanceof Array ? (
                children.map((child) => <code>{child}</code>)
            ) : (
                <code>{children}</code>
            )}
        </Pre>
    );
}
