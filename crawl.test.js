const { NormalizeUrl } = require("./crawl.js");

test('NormalizeUrl', () => {
    expect(NormalizeUrl("hello")).toBe("hell");
});