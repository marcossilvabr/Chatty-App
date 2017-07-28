Chatty App
=====================

A single-page app built with ReactJS, Webpack, Babel, Node.js and WebSockets.
The client communicates with the server.js using WebSocktes and updates in real-time.

No DB involved, this project focus on using ReactJS in order to show changes in real-time.

### Screenshot:

!["Screenshot"](https://github.com/marcossilvabr/Chatty-App/blob/master/docs/sc.png)

![chatty-app](/docs/gif.gif?raw=true)

### Usage

Clone the repo to your local machine.
Install the dependencies and start the server.

(YOU WILL NEED TO RUN 2 SERVERS)

1st:

```
cd to `chatty-server`
node server.js
```

2nd:

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
