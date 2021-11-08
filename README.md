# Discord Music Bot

This is a simple [DisTube](https://distube.js.org/) example music bot.

Please edit the `config.json` file first. (Add Token Bot, Prefix, and Owner Bot ID, youtubeCookie, youtubeIdentityToken, clientId, clientSecret, musicimg)

## Requirement

- [Node.js v16](https://nodejs.org/en/) or higher
- [discord.js](https://github.com/discordjs/discord.js) v13
- [FFmpeg](https://www.ffmpeg.org/download.html) - `npm install ffmpeg-static`
- [@discordjs/voice](https://github.com/discordjs/voice) - `npm install @discordjs/voice`
- [sodium](https://www.npmjs.com/package/sodium) or [libsodium-wrappers](https://www.npmjs.com/package/libsodium-wrappers) - `npm install sodium` or `npm install libsodium-wrappers`
- [python](https://www.python.org/) (For [youtube-dl](http://ytdl-org.github.io/youtube-dl/) to support [700+ more sites](https://ytdl-org.github.io/youtube-dl/supportedsites.html).)

## FAQ

1. To get your [YouTube cookie](https://github.com/fent/node-ytdl-core/blob/997efdd5dd9063363f6ef668bb364e83970756e7/example/cookies.js#L6-L12).
- navigate to YouTube in a web browser.
- open up dev tools (opt+cmd+j on mac).
- go to the network tab.
- click on a request on the left.
- scroll down to "Request Headers".
- find the "cookie" header and copy its entire contents.

2. To get your Youtube Identity Token.
- navigate to YouTube video's watch page in a web browser.
- open up dev tools (opt+cmd+j on mac).
- go to the source tab.
- searching for "ID_TOKEN".

3. To get your Spotify clientId and clientSecret.
- navigate to [spotify developer page](https://developer.spotify.com/dashboard/applications).
- Please login to your spotify account if needed.
- create an app.
- go to the app that you have created.
- there you will get clientId and clientSecret.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
