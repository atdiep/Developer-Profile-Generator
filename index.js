const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const pdf = require('html-pdf')
const generateHTML = require("./generateHTML.js").generateHTML;

function promptUser() {
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
                "blue",
                "green",
                "pink",
                "red"
            ]
        }]).then(function ({ username, color }) {
            console.log(color)
            const queryURL = `https://api.github.com/users/${username}`;
            axios.get(queryURL).then(function (response) {
                // //console.log(response)
                const user = response.data

                var data = {
                    profileImg: user.avatar_url,
                    actualName: user.name,
                    company: user.company,
                    username: user.login,
                    location: user.location,
                    github: user.html_url,
                    blog: user.blog,
                    bio: user.bio,
                    publicRepos: user.public_repos,
                    followers: user.followers,
                    stars: user.public_gists,
                    following: user.following,
                    color: color
                }
                //console.log(data)
                var populate = generateHTML(data)
                PDFCreate(data.username, populate);
            });
        });
}


function PDFCreate(user, data) {

    const fileName = user + ".pdf";
    var options = { format: 'Letter' };
    pdf.create(data, options).toFile(fileName, function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("Success")
    });
}

function init() {
    try {

        promptUser();

    } catch (err) {

        console.log(err)

    }
}
init();
