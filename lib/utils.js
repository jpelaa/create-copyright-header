const fs = require("fs");
const { SAMPLE_TWO_COPYRIGHT } = require("../static/licenceCopyrightSamples");

function dateFormat(date, fstr, utc) {
  utc = utc ? "getUTC" : "get";
  return fstr.replace(/%[YmdHMS]/g, function (m) {
    switch (m) {
      case "%Y":
        return date[utc + "FullYear"](); // no leading zeros required
      case "%m":
        m = 1 + date[utc + "Month"]();
        break;
      case "%d":
        m = date[utc + "Date"]();
        break;
      case "%H":
        m = date[utc + "Hours"]();
        break;
      case "%M":
        m = date[utc + "Minutes"]();
        break;
      case "%S":
        m = date[utc + "Seconds"]();
        break;
      default:
        return m.slice(1); // unknown code, remove %
    }
    // add leading zero if required
    return ("0" + m).slice(-2);
  });
}
/* dateFormat (new Date (), "%Y-%m-%d %H:%M:%S", true) returns 
   "2012-05-18 05:37:21"  */

function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path + "/" + file).isDirectory();
  });
}

function getCopyrightContent({
  companyName = "company org",
  startYear,
  endYear,
}) {
  const currentYear = new Date().getFullYear();
  return `/*
  * Copyright (c) ${startYear ? startYear : currentYear} - ${
    endYear ? endYear : currentYear + 1
  } ${companyName}.
  * All rights reserved.
  */`;
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
  dateFormat,
  getDirectories,
  getCopyrightContent,
  onFatalError,
  addInputContentAtFirst,
};
