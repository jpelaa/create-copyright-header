const chalk = require("chalk");
const pkgDir = require("pkg-dir");
const { onFatalError } = require("../lib/utils");

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

(async function main() {
  console.log(chalk.yellow("Copyright header"));
  const rootDir = await pkgDir(__dirname);

  await require("../lib/initializer").initialize(rootDir);
  return;
})().catch(onFatalError);
