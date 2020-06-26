import { Block, BlockCallback, ModifierHash, Modifier } from '@artistry/abstract';

export function Attr<T>(name: string, hash: ModifierHash<T>): BlockCallback;
export function Attr<T>(name: string, value: string, modifier: Modifier<T>): BlockCallback;
export function Attr<T>(name: string, a: string | ModifierHash<T>, b?: Modifier<T>): BlockCallback {
    return (block: Block) => {
        block.attr(name, a as any, b as any);
    }
}