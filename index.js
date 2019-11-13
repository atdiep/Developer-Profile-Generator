const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const html = require("./generateHTML.js");

inquirer.prompt({
    type: "input",
    name: "username",
    message: "What is your username?"
}).then(function({ username }) {
    const queryURL = `https://api.github.com/users/${username}`;

    axios.get(queryURL).then(function(response) {

    })
})
// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {

// }
// init();
