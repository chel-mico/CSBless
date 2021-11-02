# CSBless

A discord bot to assist Western University computer science undergrads.

### Introduction:
* This discord bot is meant to assist Western University computer science undergrads in our unofficial (not affiliated with Western University) discord server of 1000+ members. If you are not from our class and you wish to demo the bot, check out [our server:](https://discord.gg/tJD5quPAA8)
* Built in node.js using the [discord.js library:](https://github.com/discordjs/discord.js)
* For students: to request a feature or report a bug, please submit an issue [here:](https://github.com/chel-mico/CSBless/issues)
* The name is homage to the CS Blessings google drive, a drive that has saved many first years from certain doom, including myself.
* Licensed under Apache 2.0.

### Dependencies
* [discord.js](https://github.com/discordjs/discord.js)
* [jest](https://github.com/facebook/jest)

### Installation (for contributors)

1. Clone the repo.
   ```sh
   git clone https://github.com/chel-mico/CSBless.git
   ```
2. Install discord.js.
   ```sh
   npm install discord.js
   ```
3. Install jest.
   ```sh
   npm install --save-dev jest
   ```
4. Create a new .env file with the following entries.
   ```sh
   PREFIX=&
   TOKEN=token-goes-here
   ```
5. Change the token value from 'token-goes-here' to a sample discord application's token. 
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
* E-mail - endreasy@gmail.com
* LinkedIn - https://www.linkedin.com/in/endreas-yohannes-077121208/
