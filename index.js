const inquirer=require('inquirer');
const fs=require("fs");
const util=require("util");

const writeFileAsync=util.promisify(fs.writeFile);

// Starting with the series of prompts
function promptUser(){
    return inquirer.prompt([
        {
            type:"input",
            message:"What's your title of your project?",
            name:"title"
        },
        {
             type:"input",
            message:"what is this project description? ",
            name:"description"
         },
        {
            type:"list",
            message:"Please select one of these licenses: ",
            name:"badge",
            choices:[
                "Apache",
                "IBM",
                "MIT",
                "Perl"
            ]
        },
        {
            type:"input",
            message:"Provide your e-mail address: ",
            name:"Email"
        },
        {
            type:"input",
            message:"Provide your github ID:",
            name:"github"
        },
        {
            type:"input",
            message:"Installation instructions:",
            name:"install"
        },
        {
            type:"list",
            message:"Do you have a URL to your screenshot?",
            name:"githubScreenshotquestion",
            choices:[
                "Yes",
                "No"
            ]
        },
        {
            type:"input",
            message:"URl?:",
            name:"githubScreenshot",
            when: function (answers){
                return answers.githubScreenshotquestion !== 'No';
            }
        },
        {
            type:"list",
            message:"Do you have a URL to your video?",
            name:"video",
            choices:[
                "Yes",
                "No"
            ]
        },
        {
            type:"input",
            message:"video URL?:",
            name:"videoanswer",
            when: function (answers){
                return answers.video !== 'No';
            }
        }

      ]);
    } 

    function generateMD(answers){
        var profile=("https://github.com/"+answers.github)
        var screencap = ("![image]("+ answers.githubScreenshot + ")")
        var videocap = ("![video]("+ answers.videoanswer + ")")
    return `
## Project Title
    *${answers.title}
     
## Description 
    *${answers.description}
## Table of contents
    * [Description](#description)
    * [Installation](#installation)
    * [Usage](#usage)
    * [License](#license)
    * [Tests](#tests)
    * [Questions](#questions)
## Installation
    * ${answers.install}
## License
     ${answers.badge ==="Apache" ? "Apache"+""+'<br>'+""+"![badge](https://img.shields.io/badge/License-Apache%202.0-blue.svg)" : answers.badge ==="MIT" ? "MIT"+""+'<br>'+""+"![badge](https://img.shields.io/badge/License-MIT-yellow.svg)" : answers.badge==="IBM" ? "IBM"+""+'<br>'+""+"![badge](https://img.shields.io/badge/License-IPL%201.0-blue.svg)" : "Perl"+""+'<br>'+""+"![badge](https://img.shields.io/badge/License-Perl-0298c3.svg)"}
## Questions
For questions regarding this application please contact me at:
    - E-mail: ${answers.Email}
    - Github: ${profile}
    - Screenshot: ${screencap}
    - walktrough: ${videocap}`; 
    }

    async function init() {
        console.log("Welcome to the README generator!");
        try{
            const answers=await promptUser();
            const md=generateMD(answers);
            await writeFileAsync("README.md",md);
            console.log("Success writing to README.md file");
        } catch(err){
            console.log(err);
        }
    }
    init();