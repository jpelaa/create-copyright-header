#!/usr/bin/env node

const { title } = require("../lib/title");
const usageGuide = require("../lib/usageGuide");
const commandLineArgs = require("command-line-args");
const optionDefinitions = [{ name: "help", alias: "h", type: Boolean }];
const { onFatalError } = require("../lib/utils");
const options = commandLineArgs(optionDefinitions);

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

(async function main() {
  title();

  if (options && Object.keys(options).length > 0 && options.help) {
    usageGuide();
  } else {
    await require("../lib/initializer").initialize();
  }
  return;
})().catch(onFatalError);
