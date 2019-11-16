const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
var pdf = require('html-pdf')
const generateHTML = require("./generateHTML.js").generateHTML;

//const writeFileAsync = util.promisify(fs.writeFile);

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
                // const profileImg = user.avatar_url;
                // const actualName = user.name;
                // const company = user.company;
                // const username = user.login;
                // const location = user.location;
                // const github = user.html_url;
                // const blog = user.blog;
                // const bio = user.bio;
                // const publicRepos = user.public_repos;
                // const followers = user.followers;
                // const stars = user.public_gists;
                // const following = user.following;

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

                console.log(data)

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
            return //console.log(err);
        }

        //console.log("Success")
    });
}

function init() {
    try {
        promptUser();

        // await writeToFile(fileName, data)
    } catch (err) {
        console.log(err)
    }
}
init();
