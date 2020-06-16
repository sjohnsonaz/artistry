import { Button, Container, defaultValues } from '../../src/jss';
import { compileStyle } from '@artistry/jss';

function createSheet(text: string) {
    let style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(text));
    return style;
}

export function run() {
    let containerSheet = createSheet([
        compileStyle(...Button.toRules()),
        compileStyle(...Container.toRules())
    ].join('\n'));
    document.head.appendChild(containerSheet);
}