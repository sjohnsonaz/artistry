import Diff, { IDiffItem, DiffOperation } from '@cascade/diff';

export enum UnitValid {
    valid = 1,
    invalid = 0,
    incomplete = -1
}

export class MaskUnit {
    type: UnitTypes;
    definition: string;
    mask: string;
    value: string;

    constructor(type: UnitTypes, definition: string) {
        this.type = type;
        this.definition = definition;
        this.mask = MaskUnit.getMask(this.type, this.definition);
    }

    fill(value: string) {
        this.value = value.substring(0, this.mask.length);
        return value.substring(this.mask.length);
    }

    isValid() {
        if (this.value) {
            let clean = this.value.replace(/[\W_]+/g, "");
            if (clean.length < this.mask.length) {
                return UnitValid.incomplete;
            } else {
                if (this.type === UnitTypes.range) {
                    return MaskUnit.isRangeValid(this.definition, this.value) ? UnitValid.valid : UnitValid.invalid;
                } else {
                    return UnitValid.valid;
                }
            }
        } else {
            return UnitValid.incomplete;
        }
    }

    static isRangeValid(definition: string, value: string) {
        let parts = definition.split('-');
        if (parts && parts.length > 1) {
            let top = parseInt(parts[1] || parts[0]);
            let bottom = parseInt(parts[0]) || 0;
            let valueNumber = parseInt(value);
            if (bottom <= valueNumber && valueNumber <= top) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static getMask(type: UnitTypes, definition: string) {
        switch (type) {
            case UnitTypes.numeric:
                return '9';
            case UnitTypes.alpha:
                return 'a';
            case UnitTypes.alphanumeric:
                return 'n';
            case UnitTypes.hexidecimal:
                return '0';
            case UnitTypes.escaped:
                return '*';
            case UnitTypes.range:
                return MaskUnit.getRangeMask(definition);
                break;
        }
    }

    static getRangeMask(definition: string) {
        let parts = definition.split('-');
        if (parts && parts.length > 1) {
            let top = parts[1] || parts[0];
            let characters = [];
            for (let index = 0, length = top.length; index < length; index++) {
                characters.push('9');
            }
            return characters.join('');
        } else {
            return '';
        }
    }
}

export default class Mask {
    units: MaskUnit[];
    mask: string;

    constructor(mask: string) {
        this.parse(mask);
    }

    parse(mask: string) {
        this.units = [];
        if (mask) {
            mask.replace(regex, (
                substring: string,
                numeric: string,
                alpha: string,
                alphanumeric: string,
                hexidecimal: string,
                escaped: string,
                //set: string,
                range: string
            ) => {
                if (numeric) {
                    let unit = new MaskUnit(UnitTypes.numeric, numeric);
                    this.units.push(unit);
                } else if (alpha) {
                    let unit = new MaskUnit(UnitTypes.alpha, alpha);
                    this.units.push(unit);
                } else if (alphanumeric) {
                    let unit = new MaskUnit(UnitTypes.alphanumeric, alphanumeric);
                    this.units.push(unit);
                } else if (hexidecimal) {
                    let unit = new MaskUnit(UnitTypes.hexidecimal, hexidecimal);
                    this.units.push(unit);
                } else if (escaped) {
                    let unit = new MaskUnit(UnitTypes.escaped, escaped);
                    this.units.push(unit);
                    //} else if (set) {
                    //let unit = new MaskUnit(UnitTypes.set, set);
                    //this.units.push(unit);
                } else if (range) {
                    let unit = new MaskUnit(UnitTypes.range, range);
                    this.units.push(unit);
                }
                return substring;
            });
        }

        let cleanMask = this.units.map(unit => unit.mask).join('');

        mask = mask.replace(new RegExp(UnitRegexes.range, 'g'), (searchValue: string, range: string) => {
            return MaskUnit.getRangeMask(range);
        });

        var output = '';
        var cleanIndex = 0;
        for (var index = 0, length = mask.length; index < length; index++) {
            var character = mask[index];
            if (Mask.isValidCharacter(character)) {
                output += cleanMask[cleanIndex] || ' ';
                cleanIndex++;
            } else {
                output += character;
            }
        }

        this.mask = output;
        return output;
    }

    fill(value: string) {
        let remainder = value;
        this.units.forEach(unit => {
            remainder = unit.fill(remainder);
        });
        return remainder;
    }

    isValid() {
        for (let unit of this.units) {
            if (unit.isValid() === UnitValid.invalid) {
                return false;
            }
        }
        return true;
    }

    getVirtualPosition(position: number) {
        position = Math.min(position, this.mask.length);
        var valuePosition = 0;
        for (var index = 0; index < position; index++) {
            var character = this.mask[index];
            if (Mask.isValidCharacter(character)) {
                valuePosition++;
            }
        }
        return valuePosition;
    }

    getMaskPosition(position: number) {
        var valueIndex = 0;
        for (var index = 0, length = this.mask.length; index < length; index++) {
            var character = this.mask[index];
            if (Mask.isValidCharacter(character)) {
                valueIndex++;
                if (valueIndex > position) {
                    break;
                }
            }
        }
        return index;
    }

    getVirtualSelection(selection: ISelection) {
        return {
            start: this.getVirtualPosition(selection.start),
            end: this.getVirtualPosition(selection.end),
            direction: selection.direction
        };
    }

    formatClean(clean: string, allowLessValid: boolean = false) {
        let cleanMask = Mask.cleanValue(this.mask);

        let diff = Diff.compare(cleanMask.split('').reverse().join(''), clean.split('').reverse().join(''), compareChars);

        let lcs = createLCS(diff);
        if (!allowLessValid && lcs.length < clean.length) {
            throw 'Invalid Value';
        }

        let cleanSpaces = createSpaces(diff);

        this.fill(cleanSpaces);
        if (!this.isValid()) {
            throw 'Invalid Value';
        }

        var output = '';
        var cleanIndex = 0;
        for (var index = 0, length = this.mask.length; index < length; index++) {
            var character = this.mask[index];
            if (Mask.isValidCharacter(character)) {
                output += cleanSpaces[cleanIndex] || ' ';
                cleanIndex++;
            } else {
                output += character;
            }
        }
        return output;
    }

    formatValue(value: string, allowLessValid: boolean = false) {
        let clean = Mask.cleanValue(value);
        return this.formatClean(clean, allowLessValid);
    }

    updateSelection(value: string, selection: ISelection, keyboardMovement: KeyboardMovement = KeyboardMovement.none): IMaskUpdate {
        let clean = Mask.cleanValueWithSpaces(value);
        let virtualSelection = this.getVirtualSelection(selection);
        let selectionStart: number;
        let selectionEnd: number;
        switch (keyboardMovement) {
            case KeyboardMovement.none:
                selectionStart = this.getMaskPosition(Math.min(clean.length, virtualSelection.start));
                selectionEnd = this.getMaskPosition(Math.min(clean.length, virtualSelection.end));
                break;
            case KeyboardMovement.home:
                selectionStart = this.getMaskPosition(0);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.end:
                selectionStart = this.getMaskPosition(clean.length);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.left:
                selectionStart = this.getMaskPosition(virtualSelection.start - 1);
                selectionEnd = selectionStart;
                break;
            case KeyboardMovement.right:
                selectionStart = this.getMaskPosition(Math.min(clean.length, virtualSelection.start + 1));
                selectionEnd = selectionStart;
                break;
        }
        return {
            selectionStart: selectionStart,
            selectionEnd: selectionEnd
        };
    }

    updateValue(value: string, oldValue: string): IMaskUpdate {
        value = this.formatValue(value);

        let diff = Diff.compare(oldValue, value);
        diff.reverse();
        let position = 0;
        for (let index = 0, length = diff.length; index < length; index++) {
            let diffItem = diff[index];
            if (diffItem.operation === -1) {

            }
            if (diffItem.operation === 0) {
                position++;
            }
            if (diffItem.operation === 1) {
                position++;
                break;
            }
        }

        let virtualPosition = this.getVirtualPosition(position);
        let selectionPosition = this.getMaskPosition(virtualPosition);
        return {
            value: value,
            selectionStart: selectionPosition,
            selectionEnd: selectionPosition
        };
    }

    deleteCharacter(value: string, selection: ISelection, forward: boolean) {
        let clean = Mask.cleanValueWithSpaces(value);
        let virtualSelection = this.getVirtualSelection(selection);

        if (virtualSelection.start === virtualSelection.end) {
            let updatedClean = forward ?
                clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end + 1) :
                clean.slice(0, virtualSelection.start - 1) + clean.slice(virtualSelection.end);
            let updatedValue = this.formatClean(updatedClean, true);

            let selectionPosition = this.getMaskPosition(forward ? virtualSelection.start : (virtualSelection.start - 1));
            return {
                value: updatedValue,
                selectionStart: selectionPosition,
                selectionEnd: selectionPosition
            };
        } else {
            let updatedClean = clean.slice(0, virtualSelection.start) + clean.slice(virtualSelection.end);
            let updatedValue = this.formatClean(updatedClean, true);

            let selectionPosition = this.getMaskPosition(Math.min(updatedClean.length, virtualSelection.start));
            return {
                value: updatedValue,
                selectionStart: selectionPosition,
                selectionEnd: selectionPosition
            };
        }
    }

    static cleanValue(value: string) {
        if (typeof value === 'string') {
            return value.replace(/[\W_]+/g, "");
        } else {
            return '';
        }
    }

    static cleanValueWithSpaces(value: string) {
        if (typeof value === 'string') {
            let clean = value.replace(/[\W]+/g, "");
            let length = clean.replace(/[_]/g, ' ').trim().length;
            return clean.substring(0, length);
        } else {
            return '';
        }
    }

    static isValidCharacter(character: string, placeholder: boolean = false) {
        switch (character) {
            case ValidCharacter.number:
            case ValidCharacter.alpha:
            case ValidCharacter.alphanumeric:
            case ValidCharacter.hexadecimal:
                return true;
            case ValidCharacter.placeholder:
                if (placeholder) {
                    return true;
                } else {
                    return false;
                }
            default:
                return false;
        }
    }
}

enum UnitTypes {
    numeric = 'numeric',
    alpha = 'alpha',
    alphanumeric = 'alphanumeric',
    hexidecimal = 'hexidecimal',
    escaped = 'escaped',
    //set = 'set',
    range = 'range'
}

enum UnitRegexes {
    numeric = '(9)',
    alpha = '(a)',
    alphanumeric = '(n)',
    hexidecimal = '(0)',
    escaped = '(\\\\.)',
    //set = '\\[([^\\[\\]]*)\\]',
    range = '\\[\\[([^\\[\\]]*)\\]\\]'
}

let regex = new RegExp([
    UnitRegexes.numeric,
    UnitRegexes.alpha,
    UnitRegexes.alphanumeric,
    UnitRegexes.hexidecimal,
    UnitRegexes.escaped,
    //UnitRegexes.set,
    UnitRegexes.range
].join('|'), 'g');

export enum ValidCharacter {
    placeholder = '_',
    alpha = 'a',
    number = '9',
    alphanumeric = 'n',
    hexadecimal = '0'
}

export interface ISelection {
    start: number;
    end: number;
    direction: 'forward' | 'backward' | 'none';
}

export interface IMaskUpdate {
    value?: string;
    selectionStart?: number;
    selectionEnd?: number;
}

export enum KeyboardMovement {
    none,
    home,
    end,
    left,
    right
}

function compareChars(maskChar: string, valueChar: string) {
    switch (maskChar) {
        case '9':
            return !!valueChar.match(/[0-9]/);
        case 'a':
            return !!valueChar.match(/[a-zA-Z ]/);
        case 'n':
            return !!valueChar.match(/[0-9a-zA-Z ]/);
        case '0':
            return !!valueChar.match(/[0-9a-fA-F ]/);
    }
}

function createLCS<T>(diff: IDiffItem<T>[]) {
    var lcs = [];
    for (var index = 0, length = diff.length; index < length; index++) {
        var diffItem = diff[index];
        switch (diffItem.operation) {
            case DiffOperation.ADD:
                break;
            case DiffOperation.NONE:
                lcs.push(diffItem.item);
                break;
            case DiffOperation.REMOVE:
                break;
        }
    }
    return lcs.join('');
}

function createSpaces<T>(diff: IDiffItem<T>[]) {
    var lcs = [];
    for (var index = 0, length = diff.length; index < length; index++) {
        var diffItem = diff[index];
        switch (diffItem.operation) {
            case DiffOperation.ADD:
                break;
            case DiffOperation.NONE:
                lcs.push(diffItem.itemB);
                break;
            case DiffOperation.REMOVE:
                lcs.push('_');
                break;
        }
    }
    return lcs.join('');
}