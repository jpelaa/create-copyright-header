create-copyright-header - commandline generate copyright header

Usage: npx create-copyright-header
create-copyright-header is a tool for generating copyright & license header, applying to given the directories and selected filetypes and updating at beginning of the files.

we take input from user for directories they want to change, file type they want to update.

For more https://github.com/jpelaa/create-copyright-header

Example:

```
? Please select the directories which you want to add copyright header (Press <space> to select, <a> to toggle all, <i>
to invert selection)
>( ) .git
 ( ) .github
 ( ) bin
 ( ) lib
 ( ) static

 ? Please select the file type below are supported file types (Press <space> to select, <a> to toggle all, <i> to invert
selection)
>( ) JavaScript
 ( ) HTML
 ( ) CSS
 ( ) Kotlin
 ( ) Java
 ( ) JSP
 ( ) PHP
 ( ) Python
 ( ) .NET

 ? Enter the copyright header content Press <enter> to launch your preferred editor.
 /*
* Copyright (c) 2012 - 2014 {Company Org}.
* All rights reserved.
*/

Thank you for ur response. we are working on file updates
lib checking...
[|||||||||||||||||||||||||||||||||------------------------------------------------------------------] 34%
lib\filewrite.js is updated
lib checking...
[||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---------------------------------] 67%
lib\initializer.js is updated
lib checking...
[|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||] 100%
lib\utils.js is updated
static checking...
[|||||||||||||||||||||||||||||||||------------------------------------------------------------------] 34%
static\fileTypes.js is updated
static checking...
[||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||---------------------------------] 67%
static\folderExcludeList.js is updated
static checking...
[|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||] 100%
static\licenceCopyrightSamples.js is updated
updated all files Successfully please check

```

For a listing of options, use create-copyright-header --help.
