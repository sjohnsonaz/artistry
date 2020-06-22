import { GLOBAL, NORMAL, NOWRAP, PRE, PRE_WRAP, PRE_LINE, BREAK_SPACES, BREAK_WORD, ANYWHERE, VariableProperties } from '@artistry/abstract';

type WhiteSpace = GLOBAL | typeof NORMAL | typeof NOWRAP | typeof PRE | typeof PRE_WRAP | typeof PRE_LINE | typeof BREAK_SPACES;
type OverflowWrap = GLOBAL | typeof NORMAL | typeof BREAK_WORD | typeof ANYWHERE;

export interface IWrapProps {
    whiteSpace?: WhiteSpace;
    overflowWrap?: OverflowWrap;
}

export function Wrap({
    whiteSpace,
    overflowWrap
}: IWrapProps = {}): VariableProperties {
    return {
        whiteSpace,
        overflowWrap
    };
}