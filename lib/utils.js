const fs = require("fs");
const chalk = require("chalk");

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

/**
 * Get the error message of a given value.
 * @param {any} error The value to get.
 * @returns {string} The error message.
 */
function getErrorMessage(error) {
  // Lazy loading because this is used only if an error happened.
  const util = require("util");

  // Foolproof -- thirdparty module might throw non-object.
  if (typeof error !== "object" || error === null) {
    return String(error);
  }

  // Use templates if `error.messageTemplate` is present.
  if (typeof error.messageTemplate === "string") {
    try {
      const template = require(`../messages/${error.messageTemplate}.js`);

      return template(error.messageData || {});
    } catch {
      // Ignore template error then fallback to use `error.stack`.
    }
  }

  // Use the stacktrace if it's an error object.
  if (typeof error.stack === "string") {
    return error.stack;
  }

  // Otherwise, dump the object.
  return util.format("%o", error);
}

/**
 * Catch and report unexpected error.
 * @param {any} error The thrown error object.
 * @returns {void}
 */
function onFatalError(error) {
  process.exitCode = 2;

  const message = getErrorMessage(error);

  console.error(chalk.red(`Oops! Something went wrong! :(${message}`));
}

function addInputContentAtFirst(copyRightContent, actualData) {
  const copyRightBuffer = Buffer.from(copyRightContent, "utf8");
  const bufferArr = [copyRightBuffer, actualData];
  const buffData = Buffer.concat(bufferArr);
  return buffData;
}

module.exports = {
  getDirectories,
  onFatalError,
  addInputContentAtFirst,
};
