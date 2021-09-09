const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const processIssue = require("./issues");

function processTopicLink(topicName, url) {
    request(url, callBack);
    function callBack(err, response, html) {
        if (err) {
            console.log("Error ❗❗", err);
        } else if (response.statusCode == 404) {
            console.log("OOPPSS❗❗ Page Not Found 😮");
        } else {
            getRepo(html);
        }
    }

    function getRepo(html) {
        let $ = cheerio.load(html);
        let repoElement = $("h3.f3>a.wb-break-word.text-bold");

        console.log(topicName);
        // Only Top 8 Repo -> issues
        for (let i = 0; i < 8; i++) {
            let link = $(repoElement[i]).attr("href");
            // Get Repo Name
            let repoName = link.split("/").pop();
            // Get issues Link of each repo
            let fullLink = `https://github.com${link}/issues`;

            // console.log(`${repoName} ---> ${fullLink}`);
            // Get issues in an array
            processIssue(topicName, repoName, fullLink);
        }
    }
}

module.exports = processTopicLink;