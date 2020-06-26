import { Block, BlockCallback, BlockDefinition } from '@artistry/abstract';

export function Rule(selector: string, ...definitions: BlockDefinition[]): BlockCallback {
    return (block: Block) => {
        block.rule(selector, ...definitions);
    }
}