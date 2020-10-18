# BotMyst : Revived. `>`

An attempt at reviving BotMyst!  

## Commands

## Important links
[![Join The Discord!](https://img.shields.io/discord/298510542535000065?color=orange&label=Join%20The%20Discord!%21)](https://discord.gg/QBJu4Dq)
[![Issues Open](https://img.shields.io/github/issues/BotMyst/BotMystRevival?color=orange)](https://github.com/BotMyst/BotMystRevival/issues)
[![Issues Closed](https://img.shields.io/github/issues-closed-raw/BotMyst/BotMystRevival?label=issues%20closed)](https://github.com/BotMyst/BotMystRevival/issues?q=is%3Aissue+is%3Aclosed)
[![Repo Stars!](https://img.shields.io/github/stars/BotMyst/BotMystRevival?color=orange&label=Repo%20Stars&logoColor=orange&style=social)](https://github.com/BotMyst/BotMystRevival/blob/master/README.md)


### Contributors

#### CodeMyst (Founder Of Bot)
[![CodeMyst (Founder of Bot)](https://img.shields.io/github/followers/codemyst?color=orange&label=Follow%20Them%21&logoColor=green&style=social)](https://github.com/codemyst)

#### IbrahimDev - Main Programmer 
[![IbrahimDev](https://img.shields.io/github/followers/minidevz?color=orange&label=Follow%20Them%21&logoColor=green&style=social)](https://github.com/minidevz)
 



## Building & running
- [📝 Apache 2.0 License](https://github.com/BotMyst/BotMystRevival/blob/master/LICENSE)
The bot is written with **Discord.JS**, meaning you can host it on your computer via `node .` if you have the folder open in a command line.

When you open the project, you will see a `config.json.example` file. You need to rename it to just `config.json`. This is where all of the bot configuration will be placed. The only fields that are essential for running the bot are `token` and `botSpam`.

`token` is your bots token.
`botspam` is the channel the bots commands are restricted to. Change this to an empty string if you want to use the bot anywhere.

```config.json
token: 'Enter your own token here!'
prefix: '>'
botSpam: 'Enter ChannelID of your #bot channel.
```
