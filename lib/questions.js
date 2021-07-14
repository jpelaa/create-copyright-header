const questions = ({ allDirectories, supportedFileTypes }) => {
  return [
    /* Pass your questions in here */
    {
      type: "multiselect",
      name: "selectedDirectorList",
      message:
        "Please select the directories which you want to add copyright header",
      choices: allDirectories,
      validate: function (selected) {
        if (selected.length === 0) {
          return false;
        }

        return true;
      },
      pageSize: allDirectories.length,
    },
    {
      type: "multiselect",
      name: "selectedFileTypeList",
      message: "Please select the file type below are supported file types",
      choices: supportedFileTypes,
      validate: function (selected) {
        if (selected.length === 0) {
          return false;
        }
        return true;
      },
      pageSize: supportedFileTypes.length,
    },
    {
      type: "editor",
      name: "copyRightContent",
      message: "Enter the copyright header content",
      validate: function (value) {
        if (!value) {
          return false;
        }
        return true;
      },
    },
  ];
};

module.exports = questions;
