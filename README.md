# Evaluation project: Light Bulbs app

This is a simple web app to interacts with light bulbs. It allows you to turn on and off the light bulbs and change their brightness as well.

## Features

These are the features implemented in the app to help users to control their light bulbs.

1. Show a list with the available light bulbs.
2. Sort the list of light bulbs (devices) by name.
3. Select a light bulb from the list by clicking a row.
4. Turn the selected light bulb off/on through a switch toggle button.
5. Edit the light bulb name by click the **pencil** icon at the left of the row.
6. Change the light bulb brightness through a brightness control where you can drag a button to put the desired brightness.
7. Show a notification bar if any error comes up.

## Installation

Clone the repository to a local folder:
```sh
$ git clone https://github.com/darieldejesus/light-bulb-control-assigment
$ cd light-bulb-control-assigment/
```

Define required variables. This app requires a server to fetch the devices.
You can find a example **.env** file named **.env.example** with the required variable.
```sh
$ cp .env.example .env
$ echo "REACT_APP_API_URL=http://localhost:8080/api/v1/" >> .env
```

Then, run the following commands to install the required dependencies and start the app as development mode:
```sh
$ yarn install
$ yarn start
```
Finally, you just need to go to your browser and enter **http://localhost:3000/**.

## Running the tests
 
In order to run the tests and see the test coverage, you can execute one of these commands:

Only run the tests 
```sh
$ yarn test
``` 

Run the tests and print their coverage 
```sh
$ yarn test:coverage
``` 

## Deployment

Go to the root folder and execute the following command:
```sh
$ yarn build
``` 
The build will be located in the default **build** folder.

## Tools and standards

This project has been created following some standards to organize the source code.
* **ESLint** with the *Airbnb* and *Jest* standards to demand a clean code. See more: https://eslint.org/
* **JSDoc** to demand documentation on the functions and their parameters. See more: http://usejsdoc.org/
* **Redux** State manager to handler the different states of the app. See more: https://redux.js.org/
* **Redux Ducks** to organize the actions and reducers of *Redux*. See more: https://github.com/erikras/ducks-modular-redux
* **Jest** to test the source code. See more: https://jestjs.io/
* **Enzyme** utility to simplify the test cases and their implementation. See more: https://github.com/airbnb/enzyme


## Maintainers
**Dariel de Jesús**
