#!/usr/bin/env node

const { title } = require("../lib/title");
const usageGuide = require("../lib/usageGuide");
const commandLineArgs = require("command-line-args");
const optionDefinitions = require("../static/options");
const { onFatalError } = require("../lib/utils");
const options = commandLineArgs(optionDefinitions);

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

(async function main() {
  title();
  if (options && Object.keys(options).length > 0) {
    if (options.help) {
      usageGuide();
    } else if (options.generate) {
      await require("../lib/initializer").initialize();
    }
  } else {
    usageGuide();
  }

  return;
})().catch(onFatalError);
