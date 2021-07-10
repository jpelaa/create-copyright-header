const commandLineUsage = require("command-line-usage");
function usageGuide() {
  const optionDefinitions = [
    {
      name: "help",
      description: "Display this usage guide.",
      alias: "h",
      type: Boolean,
    },
  ];

  const sections = [
    {
      header: "Create copyright header",
      content:
        "create-copyright-header is a tool for generating copyright & license header, applying to given the directories and selected filetypes and updating at beginning of the files.",
    },
    {
      header: "Synopsis",
      content: [
        "$ npx create-copyright-header --generate",
        "$ npx create-copyright-header --help",
      ],
    },
    {
      header: "Options",
      optionList: optionDefinitions,
    },
    {
      header: "Examples",
      content: [
        {
          desc: "steps ",
          example:
            "Please refer : {underline https://github.com/jpelaa/create-copyright-header/blob/main/help.md}",
        },
      ],
    },
    {
      content:
        "Project home: {underline https://github.com/jpelaa/create-copyright-header}",
    },
  ];

  console.log(commandLineUsage(sections));
}
module.exports = usageGuide;
