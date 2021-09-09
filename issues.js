const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const pdfkit = require("pdfkit");

function processIssue(topicName, repoName, url) {
    request(url, cb);
    function cb(err, response, html) {
        if (err) {
            console.log("Error ❗❗", err);
        } else if (response.statusCode == 404) {
            console.log("OOPPSS❗❗ Page Not Found 😮");
        }
        else {
            getIssues(html);
        }
    }

    function getIssues(html) {
        let $ = cheerio.load(html);
        let issuesElementArr = $('a[data-hovercard-type="issue"]');

        //Put all links in an Array
        let arr = [];

        for (let i = 0; i < issuesElementArr.length; i++) {
            let link = $(issuesElementArr[i]).attr("href");
            let fullLink = `https://github.com${link}`;
            arr.push(fullLink);
        }

        // Building Folder (Topic Name)
        let topicFolderPath = path.join(__dirname, topicName);
        dirCreator(topicFolderPath);
        // Building File (Repo Name) and add array(in string/text form)
        let filePath = path.join(topicFolderPath, repoName + ".pdf");
        let text = JSON.stringify(arr);
        // Pdf file Creator (Function)
        pdfCreator(filePath, text);
    }
}

function dirCreator(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }
}

function pdfCreator(filePath, text) {
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();
}

module.exports = processIssue;