const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const html = require("./generateHTML.js");

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your username?"
    },
    {
        type: "list",
        name: "color",
        message: "Pick your prefered color showing on your profile.",
        choices: [
            "Blue",
            "Green",
            "Pink",
            "Red"
        ]
    }]).then(function ({ username , color}) {
        const queryURL = `https://api.github.com/users/${username}`;
        //const starredURL = `https://api.github.com/users/${username}/starred`

        axios.get(queryURL).then(function (response) {
            console.log(response)
            const user = response.data
            const profileImg = user.avatar_url;
            const username = user.login;
            const location = user.location;
            const github = user.html_url;
            const blog = user.blog;
            const bio = user.bio;
            const publicRepos = user.public_repos;
            const followers = user.followers;
            // axios.get(starredURL).then(function(response) {
            //     console.log(response)
            // })
            const following = user.following;
        })
    })

// function writeToFile(fileName, data) {

// }

// function init() {

// }
// init();
