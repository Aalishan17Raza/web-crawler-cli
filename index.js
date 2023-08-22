const {crawlPage}=require('./crawl.js');

function main() {
    if (process.argv.length < 3) {
        console.log("No website provided");
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log("too many cmd line arguments!");
        process.exit(1);
    }
    const baseURL = process.argv[2];
    crawlPage(baseURL);
    console.log(`starting crawl of ${baseURL}`);
}

main();