const Enquirer = require("enquirer");
const clear = require("clear");
const { getDirectories } = require("./utils");
const editor = require("enquirer-prompt-editor");
const c = require("ansi-colors");

const FILE_TYPES = require("../static/fileTypes");
const {
  writeAllDirectories,
  createConfigInProjectRoot,
} = require("./filewrite");
const questionsF = require("./questions");

const enquirer = new Enquirer();
enquirer.register("editor", editor);

// ask questions
function promptUser() {
  //clear the command terminal
  clear();
  const rootDir = process.cwd();

  const allDirectories = getDirectories(rootDir);
  const supportedFileTypes = Object.keys(FILE_TYPES);

  if (allDirectories.length > 0) {
    enquirer
      .prompt(
        questionsF({
          allDirectories,
          supportedFileTypes,
        })
      )
      .then(async (answers) => {
        // Use user feedback for... whatever!!
        console.log(
          c.greenBright(
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
        try {
          await writeAllDirectories(inputs);
        } catch (err) {
          throw Error(err);
        }
        return answers;
      })
      .then(async (res) => {
        console.log(c.green("updated all files Successfully please check"));
        // createConfigInProjectRoot(rootDir);
        process.exit();
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log(
            c.red(`Prompt couldn't be rendered in the current environment`)
          );
        } else {
          // Something else went wrong
          console.error(c.red(error));
          process.exit();
        }
      });
  } else {
    console.log(c.red("Empty directory!"));
    process.exit();
  }
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

const init = {
  initialize() {
    return promptUser();
  },
};

module.exports = init;
