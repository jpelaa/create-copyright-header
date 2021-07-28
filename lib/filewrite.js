const path = require("path");
const fs = require("fs");
const folderExcludeList = require("../static/folderExcludeList");
const c = require("ansi-colors");
const clui = require("clui");
const { addInputContentAtFirst } = require("./utils");
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
        console.log(c.cyanBright(`${mainDirectoryPath} checking...`));
        //passsing directoryPath and callback function
        const data = fs.readFileSync(filename); //read existing contents into data
        const stringifiedData = data.toString().trim();
        if (
          copyRightContent &&
          !stringifiedData.includes(copyRightContent.trim())
        ) {
          const buffData = addInputContentAtFirst(copyRightContent, data);
          fs.writeFileSync(filename, buffData, { flag: "w+" });
          console.log(progressBar.update(index + 1, files.length));
          console.log(c.magentaBright(`${filename} is updated`));
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

function createConfigInProjectRoot(rootDir) {
  try {
    const copyrightJSON = {
      content: res.copyRightContent,
    };
    let data = JSON.stringify(copyrightJSON, null, 2);
    fs.writeFileSync(`${rootDir}/copyright.json`, data);
  } catch (err) {
    throw Error(err);
  }
  console.log(c.yellow("Created config file : copyright.json"));
}

module.exports = {
  writeAllDirectories,
  fromDir,
  createConfigInProjectRoot,
};
