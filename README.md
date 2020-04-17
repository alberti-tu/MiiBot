# MiiBot

This project was generated with:

Package                               | Version | Optional
--------------------------------------|---------|---------
[Node JS](https://nodejs.org)         | 12.16.1 | &#x2718;
[Maria DB](https://mariadb.org)       | 10.1.44 | &#x2718;
[Angular CLI](https://cli.angular.io) | 9.1.0   | &#x2714;

## 1. Installation

Installing NodeJS and NPM for Linux systems

```bash
sudo apt update -y
sudo apt upgrade -y

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install nodejs -y

sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

Installing MariaDB server and set execution permitions

```bash
sudo apt install mariadb-server -y
mysql --user="root" --database="mysql" --execute="update user set plugin='' where User='root'; flush privileges;"
```

Installing Angular CLI (optional)

```bash
sudo npm install -g @angular/cli@9.1.0
```

## 2. User interface (optional)

If you want to add a different user interface (UI) in order to manage the system, execute the following commands in a shell window after editing the folder project MiiBot-client.

```bash
cd MiiBot-client
npm install
ng build --prod
```

## 3. Configuration

Open the configuration file and set your token keys and params before start the server.

```bash
nano MiiBot-server/src/config.ts
```

Set the Telegram API token key on bot ➞ token. 

If you don't have this number talk with [Bot Father](https://t.me/botfather), create a bot and save its token key.

## 4. Start server

Install the dependences and start the program.

```bash
cd MiiBot-server
npm install
sudo npm start
```