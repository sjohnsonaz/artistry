import { create } from 'jss';
import preset from 'jss-preset-default'

import { Button } from '../../src/jss';

const jssInstance = create();
const createGenerateId = () => {
    //let counter = 0
    //return (rule, sheet) => `pizza--${rule.key}-${counter++}`
    return (rule: any, _sheet) => `${rule.key}`;
}
jssInstance.setup(Object.assign({}, { createGenerateId }, preset()));

export function run() {
    let sheet = jssInstance.createStyleSheet(Button.styles, Button.options);
    sheet.attach();
}