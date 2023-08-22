const { NormalizeUrl,getUrlsFromHTML } = require("./crawl.js");

test('NormalizeUrl', () => {
    expect(NormalizeUrl("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test('NormalizeUrl', () => {
    expect(NormalizeUrl("https://Blog.boot.dev/path/")).toBe("blog.boot.dev/path");
});

test('NormalizeUrl', () => {
    expect(NormalizeUrl("https://Blog.boot.dev/path")).toBe("blog.boot.dev/path");
});

test('NormalizeUrl', () => {
    expect(NormalizeUrl("https://Blog.boot.dev/path?q=tgggv")).toBe("blog.boot.dev/path");
});

test('getUrlsFromHTML absolute', () => {
    const inputHTMLbody =`
    <html>
        <body>
            <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `;
    const inputbaseURL='https://blog.boot.dev';
    expect(getUrlsFromHTML(inputHTMLbody,inputbaseURL)).toEqual(["https://blog.boot.dev/"]);
});

test('getUrlsFromHTML relative', () => {
    const inputHTMLbody =`
    <html>
        <body>
            <a href="/path/"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `;
    const inputbaseURL='https://blog.boot.dev';
    expect(getUrlsFromHTML(inputHTMLbody,inputbaseURL))
    .toEqual(["https://blog.boot.dev/path/"]);
});

test('getUrlsFromHTML both', () => {
    const inputHTMLbody =`
    <html>
        <body>
            <a href="/path2/"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `;
    const inputbaseURL='https://blog.boot.dev';
    expect(getUrlsFromHTML(inputHTMLbody,inputbaseURL))
    .toEqual(["https://blog.boot.dev/path2/","https://blog.boot.dev/path1/"]);
});

test('getUrlsFromHTML invalid', () => {
    const inputHTMLbody =`
    <html>
        <body>
            <a href="invalid"><span>Go to Boot.dev</span></a>
            <a href="https://blog.boot.dev/path1/"><span>Go to Boot.dev</span></a>
        </body>
    </html>
    `;
    const inputbaseURL='https://blog.boot.dev';
    expect(getUrlsFromHTML(inputHTMLbody,inputbaseURL))
    .toEqual(["https://blog.boot.dev/path1/"]);
});