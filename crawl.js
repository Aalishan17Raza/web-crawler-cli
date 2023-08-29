const { JSDOM } = require("jsdom");

async function crawlPage(baseUrl, currentUrl, pages) {
    const baseURLObj = new URL(baseUrl);
    const currentUrlObj = new URL(currentUrl);
    if (baseURLObj.hostname !== currentUrlObj.hostname) {
        return pages;
    }
    const normalizedCurrentUrl = NormalizeUrl(currentUrl);
    if (pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++;
        return pages;
    }
    pages[normalizedCurrentUrl] = 1;

    console.log(`actively crawling: ${currentUrl}`);

    try {
        const res = await fetch(currentUrl);
        if (res.status > 399) {
            console.log(`error while fetching with status code:${res.status}, on page ${currentUrl}`);
            return pages;
        }

        if (!res.headers.get("content-type").includes('text/html')) {
            console.log(`not html content type :${res.headers.get("content-type")}, on page ${currentUrl}`);
            return pages;
        }
        const htmlBody = await res.text();
        nextURLs = getUrlsFromHTML(htmlBody, baseUrl);
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseUrl, nextURL, pages);
        }
    } catch (error) {
        console.log(`Error: ${error.message} while fetching ${currentUrl} `);
    }
    return pages;
}

function getUrlsFromHTML(HTMLbody, baseUrl) {
    const urls = [];
    const dom = new JSDOM(HTMLbody);
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //relative url
            try {
                const urlObj = new URL(`${baseUrl}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log("invalid url");
            }

        } else {
            //absolute url
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (error) {
                console.log("invalid url");
            }
        }
    }
    return urls;
}

function NormalizeUrl(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`;
    if (fullPath.length > 0 && fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath.toLowerCase();
}

module.exports = { NormalizeUrl, getUrlsFromHTML, crawlPage };