# Movie Collection

### Purpose of the project
This is a tech-demo project with studying purpose for myself, which consist of
* Gulp-based build system
* Frontend test-system based on Karma and mocha
* Frontend client UI based on Reactjs with React Router for the SPA structure
* Data-model and authentication based on Firebase
* Javascript ES6 used with Babel for compatibility
* 

### Install and run

1. Download nodeJs/NPM [Nodejs](https://nodejs.org/download/)
2. Check nodejs/NPM version in your command prompt/terminal with `node -v` and `npm -v` command.
* With the `npm i` command, you should install the node dependencies for the project
* You should check, that gulp is properly installed with the `gulp -v` command. If it is not, navigate to the project library in the command prompt/terminal if you are not at there, and then `npm install -g gulp`, and after the installation, check again.
* Start development with gulp by the `gulp` or `gulp watch` command.
* If you didn't install gulp before, you might get a 'gulp is not internal command' or something like this error, than you have to install the gulp manully as global, with this command: `npm i gulp -g --save`
* After the first run of the Gulp-based deployment system, a 'Build' directory will be created, which stores all the tested, compiled and concatenated files that needed for the client side.

### Build system

* [Gulp description](gulp_description.md)
