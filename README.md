# Discord Music Bot

This is a simple [DisTube](https://distube.js.org/) example music bot.

Please edit the `./config.json` and `./Events/Client/ready.js` file first.

## Requirement

- [Node.js v16](https://nodejs.org/en/) or higher
- [discord.js](https://github.com/discordjs/discord.js) v13
- [FFmpeg](https://www.ffmpeg.org/download.html) - `npm install ffmpeg-static`
- [@discordjs/voice](https://github.com/discordjs/voice) - `npm install @discordjs/voice`
- [sodium](https://www.npmjs.com/package/sodium) or [libsodium-wrappers](https://www.npmjs.com/package/libsodium-wrappers) - `npm install sodium` or `npm install libsodium-wrappers`
- [python](https://www.python.org/) (For [youtube-dl](http://ytdl-org.github.io/youtube-dl/) to support [700+ more sites](https://ytdl-org.github.io/youtube-dl/supportedsites.html).)

## FAQ

1. How do I get [YouTube cookie](https://github.com/fent/node-ytdl-core/blob/997efdd5dd9063363f6ef668bb364e83970756e7/example/cookies.js#L6-L12) ?
- Navigate to [YouTube](https://www.youtube.com/) in a web browser.
- Please login to your YouTube account if needed.
- Open up dev tools (opt+cmd+j on mac).
- Go to the network tab.
- Click on a request on the left.
- Scroll down to "Request Headers".
- Find the "cookie" header and copy its entire contents.

2. How do I get Youtube Identity Token ?
- Navigate to [YouTube video's watch page](https://www.youtube.com/watch?v=5qap5aO4i9A) in a web browser.
- Please login to your YouTube account if needed.
- Open up dev tools (opt+cmd+j on mac).
- Go to the source tab.
- Searching for "ID_TOKEN".

3. How do I get Spotify clientId and clientSecret ?
- Navigate to [Spotify Developer Page](https://developer.spotify.com/dashboard/applications).
- Please login to your spotify account if needed.
- Create an app.
- Go to the app that you have created.
- There you will get clientId and clientSecret.

## Free Discord Bot Hosting
- [Heroku](https://heroku.com/)
- [Replit](https://replit.com/)
- [Glitch](https://glitch.com/)
- [Azure](https://azure.microsoft.com/account/free) - Free Trial with a $200 credit for 30 days
- [DigitalOcean](https://www.digitalocean.com/try/free-trial-offer) - Free Trial with a $100 credit for 60 days


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
