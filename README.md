SPA Scaffolding
===============

> A grunt workflow to get you started with your SPA.

This is a starter package to help you work in a multi-brand, best-practice kinda way.
You can:

- [x] [Create the folder structure](#create-folders)
- [x] [Download the latest theme and install it](#download-theme)
- [x] [Run you project against a watch](#run)
- [x] [Version it](#cache-busting-and-new-versions)


_If you're interested looking for team related documentation and best practice please visit our [wiki](https://github.com/WestpacCXTeam/CX-GIT/wiki)_

# Setup

### MAC
2. Download [NodeJS](http://nodejs.org/) and install on your computer.
2. Run `sudo npm install npm -g` to update to the newest NPM version.
2. Run `sudo npm install -g grunt-cli` to install grunt globally (You might need to install the xCode command line tools)

### PC
2. Download [NodeJS](http://nodejs.org/) and install on your computer.
2. Run `npm install npm -g` to update to the newest NPM version.
2. Run `npm install -g grunt-cli` to install grunt globally

After that, download, unzip, `cd` into the folder and install all dependencies:

4. [Download this repo](https://github.com/WestpacCXTeam/SPA-scaffolding/archive/master.zip) and unpack it into a folder of your choice.
4. CD into the folder `cd c:/Users/MYNAME/Sites/MYPROJECT`
4. Run `npm install` to install all dependencies.

# Create folders

Then create folder structure with:

```shell
grunt scaffold
```

To personalise your project make sure you enter the projects name in the `package.json` with the key: `"name"`.

```JSON
{
  "name": "YOUR-NAME-HERE",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
  etc...
```

# Download theme

Get the current theme for all brands with:

```
grunt get-theme
```

_Note: we have included two `HTMLincludes` snippets for header and footer code to make the inclusion of the theme easy_


# Run

After adding your files and saving them use below command to create a server and add a watch:

```
grunt
```

Visit [http://localhost:9000/](http://localhost:9000/) to see your `PROD` folder.


# Cache busting and new versions

Run below code to bump up to the next version and cache bust your application:

```
grunt bumpup
```

If you want to reference the new version string in your HTML, JS or CSS just use this:

```
--currentVersion--
```

It will be replaced by grunt to the current version.


# Folder structure

The below folder structure will explain what should go where:

```
.
├── BOM                                  // BRAND FOLDER FOR BOM (1)
│   ├── _HTML
│   │   └── includes
│   ├── _HTMLincludes                    // The _HTMLincludes folder (2)
│   │   ├── defaults
│   │   │   ├── svgs.html
│   │   │   ├── theme-foot.html
│   │   │   └── theme-head.html
│   │   ├── modernizr.html
│   │   └── windows.html
│   ├── _css                             // The _css brand folder (3)
│   │   ├── png
│   │   └── theme.min.css
│   ├── _fonts                           // The _fonts brand folder (4)
│   │   ├── font.eot
│   │   ├── font.svg
│   │   └── font.ttf
│   ├── _img                             // The _img brand folder (5)
│   ├── _js                              // The _js brand folder (6)
│   │   ├── libs
│   │   ├── polyfills
│   │   │   ├── modernizr.js
│   │   │   └── polyfills.js
│   │   └── theme.min.js
│   ├── _less                            // The _less brand folder (7)
│   │   └── _settings.less               // The _settings.less file (8)
│   └── _svg                             // The _svg brand folder (9)
├── BSA                                  // BRAND FOLDER FOR BSA (1)
├── PROD                                 // The PROD folder (10)
│   ├── BOM
│   ├── BSA
│   ├── STG
│   └── WBC
├── STG                                  // BRAND FOLDER FOR STG (1)
├── WBC                                  // BRAND FOLDER FOR WBC (1)
├── _CORE                                // THE _CORE FOLDER (11)
│   ├── _HTML                            // The _HTML core folder (12)
│   │   ├── _templates
│   │   ├── _views
│   │   └── index.html
│   ├── _HTMLincludes                      // The _HTMLincludes core folder (13)
│   │   ├── defaults
│   │   │   ├── svgs.html
│   │   │   ├── theme-foot.html
│   │   │   └── theme-head.html
│   │   ├── modernizr.html
│   │   └── windows.html
│   ├── _js                               // The _js core folder (14)
│   │   ├── common
│   │   ├── controllers
│   │   ├── directives
│   │   ├── factories
│   │   ├── filters
│   │   ├── 010.libs
│   │   ├── services
│   │   └── tests                        // The tests core folder (15)
│   ├── _Mock                            // The _Mock core folder (16)
│   └── _less                            // The _less core folder (17)
│       ├── base
│       │   ├── fonts.less
│       │   ├── mixins.less
│       │   ├── print.less
│       │   ├── scaffolding.less
│       │   └── type.less
│       ├── modules
│       │   └── module.less
│       └── site.less                    // The site.less file (18)

```


### BRAND FOLDER FOR BOM (1)

The brand folders represent the difference of the codebase between each other.
Files changed here will feed into its counterpart in `PROD`.


### The _HTMLincludes folder (2)

You can merge two HTML files into on with a simple code snippet like:

```
include "modernizr.html"
```

_Note: you can also organize your `_HTMLincludes` folder in subfolders_


### The _css brand folder (3)

Files in here will automatically copied to its counterpart folder in `PROD`.
This is the place to add the GUI and some of its files e.g.: `theme.min.css` or `png/`.


### The _fonts brand folder (4)

Files in here will automatically copied to its counterpart folder in `PROD`.
There are some GUI font files that will fit in here.


### The _img brand folder (5)

Images in here will be minified and copied to its counterpart folder in `PROD`.


### The _js brand folder (6)

Files in here will automatically copied to its counterpart folder in `PROD`.
There are some GUI js files that will fit in here including `theme.min.js` and `polyfills.js`, these are essential in having an application that works cross browser.

We have taken the time to include some default libraries to get you started. It's worth noting that we are not using Angulars' default routing in this version of our SPA. We have chosen to use
[ui-router] (https://github.com/angular-ui/ui-router)

The unit testing framework we prefer is [Jasmine](http://jasmine.github.io/) < more to come >

### The _less brand folder (7)

Organise your less file here for each brand.
Try to use only the settings file where you overwrite the colors and you don't need to repeat yourself.
Include this file by pasting the following snippet into your header:

```
<link rel="stylesheet" media="all" type="text/css" href="css/--currentVersion--.min.css">
```


### The _settings.less file (8)

The `_settings.less` file is referenced by the grunt task and includes the `_CORE` less files.
This is where you have the settings for each brand which are then referenced in your `_CORE` files.


### The _svg brand folder (9)

SVG files in here will be minified and run through a grunticon task. The resulting files are:
- `--currentVersion--.data.png.css`
- `--currentVersion--.data.svg.css`
- `--currentVersion--.data.fallback.css`
- `sitepng/`

Include these into your site by pasting the follwoing snippet into your header:

```
<script>window.grunticon=function(e){if(e&&3===e.length){var t=window,n=!(!t.document.createElementNS||!t.document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||window.opera&&-1===navigator.userAgent.indexOf("Chrome")),o=function(o){var r=t.document.createElement("link"),a=t.document.getElementsByTagName("script")[0];r.rel="stylesheet",r.href=e[o&&n?0:o?1:2],a.parentNode.insertBefore(r,a)},r=new t.Image;r.onerror=function(){o(!1)},r.onload=function(){o(1===r.width&&1===r.height)},r.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}};grunticon( [ "css/--currentVersion--.data.svg.css", "css/--currentVersion--.data.png.css", "css/--currentVersion--.fallback.css" ] );</script>
<noscript><link href="css/--currentVersion--.fallback.css" rel="stylesheet"></noscript>
```

_Note: we included an `HTMLinclude` snippet for you that you only need to uncomment in the index file_

-------------------------------------------------------------------------------------------------------------------------------------


### The PROD folder (10)

The `PROD` folder is where all files are compiled to.
Each brand has its own folder and should be runnable with the build in server.
*Do not change anything in here as this folder will be deleted and recreated on each iteration*

-------------------------------------------------------------------------------------------------------------------------------------


### THE _CORE FOLDER (11)

The `_CORE` folder is where all files sit that are the same on each brand. Try to keep as much in here as possible to keep all brands consistent.


### The _HTML core folder (12)

This folder should contain all of your HTML files. Organise them into subfolders to keep them clean.

_Remember: you can use your [_HTMLincludes](#the-_htmlincludes-folder-2) to brand these files._

### The _HTMLincludes core folder (13)

The _HTMLincludes folder is copied into each branch folder, then the brand folders override all the files for each brand.


### The _js core folder (14)

There are some GUI js files that will fit in here including `theme.min.js` and `polyfills.js`, these are essential in having an application that works cross browser.

We have taken the time to include some default libraries to get you started. It's worth noting that we are not using Angulars' default routing in this version of our SPA. We have chosen to use
[ui-router](https://github.com/angular-ui/ui-router)

### The tests core folder (15)

The tests folder is a place not only to put the tests themselves, but also reference the libraries as well. If you want to use any of the angular goodness in your project then copy the dependencies into the tests/libs folder.

### The _Mock core folder (16)

The mock folder is predominantly for mock API calls. Use it to store JSON structures.


### The _less core folder (17)

Organise your less project here. We have provided a starting point for you in this repo.


### The site.less file (18)

The `site.less` file should be referenced by the brand `_settings.less` and only includes all modules from the filesystem.

_Remember: Less files are cheap and so is documentation in less_
