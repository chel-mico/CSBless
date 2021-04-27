# CSBless

A discord bot to assist the Western University CS class of '24 and '25.

### Introduction:
* This discord bot is meant to assist the Western University CS class of '24 and '25 in our discord server. If you are not from our class and you wish to demo the bot, check out [our server:](https://discord.gg/txXvqGte)
* Built in node.js using the [discord.js library:](https://github.com/discordjs/discord.js)
* For students: to request a feature or report a bug, please submit an issue [here:](https://github.com/chel-mico/CSBless/issues)
* The name is homage to the CS Blessings google drive, a drive that has saved many first years from certain doom, including myself.

### Dependencies
* [discord.js](https://github.com/discordjs/discord.js)
* [jest](https://github.com/facebook/jest)

### Installation (for contributors)

1. Clone the repo.
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install discord.js.
   ```sh
   npm install discord.js
   ```
3. Install jest.
   ```sh
   npm install --save-dev jest
   ```
4. Rename config-sample.json to config.json.
   ```sh
   config-sample.json >> config.json
   ```
5. In config.json, change the token value from 'token-goes-here' to a sample discord application's token. 
* (for more info on this, see: https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
6. Run the bot.
   ```sh
   node index.js
   ```

### Current features:
* Full reminder functionality for classes.
* The beginning stages of a linear algebra calculator to assist those taking linear algebra 1, with several vector operations.

### Future features:
* More linear algebra functionality, including matrix operations and support for complex numbers.
* A calculus 1 and 2 calculator in the future.
* A group note feature, where students can work on notes together for certain classes.

### Contact
* E-mail - endreas@hotmail.ca
* LinkedIn - https://www.linkedin.com/in/endreas-yohannes-077121208/
