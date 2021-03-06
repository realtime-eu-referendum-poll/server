# Realtime EU Referendum Poll Server

## Screenshots

![](http://i.imgur.com/j4fLfYA.png)
![](http://i.imgur.com/zoOUCnb.png)
![](http://i.imgur.com/VnxOGHi.png)

## Setup

### Step 1: Setup the Server

Download the server code from GitHub and run `npm install` ():

```
git clone https://github.com/realtime-eu-referendum-poll/server
cd server
npm install
```

Then, create a file called `.env` in the project root and fill in your Pusher credentials:

```
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
```

(For an example `.env` file, see [`.env.example`](https://github.com/realtime-eu-referendum-poll/server/blob/master/.env.example))

Finally, run `npm run dev` to start the server in development mode.

*Note that there is no need to setup a database, as the server uses a local [sqlite instance](https://www.sqlite.org/).*

### Step 2: Setup the Client

The client code lives in a separate repository, which you can find [here](https://github.com/realtime-eu-referendum-poll/client).

Just like with the server, the first step is  download the client code and dependencies:

```
git clone https://github.com/realtime-eu-referendum-poll/client
cd client
npm install
```

Once the download has finished, you'll want to replace the [`PUSHER_KEY` value](https://github.com/realtime-eu-referendum-poll/client/blob/master/webpack.config.js#L35) inside [`webpack.config.js`](https://github.com/realtime-eu-referendum-poll/client/blob/master/webpack.config.js) with your own.

Make sure the server is **already** running on port `3000` and then run `npm run dev` in a new terminal window to start the client in development mode. Once you've done that - if all went well - you should be able to access the app in your browser at `http://localhost:8080`.
