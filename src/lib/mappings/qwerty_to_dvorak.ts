import { Mapping } from "$lib/mappings";

const qToD: [string, string][] = [
    ['_', '{'],
    ['-', '['],
    [',', 'w'],
    [';', 's'],
    [':', 'S'],
    ['!', '!'],
    ['?', 'Z'],
    ['.', 'v'],
    ['"', '_'],
    ['(', '('],
    [')', ')'],
    ['[', '/'],
    [']', '='],
    ['{', '?'],
    ['}', '+'],
    ['@', '@'],
    ['*', '*'],
    ['/', 'z'],
    ['\'', '\''],
    ['&', '&'],
    ['#', '#'],
    ['%', '%'],
    ['`', '`'],
    ['^', '^'],
    ['+', '}'],
    ['<', 'W'],
    ['=', ']'],
    ['>', 'V'],
    ['|', '|'],
    ['~', '~'],
    ['$', '$'],
    ['0', '0'],
    ['1', '1'],
    ['2', '2'],
    ['3', '3'],
    ['4', '4'],
    ['5', '5'],
    ['6', '6'],
    ['7', '7'],
    ['9', '9'],
    ['a', 'a'],
    ['A', 'A'],
    ['b', 'x'],
    ['B', 'X'],
    ['c', 'j'],
    ['C', 'J'],
    ['d', 'e'],
    ['D', 'E'],
    ['e', '.'],
    ['E', '>'],
    ['f', 'u'],
    ['F', 'U'],
    ['g', 'i'],
    ['G', 'i'],
    ['h', 'd'],
    ['H', 'D'],
    ['i', 'c'],
    ['I', 'C'],
    ['j', 'h'],
    ['J', 'H'],
    ['k', 't'],
    ['K', 'T'],
    ['l', 'n'],
    ['L', 'N'],
    ['m', 'm'],
    ['M', 'M'],
    ['n', 'b'],
    ['N', 'B'],
    ['o', 'r'],
    ['O', 'R'],
    ['p', 'l'],
    ['P', 'L'],
    ['q', '\''],
    ['Q', '"'],
    ['r', 'p'],
    ['R', 'P'],
    ['s', 'o'],
    ['S', 'O'],
    ['t', 'y'],
    ['T', 'Y'],
    ['u', 'g'],
    ['U', 'G'],
    ['v', 'k'],
    ['V', 'K'],
    ['w', ','],
    ['W', '<'],
    ['x', 'q'],
    ['X', 'Q'],
    ['y', 'f'],
    ['Y', 'F'],
    ['z', ';'],
    ['Z', ':'],
];

const qwertyToDvorak: Map<string, string> = new Map(qToD);

export class QwertyToDvorak extends Mapping {
    static mapName: string = 'qwerty_to_dvorak';

    getName(): string {
        return QwertyToDvorak.mapName;
    }
    
    get(key: string): string | undefined {
        return qwertyToDvorak.get(key);
    }
}
