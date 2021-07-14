const c = require("ansi-colors");
const figlet = require("figlet");

module.exports = {
  title: () =>
    console.log(
      `${c.yellow(
        figlet.textSync(" Create_Copyright_header ", {
          horizontalLayout: "default",
        })
      )}\n`
    ),
};
