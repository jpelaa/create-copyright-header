const chalk = require("chalk");
const figlet = require("figlet");

module.exports = {
  title: () =>
    console.log(
      `${chalk.yellow(
        figlet.textSync(" Create_Copyright_header ", {
          horizontalLayout: "default",
        })
      )}\n`
    ),
};
