#!/usr/bin/env node

const chalk = require("chalk");
const { onFatalError } = require("../lib/utils");

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

(async function main() {
  console.log(chalk.yellow("Copyright header"));
  await require("../lib/initializer").initialize();
  return;
})().catch(onFatalError);
