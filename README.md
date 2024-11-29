<center><img src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/320107669/original/484a05a1378ca78e78476b061c4844b13da2d21c/create-a-discord-bot-with-bunch-of-features.png" /></center>

# Discord Bot Base

A basic Discord bot with a `/example` command to get started quickly. This repository is designed to be easy to set up and customize.

---

## Features

- Simple and extensible slash commands.
- Organized structure with support for separate command files.
- Scripts for easy installation and startup.

---

## Requirements

- **Node.js** version 16.9.0 or higher.
- A Discord account with access to the [Discord Developer Portal](https://discord.com/developers/applications).
- A bot application configured in the Developer Portal.

---

## Installation

### 1. Clone the repository

Download or clone the repository locally:
```bash
https://github.com/AlphaX50/Discord-Bot-Base.git
cd Discord-Bot-Base
```

### 2. Install dependencies

Run the install_requirements.bat script to install the required dependencies:

```bash
install_requirements.bat
```

This will install all the necessary packages, including discord.js, which is required to run the bot.

---

## Configuration

### 1. Configure the config.json file

Modify the config.json file at the root of the project and fill in the necessary values:

```json
{
  "token": "BOT TOKEN",
  "clientId": "APPLICATION ID",
  "guildId": "GUILD ID (OPTIONAL)",
  "debug" : false
}
```

### 2. Retrieve your bot Token

1. Go to the Discord Developer Portal.
2. Select your application or create a new one.
3. Go to the Bot tab, and click Reset Token to generate a new token.
4. Copy the token and paste it into the config.json file, replacing "BOT TOKEN".

### 3. Retrieve your Application ID

1. In the Discord Developer Portal, click on your application.
2. Find the Application ID in the General Information section.
3. Copy the Application ID and paste it into the config.json file, replacing "APPLICATION ID".

### 4. Add the bot to a server

1. Use the following link to add the bot to your Discord server:
```bash
https://discord.com/oauth2/authorize?client_id=YOUR_APPLICATION_ID_HERE&scope=bot%20applications.commands&permissions=8
```
2. Replace YOUR_APPLICATION_ID with your bot’s Application ID.
3. Grant the required permissions and invite the bot to your server.

### Running the Bot

To start the bot, use the start.bat script:

```bash
start.bat
```
Or (in terminal)

```bash
node index.js
```
---

## Contact

If you encounter any issues or need assistance, feel free to reach out to me on Discord: alphax50.
