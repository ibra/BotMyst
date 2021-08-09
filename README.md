<h1 align="center" style="position: relative;">
    BotMyst : Revived
</h1>

<h2 align="center" style="position: relative;">
    A redesign of BotMyst in JavaScript.
</h2>



## Disclaimer
CodeMyst is not responsible for the maintaining or development of this project any longer. 
Any issues or queries should be sent straight to [me](https://github.com/ibra).

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
