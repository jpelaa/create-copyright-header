const inquirer = require("inquirer");
const clear = require("clear");
const { getDirectories } = require("./utils");
const clui = require("clui");
const chalk = require("chalk");

const FILE_TYPES = require("../static/fileTypes");
const { writeAllDirectories } = require("./filewrite");

// ask questions
function promptUser() {
  //clear the command terminal
  clear();
  const rootDir = process.cwd();

  const allDirectories = getDirectories(rootDir);

  const supportedFileTypes = Object.keys(FILE_TYPES);
  if (allDirectories.length > 0) {
    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: "checkbox",
          name: "selectedDirectorList",
          message:
            "Please select the directories which you want to add copyright header",
          choices: allDirectories,
          validate: function (selected) {
            if (selected.length === 0 || selected.includes["node_modules"]) {
              return false;
            }

            return true;
          },
          pageSize: allDirectories.length,
        },
        {
          type: "checkbox",
          name: "selectedFileTypeList",
          message: "Please select the file type below are supported file types",
          choices: supportedFileTypes,
          validate: function (selected) {
            if (selected.length === 0) {
              return false;
            }
            return true;
          },
          pageSize: supportedFileTypes.length,
        },
        {
          type: "editor",
          name: "copyRightContent",
          message: "Enter the copyright header content",
          validate: function (value) {
            if (value.length === 0) {
              return false;
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(
          chalk.greenBright(
            "Thank you for ur response. we are working on file updates"
          )
        );
        const inputs = {
          selectedDirectorList: answers.selectedDirectorList,
          selectedFileTypeList: answers.selectedFileTypeList.map(
            (data) => FILE_TYPES[data]
          ),
          copyRightContent: `${answers.copyRightContent}\n`,
        };
        return writeAllDirectories(inputs);
      })
      .then(() => {
        console.log(chalk.green("updated all files Successfully please check"));
        process.exit();
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log(
            chalk.red(`Prompt couldn't be rendered in the current environment`)
          );
        } else {
          // Something else went wrong
          console.error(chalk.red(error));
          process.exit();
        }
      });
  } else {
    console.log(chalk.red("Empty directory!"));
    process.exit();
  }
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

const init = {
  initialize(rootDir) {
    return promptUser(rootDir);
  },
};

module.exports = init;
