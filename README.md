## Discord Music Bot

This is a simple [DisTube](https://distube.js.org/) example music bot. ([DisTube Support Server](https://discord.gg/feaDd9h))

Dependencies maybe outdated. You should update them yourself!

Please edit the `./config.json` and `./Events/Client/ready.js` file first.

### Requirement
- [Node.js](https://nodejs.org/en/) v16.9.0 or higher
- [discord.js](https://github.com/discordjs/discord.js) v14
- [FFmpeg](https://www.ffmpeg.org/download.html) - `npm install ffmpeg-static`
- [@discordjs/voice](https://github.com/discordjs/voice) - `npm install @discordjs/voice`
- [sodium](https://www.npmjs.com/package/sodium) or [libsodium-wrappers](https://www.npmjs.com/package/libsodium-wrappers) - `npm install sodium` or `npm install libsodium-wrappers`

### FAQ
1. How do I get [YouTube cookie](https://github.com/fent/node-ytdl-core/blob/997efdd5dd9063363f6ef668bb364e83970756e7/example/cookies.js#L6-L12) ?
   - Navigate to [YouTube](https://www.youtube.com/) in a web browser.
   - Please login to your YouTube account if needed.
   - Open up dev tools (opt+cmd+j on mac).
   - Go to the network tab.
   - Click on a request on the left.
   - Scroll down to "Request Headers".
   - Find the "cookie" header and copy its entire contents.

2. How do I get Spotify clientId and clientSecret ?
   - Navigate to [Spotify Developer Page](https://developer.spotify.com/dashboard/applications).
   - Please login to your spotify account if needed.
   - Create an app.
   - Go to the app that you have created.
   - There you will get clientId and clientSecret.

3. More on [DisTube Support Server](https://discord.gg/feaDd9h).

### Config Information

- Token = Secret Token Bot.
- Prefix = Bot Prefix.
- OwnerId = UserId of the Bot Owner.
- Color = Embed Color.
- youtubeCookie = YouTube Cookie.
- clientId = Spotify clientId.
- clientSecret = Spotify clientSecret.
- MusicImg = Embed Image (optional).

### Free Discord Bot Hosting

- [Heroku](https://heroku.com/)
- [Replit](https://replit.com/)
- [Glitch](https://glitch.com/)
- [Azure](https://azure.microsoft.com/account/free) - Free Trial with a $200 credit for 30 days.
- [DigitalOcean](https://www.digitalocean.com/try/free-trial-offer) - Free Trial with a $100 credit for 60 days.
- [Google Cloud](https://cloud.google.com/free-trial/90daysfreetrial) - Free Trial with a $300 credit for 90 days.
- [AWS](https://aws.amazon.com/free/) - Free Tier Amazon EC2 750 hours per month for 12 months.
- [Alibaba Cloud](https://www.alibabacloud.com/free) - Free Trial ECS for 3 months or 12 months.

### For Help

- My Discord Account: Panji Kusuma#7473
- My Discord Server: [Gang Sebelah](https://discord.gg/gangsebelah) - This is a public discord server but you can find me there.
- Follow and Support Me: https://linktr.ee/1mgr007
- Example Bot: [ZER0 DAY](https://discord.com/api/oauth2/authorize?client_id=621396927933579284&permissions=8&scope=bot%20applications.commands)

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### License

[MIT](https://choosealicense.com/licenses/mit/)
