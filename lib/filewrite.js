const path = require("path");
const fs = require("fs");
const folderExcludeList = require("../static/folderExcludeList");
const chalk = require("chalk");
const clui = require("clui");
const Progress = clui.Progress;

function fromDir({
  mainDirectoryPath,
  selectedFileType,
  copyRightContent,
  foldersExclude = folderExcludeList,
}) {
  try {
 
    if (!fs.existsSync(mainDirectoryPath)) {
      throw new Error("No directory found");
    }

    const files = fs.readdirSync(mainDirectoryPath);
    const progressBar = new Progress(100);

    files.forEach((file, index) => {
      if (foldersExclude.includes(file)) {
        return;
      }
      const filename = path.join(mainDirectoryPath, file);
      const stat = fs.lstatSync(filename);
      const fileType = path.extname(file).substr(1);

      if (stat.isDirectory()) {
        fromDir({
          mainDirectoryPath: filename,
          selectedFileType,
          copyRightContent,
        }); //recurse
      } else if (selectedFileType.includes(fileType)) {
        console.log(chalk.cyanBright(`${mainDirectoryPath} checking...`));
        //passsing directoryPath and callback function
        const data = fs.readFileSync(filename); //read existing contents into data
        const firstTwoWord = data.toString().trim().substr(0, 2);
        if (firstTwoWord !== "/*" && copyRightContent) {
          const copyRightBuffer = Buffer.from(copyRightContent, "utf8");
          const bufferArr = [copyRightBuffer, data];
          const buffData = Buffer.concat(bufferArr);

          fs.writeFileSync(filename, buffData, { flag: "w+" });
          console.log(progressBar.update(index + 1, files.length));
          console.log(chalk.green(`${filename} is updated`));
        }
      } else {
        return;
      }
    });
  } catch (err) {
    throw Error(err);
  }
}

function writeAllDirectories({
  selectedDirectorList,
  selectedFileTypeList,
  copyRightContent,
}) {
  try {
    return selectedDirectorList.forEach((currentDirectory) => {
      return fromDir({
        mainDirectoryPath: currentDirectory,
        selectedFileType: selectedFileTypeList,
        copyRightContent,
      });
    });
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  writeAllDirectories,
  fromDir,
};
