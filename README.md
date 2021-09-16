# Create-copyright-header

This is CLI - to add copyright and license header to all files in the project
<p align='center'>
<img alt="Logo" align="right" src="https://github.com/jpelaa/create-copyright-header/blob/main/create-copyright-header.png" />
</p>
## Prerequisites

CLI require Node 8.9 or higher, together
with NPM 5.5.1 or higher.

## Quick Overview

```sh
npx create-copyright-header --generate
```

If you've previously installed `create-copyright-header` globally via `npm install -g create-copyright-header`, we recommend you uninstall the package using `npm uninstall -g create-copyright-header` or `yarn global remove create-copyright-header` to ensure that npx always uses the latest version.

## Installation

All that's needed to install create-copyright-header is to use npm to install it globally. For Linux `sudo` may be required.

```
npm install -g create-copyright-header
```

## Introduction
create-copyright-header - commandline generate copyright header

Usage: npx create-copyright-header --generate
create-copyright-header is a tool for generating copyright & license header, applying to given the directories and selected filetypes and updating at beginning of the files.

we take input from user for directories they want to change, file type they want to update.
For a listing of options, use create-copyright-header --help.


## Demo

<p align='center'>
<img src='https://github.com/jpelaa/create-copyright-header/blob/main/copyright.gif' width='600' alt='demo'>
</p>



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

