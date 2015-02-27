'use strict';

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//                         ███████╗ ████████╗  █████╗  ██████╗  ████████╗ ███████╗ ██████╗         ██████╗   █████╗   ██████╗ ██╗  ██╗
//                         ██╔════╝ ╚══██╔══╝ ██╔══██╗ ██╔══██╗ ╚══██╔══╝ ██╔════╝ ██╔══██╗        ██╔══██╗ ██╔══██╗ ██╔════╝ ██║ ██╔╝
//                         ███████╗    ██║    ███████║ ██████╔╝    ██║    █████╗   ██████╔╝ █████╗ ██████╔╝ ███████║ ██║      █████╔╝
//                         ╚════██║    ██║    ██╔══██║ ██╔══██╗    ██║    ██╔══╝   ██╔══██╗ ╚════╝ ██╔═══╝  ██╔══██║ ██║      ██╔═██╗
//                         ███████║    ██║    ██║  ██║ ██║  ██║    ██║    ███████╗ ██║  ██║        ██║      ██║  ██║ ╚██████╗ ██║  ██╗
//                         ╚══════╝    ╚═╝    ╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝    ╚══════╝ ╚═╝  ╚═╝        ╚═╝      ╚═╝  ╚═╝  ╚═════╝ ╚═╝  ╚═╝
//                                                                                            Created by Westpac CX, Dominik Wilkowski
//
// Version:  1.1.1
// URL:      https://github.com/WestpacCXTeam/Starter-Pack
// Issues:   https://github.com/WestpacCXTeam/Starter-Pack/issues
//--------------------------------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// External dependencies
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
var figures = require('figures');


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
/*
 * get current version and increment by one
 *
 * grunt  object  Grunt object
 */
function NextVersion( grunt ) {
	var pkg = grunt.file.readJSON('package.json');
	var newVersion = pkg.version.split(".");
	newVersion[ (newVersion.length - 1) ] = parseInt( newVersion[ (newVersion.length - 1) ] ) + 1;

	return newVersion.join(".");
}


/*
 * handleize a string
 *
 * string  string  A string to be handelized
 */
function Handleize( string ) {
	return string.replace(/\W+/g, '-').toLowerCase();
}


/*
 * colorize a boolen value
 *
 * boolen  boolen  A boolen expression to be epressed with colors
 */
function Colorize( boolen ) {
	return boolen ? figures.tick.green + '  true'.green : figures.cross.red + '  false'.red;
}


/*
 * unzip GUI files and put in correct folder
 *
 * filepath  string  Filepath of each unziped file
 */
function UnzipGUI( filepath ) {
	var $dir = filepath.split('/'); //get full file path
	var $file = $dir[ ( $dir.length - 1 ) ]; //get file name
	var $path = filepath.replace($file, ''); //get path

	var $newDirs = {
		'fonts': '_fonts',
		'js': '_js',
		'css': '_css',
		'brand': '',
	};

	$dir[0] = $newDirs[ $dir[0] ];
	var newPath = $dir.join('/');

	if(newPath === '/less/colors.less') { //move colors.less
		return '_less/colors.less';
	}
	else if(newPath === '/less/') {
		return '_less/';
	}
	else {
		return newPath;
	}
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function (grunt) {


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// Dependencies
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-prompt');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-font');
	grunt.loadNpmTasks('grunt-wakeup');


	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'), //get the version and name from the package.json file
		currentVersion: '<%= pkg.name %>.<%= pkg.version %>',


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Clean task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		clean: {
			pre: [ //delete before running
				'./temp',
				'./prod',
			],

			includes: [ //delete HTML include files
				'./temp/BOM/_HTMLincludes',
				'./temp/BSA/_HTMLincludes',
				'./temp/STG/_HTMLincludes',
				'./temp/WBC/_HTMLincludes',
			],

			post: [ //delete after running
				'./temp',

				'./PROD/BOM/css/grunticon.loader.js',
				'./PROD/BOM/css/preview.html',

				'./PROD/BSA/css/grunticon.loader.js',
				'./PROD/BSA/css/preview.html',

				'./PROD/STG/css/grunticon.loader.js',
				'./PROD/STG/css/preview.html',

				'./PROD/WBC/css/grunticon.loader.js',
				'./PROD/WBC/css/preview.html',
			],
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Scaffold all directories
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		mkdir: {
			angular: { //angular template
				options: {
					create: [
						'./_CORE/_HTML/templates',
						'./_CORE/_HTML/views',
						'./_CORE/_js/020.directives',
						'./_CORE/_js/030.services',
						'./_CORE/_js/040.filters',
						'./_CORE/_js/050.factories',
						'./_CORE/_js/060.controllers',
						'./_CORE/_js/070.common',
					],
				},
			},

			less: { //less template
				options: {
					create: [
						'./_CORE/_js/010.libs',
						'./_CORE/_js/_tests',
						'./_CORE/_less/base',
						'./_CORE/_less/modules',
					],
				},
			},

			clean: { //clean template
				options: {
					create: [
						'./_CORE/_HTMLincludes/',
						'./_CORE/_js/',
						'./_CORE/_less/',
						'./_CORE/_mock',
					],
				},
			},

			brands: { //all the rest which is needed regardless of the type of template
				options: {
					create: [
						'./_BOM/_css/png',
						'./_BOM/_fonts',
						'./_BOM/_HTMLincludes',
						'./_BOM/_img',
						'./_BOM/_js/libs',
						'./_BOM/_less',
						'./_BOM/_svg',

						'./_BSA/_css/png',
						'./_BSA/_fonts',
						'./_BSA/_HTMLincludes',
						'./_BSA/_img',
						'./_BSA/_js/libs',
						'./_BSA/_less',
						'./_BSA/_svg',

						'./_STG/_css/png',
						'./_STG/_fonts',
						'./_STG/_HTMLincludes',
						'./_STG/_img',
						'./_STG/_js/libs',
						'./_STG/_less',
						'./_STG/_svg',

						'./_WBC/_css/png',
						'./_WBC/_fonts',
						'./_WBC/_HTMLincludes',
						'./_WBC/_img',
						'./_WBC/_js/libs',
						'./_WBC/_less',
						'./_WBC/_svg',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Includes task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		includes: {
			BOM: { //compile all HTML files in BOM
				cwd: './_CORE/_HTML/',
				src: [
					'**/*.html',
					'!/temp/BOM/_HTMLincludes/',
				],
				dest: './PROD/BOM/',
				options: {
					flatten: false,
					includePath: './temp/BOM/_HTMLincludes/',
				},
			},

			BSA: { //compile all HTML files in BSA
				cwd: './_CORE/_HTML/',
				src: [
					'**/*.html',
					'!/temp/BOM/_HTMLincludes/',
				],
				dest: './PROD/BSA/',
				options: {
					flatten: false,
					includePath: './temp/BSA/_HTMLincludes/',
				},
			},

			STG: { //compile all HTML files in STG
				cwd: './_CORE/_HTML/',
				src: [
					'**/*.html',
					'!/temp/BOM/_HTMLincludes/',
				],
				dest: './PROD/STG/',
				options: {
					flatten: false,
					includePath: './temp/STG/_HTMLincludes/',
				},
			},

			WBC: { //compile all HTML files in WBC
				cwd: './_CORE/_HTML/',
				src: [
					'**/*.html',
					'!/temp/BOM/_HTMLincludes/',
				],
				dest: './PROD/WBC/',
				options: {
					flatten: false,
					includePath: './temp/WBC/_HTMLincludes/',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Replace task for automatic versioning
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		replace: {
			BOM: { //look for versioning strings in BOM
				src: [
					'./PROD/BOM/**/*.html',
					'./PROD/BOM/**/*.css',
					'./PROD/BOM/**/*.js',
				],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			},

			BSA: { //look for versioning strings in BSA
				src: [
					'./PROD/BSA/**/*.html',
					'./PROD/BSA/**/*.css',
					'./PROD/BSA/**/*.js',
				],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			},

			STG: { //look for versioning strings in STG
				src: [
					'./PROD/STG/**/*.html',
					'./PROD/STG/**/*.css',
					'./PROD/STG/**/*.js',
				],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			},

			WBC: { //look for versioning strings in WBC
				src: [
					'./PROD/WBC/**/*.html',
					'./PROD/WBC/**/*.css',
					'./PROD/WBC/**/*.js',
				],
				overwrite: true,
				replacements: [{
					from: '--currentVersion--',
					to: '<%= currentVersion %>',
				}],
			}
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Less task
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		less: {
			BOM: { //compile less files with BOM specific settings
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
				},
				files: {
					'./PROD/BOM/css/<%= currentVersion %>.min.css': './_BOM/_less/_settings.less',
				},
			},

			BSA: { //compile less files with BSA specific settings
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
				},
				files: {
					'./PROD/BSA/css/<%= currentVersion %>.min.css': './_BSA/_less/_settings.less',
				},
			},

			STG: { //compile less files with STG specific settings
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
				},
				files: {
					'./PROD/STG/css/<%= currentVersion %>.min.css': './_STG/_less/_settings.less',
				},
			},

			WBC: { //compile less files with WBC specific settings
				options: {
					cleancss: true,
					compress: true,
					ieCompat: true,
					report: 'min',
				},
				files: {
					'./PROD/WBC/css/<%= currentVersion %>.min.css': './_WBC/_less/_settings.less',
				},
			}
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Vendor prefixes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		autoprefixer: {
			BOM: { //generate vendor prefixes for BOM
				src: './PROD/BOM/css/<%= currentVersion %>.min.css',
				dest: './PROD/BOM/css/<%= currentVersion %>.min.css',
			},

			BSA: { //generate vendor prefixes for BSA
				src: './PROD/BSA/css/<%= currentVersion %>.min.css',
				dest: './PROD/BSA/css/<%= currentVersion %>.min.css',
			},

			STG: { //generate vendor prefixes for STG
				src: './PROD/STG/css/<%= currentVersion %>.min.css',
				dest: './PROD/STG/css/<%= currentVersion %>.min.css',
			},

			WBC: { //generate vendor prefixes for WBC
				src: './PROD/WBC/css/<%= currentVersion %>.min.css',
				dest: './PROD/WBC/css/<%= currentVersion %>.min.css',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Minify js
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		uglify: {
			options: {
				mangle: false,
				report: 'gzip',
			},

			BOM: { //minify js files while excluding the _test folder for BOM
				files: {
					'./temp/BOM/js/zzzzz_precompile.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},

			BSA: { //minify js files while excluding the _test folder for BSA
				files: {
					'./temp/BSA/js/zzzzz_precompile.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},

			STG: { //minify js files while excluding the _test folder for STG
				files: {
					'./temp/STG/js/zzzzz_precompile.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},

			WBC: { //minify js files while excluding the _test folder for WBC
				files: {
					'./temp/WBC/js/zzzzz_precompile.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JS concatentation - core libraries and watch files
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			BOM: { //concatenate files together for BOM
				src: ['./temp/BOM/js/**/*'],
				dest: './PROD/BOM/js/<%= currentVersion %>.min.js',
			},

			BSA: { //concatenate files together for BSA
				src: ['./temp/BSA/js/**/*'],
				dest: './PROD/BSA/js/<%= currentVersion %>.min.js',
			},

			STG: { //concatenate files together for STG
				src: ['./temp/STG/js/**/*'],
				dest: './PROD/STG/js/<%= currentVersion %>.min.js',
			},

			WBC: { //concatenate files together for WBC
				src: ['./temp/WBC/js/**/*'],
				dest: './PROD/WBC/js/<%= currentVersion %>.min.js',
			},



			devBOM: { //concatenate files into a temp file for BOM
				src: [
					'./_CORE/_js/**/*',
					'!./_CORE/_js/_test/**/*.js',
				],
				dest: './temp/BOM/js/zzzzz_precompile.js',
			},

			devBSA: { //concatenate files into a temp file for BSA
				src: [
					'./_CORE/_js/**/*',
					'!./_CORE/_js/_test/**/*.js',
				],
				dest: './temp/BSA/js/zzzzz_precompile.js',
			},

			devSTG: { //concatenate files into a temp file for STG
				src: [
					'./_CORE/_js/**/*',
					'!./_CORE/_js/_test/**/*.js',
				],
				dest: './temp/STG/js/zzzzz_precompile.js',
			},

			devWBC: { //concatenate files into a temp file for WBC
				src: [
					'./_CORE/_js/**/*',
					'!./_CORE/_js/_test/**/*.js',
				],
				dest: './temp/WBC/js/zzzzz_precompile.js',
			},
		},

		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Minify svgs
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		svgmin: {
			BOM: { //minify BOM svgs
				files: [{
					expand: true,
					cwd: './_BOM/_svg/',
					src: ['*.svg'],
					dest: './temp/BOM/svg/',
				}],
			},

			BSA: { //minify BSA svgs
				files: [{
					expand: true,
					cwd: './_BSA/_svg/',
					src: ['*.svg'],
					dest: './temp/BSA/svg/',
				}],
			},

			STG: { //minify STG svgs
				files: [{
					expand: true,
					cwd: './_STG/_svg/',
					src: ['*.svg'],
					dest: './temp/STG/svg/',
				}],
			},

			WBC: { //minify WBC svgs
				files: [{
					expand: true,
					cwd: './_WBC/_svg/',
					src: ['*.svg'],
					dest: './temp/WBC/svg/',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Grunticon to convert svgs into cross browser css files and png fallbacks
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		grunticon: {
			BOM: { //generate SVG fallback files for BOM
				files: [{
					expand: true,
					cwd: './temp/BOM/svg',
					src: '*.svg',
					dest: './PROD/BOM/css',
				}],

				options: {
					datasvgcss: '<%= currentVersion %>.data.svg.css',
					datapngcss: '<%= currentVersion %>.data.png.css',
					urlpngcss: '<%= currentVersion %>.fallback.css',
					cssprefix: '.sitesymbol-',
					pngfolder: 'sitepng/',
					customselectors: {
						//'radio-on': ['input[type="radio"]:checked + label'],
						//'radio-off': ['.radio label', '.radio-inline label'],
						//'checkbox-on': ['input[type="checkbox"]:checked + label'],
						//'checkbox-off': ['.checkbox label', '.checkbox-inline label'],
					}
				}
			},

			BSA: { //generate SVG fallback files for BSA
				files: [{
					expand: true,
					cwd: './temp/BSA/svg',
					src: '*.svg',
					dest: './PROD/BSA/css',
				}],

				options: {
					datasvgcss: '<%= currentVersion %>.data.svg.css',
					datapngcss: '<%= currentVersion %>.data.png.css',
					urlpngcss: '<%= currentVersion %>.fallback.css',
					cssprefix: '.sitesymbol-',
					pngfolder: 'sitepng/',
					customselectors: {
						//'radio-on': ['input[type="radio"]:checked + label'],
						//'radio-off': ['.radio label', '.radio-inline label'],
						//'checkbox-on': ['input[type="checkbox"]:checked + label'],
						//'checkbox-off': ['.checkbox label', '.checkbox-inline label'],
					}
				}
			},

			STG: { //generate SVG fallback files for STG
				files: [{
					expand: true,
					cwd: './temp/STG/svg',
					src: '*.svg',
					dest: './PROD/STG/css',
				}],

				options: {
					datasvgcss: '<%= currentVersion %>.data.svg.css',
					datapngcss: '<%= currentVersion %>.data.png.css',
					urlpngcss: '<%= currentVersion %>.fallback.css',
					cssprefix: '.sitesymbol-',
					pngfolder: 'sitepng/',
					customselectors: {
						//'radio-on': ['input[type="radio"]:checked + label'],
						//'radio-off': ['.radio label', '.radio-inline label'],
						//'checkbox-on': ['input[type="checkbox"]:checked + label'],
						//'checkbox-off': ['.checkbox label', '.checkbox-inline label'],
					}
				}
			},

			WBC: { //generate SVG fallback files for WBC
				files: [{
					expand: true,
					cwd: './temp/WBC/svg',
					src: '*.svg',
					dest: './PROD/WBC/css',
				}],

				options: {
					datasvgcss: '<%= currentVersion %>.data.svg.css',
					datapngcss: '<%= currentVersion %>.data.png.css',
					urlpngcss: '<%= currentVersion %>.fallback.css',
					cssprefix: '.sitesymbol-',
					pngfolder: 'sitepng/',
					customselectors: {
						//'radio-on': ['input[type="radio"]:checked + label'],
						//'radio-off': ['.radio label', '.radio-inline label'],
						//'checkbox-on': ['input[type="checkbox"]:checked + label'],
						//'checkbox-off': ['.checkbox label', '.checkbox-inline label'],
					},
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Minify images
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		imagemin: {
			BOM: { //minify images for BOM
				options: {
					optimizationLevel: 4,
				},
				files: [{
					expand: true,
					cwd: './_BOM/_img',
					src: ['**/*.{png,jpg,gif}'],
					dest: './PROD/BOM/img/',
				}],
			},

			BSA: { //minify images for BSA
				options: {
					optimizationLevel: 4,
				},
				files: [{
					expand: true,
					cwd: './_BSA/_img',
					src: ['**/*.{png,jpg,gif}'],
					dest: './PROD/BSA/img/',
				}],
			},

			STG: { //minify images for STG
				options: {
					optimizationLevel: 4,
				},
				files: [{
					expand: true,
					cwd: './_STG/_img',
					src: ['**/*.{png,jpg,gif}'],
					dest: './PROD/STG/img/',
				}],
			},

			WBC: { //minify images for WBC
				options: {
					optimizationLevel: 4
				},
				files: [{
					expand: true,
					cwd: './_WBC/_img',
					src: ['**/*.{png,jpg,gif}'],
					dest: './PROD/WBC/img/',
				}],
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Copy all files to prod
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		copy: {

			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// HTML includes move directly from the core folder
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			BOMCoreincludes: { //move html includes into the BOM temp includes folder
				files: [{
					cwd: './_CORE/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/BOM/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSACoreincludes: { //move html includes into the BSA temp includes folder
				files: [{
					cwd: './_CORE/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/BSA/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGCoreincludes: { //move html includes into the STG temp includes folder
				files: [{
					cwd: './_CORE/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/STG/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCCoreincludes: { //move html includes into the STG temp includes folder
				files: [{
					cwd: './_CORE/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/WBC/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},


			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// HTML includes merge from the brand folder intot the code includes
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			BOMBrandincludes: { //move html includes into the BOM temp includes folder
				files: [{
					cwd: './_BOM/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/BOM/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSABrandincludes: { //move html includes into the BSA temp includes folder
				files: [{
					cwd: './_BSA/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/BSA/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGBrandincludes: { //move html includes into the STG temp includes folder
				files: [{
					cwd: './_STG/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/STG/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCBrandincludes: { //move html includes into the STG temp includes folder
				files: [{
					cwd: './_WBC/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/WBC/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// JavaScript files
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			BOMJS: { //move BOM js folder content
				files: [{
					cwd: './_BOM/_js/',
					src: ['**/*.js'],
					dest: './PROD/BOM/js/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSAJS: { //move BSA js folder content
				files: [{
					cwd: './_BSA/_js/',
					src: ['**/*.js'],
					dest: './PROD/BSA/js/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGJS: { //move STG js folder content
				files: [{
					cwd: './_STG/_js/',
					src: ['**/*.js'],
					dest: './PROD/STG/js/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCJS: { //move WBC js folder content
				files: [{
					cwd: './_WBC/_js/',
					src: ['**/*.js'],
					dest: './PROD/WBC/js/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// CSS files
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			BOMCSS: { //move BOM css folder content
				files: [{
					cwd: './_BOM/_css/',
					src: ['**/*'],
					dest: './PROD/BOM/css/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSACSS: { //move BSA css folder content
				files: [{
					cwd: './_BSA/_css/',
					src: ['**/*'],
					dest: './PROD/BSA/css/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGCSS: { //move STG css folder content
				files: [{
					cwd: './_STG/_css/',
					src: ['**/*'],
					dest: './PROD/STG/css/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCCSS: { //move WBC css folder content
				files: [{
					cwd: './_WBC/_css/',
					src: ['**/*'],
					dest: './PROD/WBC/css/',
					filter: 'isFile',
					expand: true,
				}],
			},

			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// font files
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			BOMFonts: { //move BOM fonts folder content
				files: [{
					cwd: './_BOM/_fonts/',
					src: ['**/*'],
					dest: './PROD/BOM/fonts/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSAFonts: { //move BSA fonts folder content
				files: [{
					cwd: './_BSA/_fonts/',
					src: ['**/*'],
					dest: './PROD/BSA/fonts/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGFonts: { //move STG fonts folder content
				files: [{
					cwd: './_STG/_fonts/',
					src: ['**/*'],
					dest: './PROD/STG/fonts/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCFonts: { //move WBC fonts folder content
				files: [{
					cwd: './_WBC/_fonts/',
					src: ['**/*'],
					dest: './PROD/WBC/fonts/',
					filter: 'isFile',
					expand: true,
				}],
			},


			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// html template
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			BOMHTML: { //move BOM html files into place
				files: [{
					cwd: './temp/BOM/',
					src: ['**/*.html'],
					dest: './PROD/BOM/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSAHTML: { //move BSA html files into place
				files: [{
					cwd: './temp/BSA/',
					src: ['**/*.html'],
					dest: './PROD/BSA/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGHTML: { //move STG html files into place
				files: [{
					cwd: './temp/STG/',
					src: ['**/*.html'],
					dest: './PROD/STG/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCHTML: { //move WBC html files into place
				files: [{
					cwd: './temp/WBC/',
					src: ['**/*.html'],
					dest: './PROD/WBC/',
					filter: 'isFile',
					expand: true,
				}],
			},


			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// Setup files
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			setupClean: { //move clean template files
				files: [{
					cwd: './.templates/clean/',
					src: ['**/*'],
					dest: './',
					filter: 'isFile',
					expand: true,
				}],
			},

			setupLess: { //move less template files
				files: [{
					cwd: './.templates/less/',
					src: ['**/*'],
					dest: './',
					filter: 'isFile',
					expand: true,
				}],
			},

			setupJavascript: { //move javascript template files
				files: [{
					cwd: './.templates/javascript/',
					src: ['**/*'],
					dest: './',
					filter: 'isFile',
					expand: true,
				}],
			},

			setupAngular: { //move angular template files
				files: [{
					cwd: './.templates/angular/',
					src: ['**/*'],
					dest: './',
					filter: 'isFile',
					expand: true,
				}],
			},

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Download latest GUI
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		curl: {
			BOM: { //download latest BOM theme
				src: 'http://info.westpac.com.au/cx/GEL/GUI/bom/downloads/theme.zip',
				dest: './temp/BOM/theme.zip',
			},

			BSA: { //download latest BSA theme
				src: 'http://info.westpac.com.au/cx/GEL/GUI/bsa/downloads/theme.zip',
				dest: './temp/BSA/theme.zip',
			},

			STG: { //download latest STG theme
				src: 'http://info.westpac.com.au/cx/GEL/GUI/stgeorge/downloads/theme.zip',
				dest: './temp/STG/theme.zip',
			},

			WBC: { //download latest WBC theme
				src: 'http://info.westpac.com.au/cx/GEL/GUI/westpac/downloads/theme.zip',
				dest: './temp/WBC/theme.zip',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Unzip theme and move files to brands
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		unzip: {
			BOM: { //unzip Bom zip and sort in
				router: UnzipGUI,

				src: './temp/BOM/theme.zip',
				dest: './_BOM/',
			},

			BSA: { //unzip BSA zip and sort in
				router: UnzipGUI,

				src: './temp/BSA/theme.zip',
				dest: './_BSA/',
			},

			STG: { //unzip STG zip and sort in
				router: UnzipGUI,

				src: './temp/STG/theme.zip',
				dest: './_STG/',
			},

			WBC: { //unzip WBC zip and sort in
				router: UnzipGUI,

				src: './temp/WBC/theme.zip',
				dest: './_WBC/',
			}
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Prompts for setup and versioning
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		prompt: {
			setup: { //setup questionnaire
				options: {
					questions: [
						{
							config: 'sure',
							type: 'confirm',
							message: "\n\n" +
								'		|-----------------------------------------------------------|'.red + "\n" +
								'		|                                                           |'.red + "\n" +
								'		|   ATTENTION! This setup will delete all exisiting files   |'.red + "\n" +
								'		|                                                           |'.red + "\n" +
								'		|-----------------------------------------------------------|'.red + "\n\n" +
								'		Do you really want to run the Setup now?'.magenta,
						},
						{
							when: function(answer) {
								return answer['sure'] === true;
							},
							config: 'setupTemplate',
							type: 'list',
							message: "\n\n" + '		With what kind of template do you want to start your project?'.magenta + "\n\n",
							choices: [
								{
									value: 'angular',
									name: 'Angular SPA with library files and prepared folders plus less files with settings for each brand and some commonly used HTMLincludes.',
								},
								{
									value: 'javascript',
									name: 'Javascript application setup with no dependencies and prepared folders plus less files with settings for each brand and some commonly used HTMLincludes.',
								},
								{
									value: 'less',
									name: 'Only less files with settings for each brand plus some commonly used HTMLincludes.',
								},
								{
									value: 'clean',
									name: 'A clean start without any assumtions about your project plus some commonly used HTMLincludes.',
								},
							]
						},
						{
							when: function(answer) {
								return answer['sure'] === true;
							},
							config: 'setupGUI',
							type: 'list',
							message: "\n\n" + '		Do you want to download and install the latest GUI files?'.magenta + "\n\n",
							choices: ['YES', 'NO'],
						},
						{
							when: function(answer) {
								return answer['sure'] === true;
							},
							config: 'setupName',
							type: 'input',
							message: "\n\n" + '		Please provide a new name for your project!'.magenta + "\n\n" +
								'Current name: ' + '<%= pkg.name %>'.yellow + ' (leave empty to keep current)',
						},
						{
							when: function(answer) {
								return answer['sure'] === true;
							},
							config: 'setupVersion',
							type: 'list',
							message: "\n\n" + '		With what version number would you like to start your project?'.magenta + "\n\n",
							choices: [
								{
									value: '0.0.1',
									name: '0.0.1 '.yellow,
								},
								{
									value: 'custom',
									name: '?.?.?'.yellow + ' Specify version...',
								},
							]
						},
						{
							when: function(answers) {
								return answers['setupVersion'] === 'custom';
							},
							config: 'setupVersion',
							type: 'input',
							message: "\n\n" + '		What specific version(?.?.?) would you like it to be?'.magenta + "\n\n",
						},
					],
					then: function(results) {
						if(results.sure) {
							var packageFile = grunt.file.readJSON('package.json');
							var messages = '';


							// create folders and copy template files
							grunt.task.run('mkdir:brands'); //create base folders
							grunt.task.run('mkdir:clean'); //create clean template folders

							//copy clean template files
							if(results.setupTemplate === 'clean') {
								grunt.task.run('copy:setupClean'); //copy clean template files
							}

							//copy less template files
							if(results.setupTemplate === 'less') {
								grunt.task.run('copy:setupClean'); //copy clean template files

								grunt.task.run('mkdir:less'); //create less template folders
								grunt.task.run('copy:setupLess'); //copy less template files
							}

							//copy javascript template files
							if(results.setupTemplate === 'javascript') {
								grunt.task.run('copy:setupClean'); //copy clean template files

								grunt.task.run('mkdir:less'); //create less template folders
								grunt.task.run('copy:setupLess'); //copy less template files

								grunt.task.run('copy:setupJavascript'); //copy angular template files
							}

							//copy angular template files
							if(results.setupTemplate === 'angular') {
								grunt.task.run('copy:setupClean'); //copy clean template files

								grunt.task.run('mkdir:less'); //create less template folders
								grunt.task.run('copy:setupLess'); //copy less template files

								grunt.task.run('mkdir:angular'); //create angular template folders
								grunt.task.run('copy:setupAngular'); //copy angular template files
							}

							messages += "\n" + '• We created all folders and copied the template "'.green + results.setupTemplate.yellow + '" into them...'.green;


							// download and install GUI
							if( results.setupGUI === 'YES' ) {
								grunt.task.run(['curl', 'unzip', 'clean:post']);
								messages += "\n" + '• We downloaded the GUI for you and installed it into your folders...'.green;
							}
							else {
								messages += "\n" + '- We did not download the GUI for you...'.grey;
							}


							// set the app name
							if(results.setupName !== '') {
								packageFile.name = Handleize( results.setupName );
								grunt.file.write('package.json', JSON.stringify( packageFile ) );

								messages += "\n" + '• We set the new name "'.green + Handleize( results.setupName ).yellow + '" for you...'.green;
							}
							else {
								messages += "\n" + '- We left the current name "'.grey + packageFile.name.yellow + '" alone...'.grey;
							}


							// set the app version
							if(results.setupVersion !== '##') {
								packageFile.version = results.setupVersion;
								grunt.file.write('package.json', JSON.stringify( packageFile ) );

								messages += "\n" + '• We set the new version to '.green + results.setupVersion.yellow + ' for you...'.green;
							}


							// report what has run and what hasn't
							grunt.registerTask('report', 'Report the summary', function() {
								console.log("\n" + messages + "\n\n");
							});

							grunt.task.run(['font:summary', 'report']);
						}
					},
				},
			},


			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// Run setup
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			runSetup: {
				options: {
					questions: [
						{
							config: 'runSetup',
							type: 'confirm',
							message: "\n\n" + '		Do you want to run the Setup now?'.magenta,
						},
					],
					then: function(results) { //writing package.json
						if(results.runSetup) {
							grunt.task.run(['setup']);
						}
						else {
							console.log("\n" + '	No worries...'.grey);
						}
					},
				},
			},


			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			// Bumb up to a new version
			//--------------------------------------------------------------------------------------------------------------------------------------------------------
			bumpup: {
				options: {
					questions: [
						{
							config: 'newVersion',
							type: 'list',
							message: 'Current version: ' + '<%= pkg.version %>'.red,
							choices: [
								{
									value: NextVersion( grunt ),
									name: 'Build: '.yellow + NextVersion( grunt ).yellow + ' Next release within this version.',
								},
								{
									value: 'custom',
									name: 'Custom: ?.?.?'.yellow + ' Specify version...',
								},
								{
									value: '##',
									name: 'No versioning'.yellow,
								},
							],
						},
						{
							config: 'newVersion',
							type: 'input',
							message: 'What specific version would you like',
							when: function(answers) {
								return answers['newVersion'] === 'custom';
							},
						},
					],
					then: function(results) { //writing package.json
						if(results.newVersion !== "##") {
							var packageFile = grunt.file.readJSON('package.json');
							packageFile.version = results.newVersion;
							grunt.file.write('package.json', JSON.stringify( packageFile ) );

							console.log("\n\nNew version has been set".green);
						}
					},
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Server
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		connect: {
			server: {
				options: {
					open: false,
					port: 9000,
					base: './PROD/',
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Banners
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		font: {
			options: {
				space: false,
				colors: ['white', 'magenta'],
				maxLength: 13,
			},

			setup: {
				text: ' Starter-Pack|        Setup',
			},

			summary: {
				text: '| Summary',
			},

			logo: {
				text: '|Starter-Pack',
			},

			server: {
				options: {
					font: 'console',
					colors: ['black'],
					background: 'white',
				},
				text: '|	Server running on http://localhost:9000',
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Wakeup ping
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		wakeup: {
			wakeme: {
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Watch for changes
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		watch: {

			HTML: { //watch all HTML files
				files: [
					'./_BOM/**/*.html',
					'./_BSA/**/*.html',
					'./_STG/**/*.html',
					'./_WBC/**/*.html',
					'_CORE/**/*.html',
				],
				tasks: [
					'copy:BOMCoreincludes',
					'copy:BOMBrandincludes',
					'copy:BSACoreincludes',
					'copy:BSABrandincludes',
					'copy:STGCoreincludes',
					'copy:STGBrandincludes',
					'copy:WBCCoreincludes',
					'copy:WBCBrandincludes',
					'includes',
					'clean:includes',
					'copy:BOMHTML',
					'copy:BSAHTML',
					'copy:STGHTML',
					'copy:WBCHTML',
					'replace',
					'clean:post',
					'wakeup',
				],
			},

			less: { //watch all less files
				files: [
					'./_BOM/**/*.less',
					'./_BSA/**/*.less',
					'./_STG/**/*.less',
					'./_WBC/**/*.less',
					'_CORE/**/*.less',
				],
				tasks: [
					'less',
					'autoprefixer',
					'copy:BOMCSS',
					'copy:BSACSS',
					'copy:STGCSS',
					'copy:WBCCSS',
					'replace',
					'clean:post',
					'wakeup',
				],
			},

			svg: { //watch all svg files
				files: [
					'./_BOM/**/*.svg', '!BOM/**/fonts/*.svg',
					'./_BSA/**/*.svg', '!BSA/**/fonts/*.svg',
					'./_STG/**/*.svg', '!STG/**/fonts/*.svg',
					'./_WBC/**/*.svg', '!WBC/**/fonts/*.svg',
					'_CORE/**/*.svg', '!_CORE/**/fonts/*.svg',
				],
				tasks: [
					'svgmin',
					'grunticon',
					'imagemin',
					'copy:BOMCSS',
					'copy:BSACSS',
					'copy:STGCSS',
					'copy:WBCCSS',
					'replace',
					'clean:post',
					'wakeup',
				],
			},

			jsBOM: { //watch all BOM js files
				files: [
					'./_BOM/**/*.js',
				],
				tasks: [
					'concat:devBOM',
					'copy:BOMJS',
					'replace:BOM',
					'concat:BOM',
					'clean:post',
					'wakeup',
				],
			},

			jsBSA: { //watch all BSA js files
				files: [
					'./_BSA/**/*.js',
				],
				tasks: [
					'concat:devBSA',
					'copy:BSAJS',
					'replace:BSA',
					'concat:BSA',
					'clean:post',
					'wakeup',
				],
			},

			jsSTG: { //watch all STG js files
				files: [
					'./_STG/**/*.js',
				],
				tasks: [
					'concat:devSTG',
					'copy:STGJS',
					'replace:STG',
					'concat:STG',
					'clean:post',
					'wakeup',
				],
			},

			jsWBC: { //watch all WBC js files
				files: [
					'./_WBC/**/*.js',
				],
				tasks: [
					'concat:devWBC',
					'copy:WBCJS',
					'replace:WBC',
					'concat:WBC',
					'clean:post',
					'wakeup',
				],
			},

			jsCore: { //watch all _CORE js files
				files: [
					'_CORE/**/*.js',
				],
				tasks: [
					'concat:devBOM',
					'concat:devBSA',
					'concat:devSTG',
					'concat:devWBC',
					'copy:BOMJS',
					'copy:BSAJS',
					'copy:STGJS',
					'copy:WBCJS',
					'replace',
					'concat:BOM',
					'concat:BSA',
					'concat:STG',
					'concat:WBC',
					'clean:post',
					'wakeup',
				],
			},

			fonts: { //watch all font files
				files: [
					'./_BOM/**/*.woff', './_BOM/**/*.woff2', './_BOM/**/*.ttf', './_BOM/**/*.eot', './_BOM/**/fonts/*.svg',
					'./_BSA/**/*.woff', './_BSA/**/*.woff2', './_BSA/**/*.ttf', './_BSA/**/*.eot', './_BSA/**/fonts/*.svg',
					'./_STG/**/*.woff', './_STG/**/*.woff2', './_STG/**/*.ttf', './_STG/**/*.eot', './_STG/**/fonts/*.svg',
					'./_WBC/**/*.woff', './_WBC/**/*.woff2', './_WBC/**/*.ttf', './_WBC/**/*.eot', './_WBC/**/fonts/*.svg',
					'_CORE/**/*.woff', '_CORE/**/*.woff2', '_CORE/**/*.ttf', '_CORE/**/*.eot', '_CORE/**/fonts/*.svg',
				],
				tasks: [
					'copy:BOMFonts',
					'copy:BSAFonts',
					'copy:STGFonts',
					'copy:WBCFonts',
					'clean:post',
					'wakeup',
				],
			},

			img: { //watch all image files
				files: [
					'./_BOM/**/*.jpg', './_BOM/**/*.jpeg', './_BOM/**/*.png', './_BOM/**/*.gif',
					'./_BSA/**/*.jpg', './_BSA/**/*.jpeg', './_BSA/**/*.png', './_BSA/**/*.gif',
					'./_STG/**/*.jpg', './_STG/**/*.jpeg', './_STG/**/*.png', './_STG/**/*.gif',
					'./_WBC/**/*.jpg', './_WBC/**/*.jpeg', './_WBC/**/*.png', './_WBC/**/*.gif',
					'_CORE/**/*.jpg', '_CORE/**/*.jpeg', '_CORE/**/*.png', '_CORE/**/*.gif',
				],
				tasks: [
					'imagemin',
					'clean:post',
					'wakeup',
				],
			},

		},

	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// CUSTOM TASKS
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('check', 'Check if setup has run yet', function() { //check on all tasks if folder structure is in place
		var _hasPackage = grunt.file.isFile('./package.json');
		var _hasCore = grunt.file.isDir('./_CORE');
		var _hasBOM = grunt.file.isDir('./_BOM');
		var _hasBSA = grunt.file.isDir('./_BSA');
		var _hasSTG = grunt.file.isDir('./_STG');
		var _hasWBC = grunt.file.isDir('./_WBC');

		if(! (_hasPackage === _hasCore === _hasBOM === _hasBSA === _hasSTG === _hasWBC) ) { //if any of them fail

			console.log("\n\n" + '		The installation is incomplete.'.red.bold + "\n" +
				'		Please run '.red + 'grunt setup'.yellow + ' to potential fix the issues below.'.red + "\n\n" +
				'Is the package.json file present?:  ' + Colorize(_hasPackage) + "\n" +
				'Is the _CORE folder present?:       ' + Colorize(_hasCore) + "\n" +
				'Is the _BOM folder present?:        ' + Colorize(_hasBOM) + "\n" +
				'Is the _BSA folder present?:        ' + Colorize(_hasBSA) + "\n" +
				'Is the _STG folder present?:        ' + Colorize(_hasSTG) + "\n" +
				'Is the _WBC folder present?:        ' + Colorize(_hasWBC) + "\n"
			);

			grunt.task.clearQueue(); //clear queue
			grunt.task.run(['prompt:runSetup']); //ask to run setup
		}
	});


	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// DEFAULT TASKS
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	grunt.registerTask('build', [
		'clean:pre',
		'copy:BOMCoreincludes',
		'copy:BOMBrandincludes',
		'copy:BSACoreincludes',
		'copy:BSABrandincludes',
		'copy:STGCoreincludes',
		'copy:STGBrandincludes',
		'copy:WBCCoreincludes',
		'copy:WBCBrandincludes',
		'includes',
		'clean:includes',
		'less',
		'autoprefixer',
		'uglify',
		'svgmin',
		'grunticon',
		'imagemin',
		'copy:BOMJS',
		'copy:BSAJS',
		'copy:STGJS',
		'copy:WBCJS',
		'copy:BOMCSS',
		'copy:BSACSS',
		'copy:STGCSS',
		'copy:WBCCSS',
		'copy:BOMFonts',
		'copy:BSAFonts',
		'copy:STGFonts',
		'copy:WBCFonts',
		'copy:BOMHTML',
		'copy:BSAHTML',
		'copy:STGHTML',
		'copy:WBCHTML',
		'replace',
		'concat:BOM',
		'concat:BSA',
		'concat:STG',
		'concat:WBC',
		'clean:post',
		'wakeup',
	]);


	//brand specific
	grunt.registerTask('BOM', [
		'clean:pre',
		'copy:BOMCoreincludes',
		'copy:BOMBrandincludes',
		'includes:BOM',
		'clean:includes',
		'less:BOM',
		'autoprefixer:BOM',
		'uglify:BOM',
		'svgmin:BOM',
		'grunticon:BOM',
		'imagemin:BOM',
		'copy:BOMJS',
		'copy:BOMCSS',
		'copy:BOMFonts',
		'copy:BOMHTML',
		'concat:BOM',
		'replace:BOM',
		'clean:post',
		'wakeup',
	]);

	grunt.registerTask('BSA', [
		'clean:pre',
		'copy:BSACoreincludes',
		'copy:BSABrandincludes',
		'includes:BSA',
		'clean:includes',
		'less:BSA',
		'autoprefixer:BSA',
		'uglify:BSA',
		'svgmin:BSA',
		'grunticon:BSA',
		'imagemin:BSA',
		'copy:BSAJS',
		'copy:BSACSS',
		'copy:BSAFonts',
		'copy:BSAHTML',
		'concat:BSA',
		'replace:BSA',
		'clean:post',
		'wakeup',
	]);

	grunt.registerTask('STG', [
		'clean:pre',
		'copy:STGCoreincludes',
		'copy:STGBrandincludes',
		'includes:STG',
		'clean:includes',
		'less:STG',
		'autoprefixer:STG',
		'uglify:STG',
		'svgmin:STG',
		'grunticon:STG',
		'imagemin:STG',
		'copy:STGJS',
		'copy:STGCSS',
		'copy:STGFonts',
		'copy:STGHTML',
		'concat:STG',
		'replace:STG',
		'clean:post',
		'wakeup',
	]);

	grunt.registerTask('WBC', [
		'clean:pre',
		'copy:WBCCoreincludes',
		'copy:WBCBrandincludes',
		'includes:WBC',
		'clean:includes',
		'less:WBC',
		'autoprefixer:WBC',
		'uglify:WBC',
		'svgmin:WBC',
		'grunticon:WBC',
		'imagemin:WBC',
		'copy:WBCJS',
		'copy:WBCCSS',
		'copy:WBCFonts',
		'copy:WBCHTML',
		'concat:WBC',
		'replace:WBC',
		'clean:post',
		'wakeup',
	]);


	grunt.registerTask('setup', ['font:setup', 'prompt:setup', 'wakeup']); //setup your project by running this task first

	grunt.registerTask('BOM', ['font:logo', 'check', 'font:logo', 'connect', 'BOM', 'font:server', 'watch']); //build only BOM
	grunt.registerTask('BSA', ['font:logo', 'check', 'font:logo', 'connect', 'BSA', 'font:server', 'watch']); //build only BSA
	grunt.registerTask('STG', ['font:logo', 'check', 'font:logo', 'connect', 'STG', 'font:server', 'watch']); //build only STG
	grunt.registerTask('WBC', ['font:logo', 'check', 'font:logo', 'connect', 'WBC', 'font:server', 'watch']); //build only WBC

	grunt.registerTask('bump', ['font:logo', 'check', 'prompt:bumpup', 'build']); //bump up to new version


	grunt.registerTask('default', ['font:logo', 'check', 'connect', 'build', 'font:server', 'watch']); //work
};