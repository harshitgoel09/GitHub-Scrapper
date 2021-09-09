const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const processTopicLink = require("./repos");

let url = "https://github.com/topics";

console.log("Welcome To GitHub Topic Scrapper😎");
console.log("😊Here is your 😍Topics😉");

request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log("Error ❗❗", err);
    } else if (response.statusCode == 404) {
        console.log("OOPPSS❗❗ Page Not Found 😮");
    } else {
        getTopics(html);
    }
}

function getTopics(html) {
    let $ = cheerio.load(html);

    // Get Topics Link
    let anchorTag = $(".col-12.col-sm-6.col-md-4.mb-4>div>a");
    let topicNameArr = $(".col-12.col-sm-6.col-md-4.mb-4>div>a>p.f3");

    for (let i = 0; i < anchorTag.length; i++) {

        let link = $(anchorTag[i]).attr("href");
        let fullLink = "https://github.com" + link;

        //Get Top 8 Repository Link of Topics
        let topicName = $(topicNameArr[i]).text().trim();
        processTopicLink(topicName, fullLink);
    }
}
