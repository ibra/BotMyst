<h1 align="center" style="position: relative;">
    BotMyst : Revived
</h1>

<h2 align="center" style="position: relative;">
    A redesign of BotMyst in JavaScript.
</h1>

<h2 align="center" style="position: relative;">
    Issues
</h1>

[![Issues Open](https://img.shields.io/github/issues/BotMyst/BotMystRevival?color=orange)](https://github.com/BotMyst/BotMystRevival/issues)
[![Issues Closed](https://img.shields.io/github/issues-closed-raw/BotMyst/BotMystRevival?label=issues%20closed)](https://github.com/BotMyst/BotMystRevival/issues?q=is%3Aissue+is%3Aclosed)

## Contributers

#### IbrahimDev 
[![IbrahimDev](https://img.shields.io/github/followers/ibra?color=orange&label=Follow%20Them%21&logoColor=green&style=social)](https://github.com/ibra) 

DISCLAIMER: CodeMyst is not responsible for the maintaining or development of this project any longer. Any issues or queries should be sent straight to me.
 

## Building & running
- [📝 Apache 2.0 License](https://github.com/BotMyst/BotMystRevival/blob/master/LICENSE):
The bot is written with **Discord.JS**, so you can host it on your computer via `node`.

When you open the project, you will see a `config.example.json` file. You need to rename it to just `config.json`. This is where all of the bot configuration will be placed. The only fields that are essential for running the bot are `token` and `botSpam`.

`token` is your bots token.
`botspam` is the channel the bots commands are restricted to. Change this to `None` if you want to use the bot anywhere.


```config.json
token: 'Enter your own token here!'
prefix: '>'
botSpam: 'Enter ChannelID of your #bot channel.
```
