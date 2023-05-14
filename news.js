"use strict";
const axios = require('axios');
const feedUrl = "https://rss.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml"
let convert = require('xml-js');

/**
 * 
 * @returns {object}
 */
async function news(){
    let result = await axios.get(feedUrl);
    let newResult = {}
    let finalData = convert.xml2json(result.data, {compact: true, spaces: 4});
    let finalJson = JSON.parse(finalData);
    let parsedItem = finalJson['rss']['channel']['item'][0]
    //console.log(parsedItem)
    newResult["title"] = parsedItem["title"]["_text"]
    newResult["url"] = parsedItem["link"]["_text"]
    newResult["description"] = parsedItem["description"]["_text"]
    newResult["author"] = parsedItem["dc:creator"]["_text"]
    newResult["publishedAt"] = parsedItem["pubDate"]["_text"]
    newResult["tags"] = []
    if (parsedItem["category"].length>0){
    for (let i =0 ;i<=parsedItem["category"].length;i++){
            try{
                newResult["tags"].push(parsedItem["category"][i]["_text"])}
            catch(e){
                }
    }}
    newResult["media"] = parsedItem["media:content"]['_attributes']["url"]
    return newResult
}

module.exports = news