const { sortPages } = require("./report.js");

test('sortPages test', () => {
    const input = {
        'https://wagslane.dev/path': 1,
        'https://wagslane.dev': 3
    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev', 3],
        ['https://wagslane.dev/path', 1]
    ]
    expect(actual).toEqual(expected);
})

test('sortPages 5 pages test', () => {
    const input = {
        'https://wagslane.dev/path': 2,
        'https://wagslane.dev': 4,
        'https://wagslane.dev/path3': 3,
        'https://wagslane.dev/path4': 7,
    }
    const actual = sortPages(input);
    const expected = [
        ['https://wagslane.dev/path4', 7],
        ['https://wagslane.dev', 4],
        ['https://wagslane.dev/path3', 3],
        ['https://wagslane.dev/path', 2],
    ]
    expect(actual).toEqual(expected);
})