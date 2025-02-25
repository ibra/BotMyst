<h1 align="center" style="position: relative;">
    BotMyst
</h1>
BotMyst is a general-purpose utility bot originally conceptualized by CodeMyst. This is a rewrite of the bot in Typescript.

## Building & running

- [📝 Apache 2.0 License](https://github.com/BotMyst/BotMystRevival/blob/master/LICENSE):
  The bot is written with **Discord.JS**, so you can host it on your computer via `node`.

The bots configuration is managed by `dotenv`.

When you open the project, you will see a `.example.env` file. You need to rename it to just `.env`. The only fields that are essential for running the bot are `token` and `prefix`.

`token` is your bots token that can be acquired from the [discord developer portal](https://discord.com/developers/applications).

`botspam` is the channel the bots commands are restricted to. Change this to `None` if you want to use the bot anywhere.

```env
TOKEN:  Token Goes Here
PREFIX: Prefix Goes Here
```

After you are done with the configuration, a local instance of the bot can be hosted by using


```bash
npm run start
```

## Disclaimer

CodeMyst is not responsible for the maintaining or development of this project any longer.
Any issues or queries should be sent straight to [me](https://github.com/ibra).
