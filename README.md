# New York Times Discord Bot

A basic discord bot written in discord.js to post feeds from New york times, location based on Asia pacific.
You can configure it for different location, check [NYT website](https://www.nytimes.com/rss).

## Installation

git clone the repo, install the dependencies and start the application.

```sh
npm i discord.js moment dotenv xml-js
```

+ Create a `.env` file and add your `BOT_TOKEN` and `CLIENT_ID`.
+ Add your channel ID to post and minutes to set the duration in `config.json`.
```
{
    "feedChannelId":"CHANNEL_ID",
    "timeInMinutes":5
}
```
+ `npm start` or `node index.js` to start the application

## Note
This Bot is a Basic one, You can fork this bot and add configurations and tweaks as you please.
Pull Requests are always welcome.