# New York Times Discord Bot

A basic discord bot written in discord.js to post feeds from New york times, location based on Asia pacific.
You can configure it for different location, check [https://www.nytimes.com/rss](NYT website).

## Installation

git clone the repo, install the dependencies and start the application.

```sh
npm i discord.js moment dotenv xml-js
```

+ Create a `.env` file and add your bot token and client Id.
+ Add your channel ID to post and minutes to set the duration in `config.json`.
```
{
    "feedChannelId":"CHANNEL_ID",
    "timeInMinutes":5
}
```

## Note
This Bot is a Basic one, You can fork this bot and add configurations and tweaks as you please.
Pull Requests are always welcome.