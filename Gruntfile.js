'use strict';


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Custom functions
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
function nextVersion( grunt ) { //get current version and increment by one
	var pkg = grunt.file.readJSON('package.json');
	var newVersion = pkg.version.split(".");
	newVersion[ (newVersion.length - 1) ] = parseInt( newVersion[ (newVersion.length - 1) ] ) + 1;

	return newVersion.join(".");
}


function handleize( string ) { //handleize a string
	return string.replace(/\W+/g, '-').toLowerCase();
}


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// Grunt module
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = function (grunt) {

	//Dependencies
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-prompt');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
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
						'./BOM/_css/png',
						'./BOM/_fonts',
						'./BOM/_HTMLincludes',
						'./BOM/_img',
						'./BOM/_js/libs',
						'./BOM/_less',
						'./BOM/_svg',

						'./BSA/_css/png',
						'./BSA/_fonts',
						'./BSA/_HTMLincludes',
						'./BSA/_img',
						'./BSA/_js/libs',
						'./BSA/_less',
						'./BSA/_svg',

						'./STG/_css/png',
						'./STG/_fonts',
						'./STG/_HTMLincludes',
						'./STG/_img',
						'./STG/_js/libs',
						'./STG/_less',
						'./STG/_svg',

						'./WBC/_css/png',
						'./WBC/_fonts',
						'./WBC/_HTMLincludes',
						'./WBC/_img',
						'./WBC/_js/libs',
						'./WBC/_less',
						'./WBC/_svg',
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
					'./PROD/BOM/css/<%= currentVersion %>.min.css': './BOM/_less/_settings.less',
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
					'./PROD/BSA/css/<%= currentVersion %>.min.css': './BSA/_less/_settings.less',
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
					'./PROD/STG/css/<%= currentVersion %>.min.css': './STG/_less/_settings.less',
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
					'./PROD/WBC/css/<%= currentVersion %>.min.css': './WBC/_less/_settings.less',
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
		// Minify js files into temp file, ready for concatenation into a single file
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		uglify: {
			options: {
				mangle: false,
			},

			BOM: { //minify js files while excluding the _test folder for BOM
				files: {
					'./temp/BOM/js/zzz.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},

			BSA: { //minify js files while excluding the _test folder for BSA
				files: {
					'./temp/BSA/js/zzz.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},

			STG: { //minify js files while excluding the _test folder for STG
				files: {
					'./temp/STG/js/zzz.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},

			WBC: { //minify js files while excluding the _test folder for WBC
				files: {
					'./temp/WBC/js/zzz.min.js': [
						'./_CORE/_js/**/*.js',
						'!./_CORE/_js/_tests/**/*.js',
					],
				},
			},
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// JS concatentation - core libraries
		//
		// This section contcatenates the library files into the app file, this is pretty much the bare minium if you want to work with IE8
		//
		// All core js files are concatenated into a single file ( minifying, already minified scripts causes errors )
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		concat: {
			BOM: { //concatenate files together for BOM
				src: [
					['./temp/BOM/js/**/*'],
				],
				dest: './PROD/BOM/js/<%= currentVersion %>.min.js',
			},

			BSA: { //concatenate files together for BSA
				src: [
					['./temp/BSA/js/**/*'],
				],
				dest: './PROD/BSA/js/<%= currentVersion %>.min.js',
			},

			STG: { //concatenate files together for STG
				src: [
					['./temp/STG/js/**/*'],
				],
				dest: './PROD/STG/js/<%= currentVersion %>.min.js',
			},

			WBC: { //concatenate files together for WBC
				src: [
					['./temp/WBC/js/**/*'],
				],
				dest: './PROD/WBC/js/<%= currentVersion %>.min.js',
			},
		},

		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// Minify svgs
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		svgmin: {
			BOM: { //minify BOM svgs
				files: [{
					expand: true,
					cwd: './BOM/_svg/',
					src: ['*.svg'],
					dest: './temp/BOM/svg/',
				}],
			},

			BSA: { //minify BSA svgs
				files: [{
					expand: true,
					cwd: './BSA/_svg/',
					src: ['*.svg'],
					dest: './temp/BSA/svg/',
				}],
			},

			STG: { //minify STG svgs
				files: [{
					expand: true,
					cwd: './STG/_svg/',
					src: ['*.svg'],
					dest: './temp/STG/svg/',
				}],
			},

			WBC: { //minify WBC svgs
				files: [{
					expand: true,
					cwd: './WBC/_svg/',
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
					cwd: './BOM/_img',
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
					cwd: './BSA/_img',
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
					cwd: './STG/_img',
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
					cwd: './WBC/_img',
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
					cwd: './BOM/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/BOM/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSABrandincludes: { //move html includes into the BSA temp includes folder
				files: [{
					cwd: './BSA/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/BSA/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGBrandincludes: { //move html includes into the STG temp includes folder
				files: [{
					cwd: './STG/_HTMLincludes/',
					src: ['**/*.html'],
					dest: './temp/STG/_HTMLincludes/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCBrandincludes: { //move html includes into the STG temp includes folder
				files: [{
					cwd: './WBC/_HTMLincludes/',
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
					cwd: './BOM/_js/',
					src: ['**/*.js'],
					dest: './PROD/BOM/js/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSAJS: { //move BSA js folder content
				files: [{
					cwd: './BSA/_js/',
					src: ['**/*.js'],
					dest: './PROD/BSA/js/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGJS: { //move STG js folder content
				files: [{
					cwd: './STG/_js/',
					src: ['**/*.js'],
					dest: './PROD/STG/js/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCJS: { //move WBC js folder content
				files: [{
					cwd: './WBC/_js/',
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
					cwd: './BOM/_css/',
					src: ['**/*'],
					dest: './PROD/BOM/css/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSACSS: { //move BSA css folder content
				files: [{
					cwd: './BSA/_css/',
					src: ['**/*'],
					dest: './PROD/BSA/css/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGCSS: { //move STG css folder content
				files: [{
					cwd: './STG/_css/',
					src: ['**/*'],
					dest: './PROD/STG/css/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCCSS: { //move WBC css folder content
				files: [{
					cwd: './WBC/_css/',
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
					cwd: './BOM/_fonts/',
					src: ['**/*'],
					dest: './PROD/BOM/fonts/',
					filter: 'isFile',
					expand: true,
				}],
			},

			BSAFonts: { //move BSA fonts folder content
				files: [{
					cwd: './BSA/_fonts/',
					src: ['**/*'],
					dest: './PROD/BSA/fonts/',
					filter: 'isFile',
					expand: true,
				}],
			},

			STGFonts: { //move STG fonts folder content
				files: [{
					cwd: './STG/_fonts/',
					src: ['**/*'],
					dest: './PROD/STG/fonts/',
					filter: 'isFile',
					expand: true,
				}],
			},

			WBCFonts: { //move WBC fonts folder content
				files: [{
					cwd: './WBC/_fonts/',
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
				router: function (filepath) {
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
				},

				src: './temp/BOM/theme.zip',
				dest: './BOM/',
			},

			BSA: { //unzip BSA zip and sort in
				router: function (filepath) {
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
				},

				src: './temp/BSA/theme.zip',
				dest: './BSA/',
			},

			STG: { //unzip STG zip and sort in
				router: function (filepath) {
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
				},

				src: './temp/STG/theme.zip',
				dest: './STG/',
			},

			WBC: { //unzip WBC zip and sort in
				router: function (filepath) {
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
				},

				src: './temp/WBC/theme.zip',
				dest: './WBC/',
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
							config: 'setupKind',
							type: 'list',
							message: "\n\n" + '		With what kind of template do you want to start your project?'.magenta + "\n\n",
							choices: [
								{
									value: 'angular',
									name: 'Angular SPA with library files and prepared folders plus less files with settings for each brand and some commenly used HTMLincludes.',
								},
								{
									value: 'less',
									name: 'Only less files with settings for each brand plus some commenly used HTMLincludes',
								},
								{
									value: 'clean',
									name: 'A clean start without any assumtions about your project plus some commenly used HTMLincludes',
								},
							]
						},
						{
							config: 'setupGUI',
							type: 'list',
							message: "\n\n" + '		Do you want to download and install the latest GUI files?'.magenta + "\n\n",
							choices: ['YES', 'NO'],
						},
						{
							config: 'setupName',
							type: 'input',
							message: "\n\n" + '		Please provide a new name for your project!'.magenta + "\n\n" +
								'Current name: ' + '<%= pkg.name %>'.yellow + ' (leave empty to keep current)',
						},
						{
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
							config: 'setupVersion',
							type: 'input',
							message: "\n\n" + '		What specific version(?.?.?) would you like it to be?'.magenta + "\n\n",
							when: function(answers) {
								return answers['setupVersion'] === 'custom';
							},
						},
					],
					then: function(results) {
						var packageFile = grunt.file.readJSON('package.json');
						var messages = '';


						// create folders and copy template files
						grunt.task.run('mkdir:brands'); //create base folders
						grunt.task.run('mkdir:clean'); //create clean template folders
						grunt.task.run('copy:setupClean'); //copy clean template files

						if(results.setupKind === 'less' || results.setupKind === 'angular') {
							grunt.task.run('mkdir:less'); //create less template folders
							grunt.task.run('copy:setupLess'); //copy less template files
						}
						if(results.setupKind === 'angular') {
							grunt.task.run('mkdir:angular'); //create angular template folders
							grunt.task.run('copy:setupAngular'); //copy angular template files
						}
						messages += "\n" + '• We created all folders and copied the template into them...'.green;


						// download and install GUI
						if(results.setupGUI === 'YES') {
							grunt.task.run(['curl', 'unzip', 'clean:post']);
							messages += "\n" + '• We downloaded the GUI for you and installed it into your folders...'.green;
						}
						else {
							messages += "\n" + '- We did not download the GUI for you...'.grey;
						}


						// set the app name
						if(results.setupName !== '') {
							packageFile.name = handleize( results.setupName );
							grunt.file.write('package.json', JSON.stringify( packageFile ) );

							messages += "\n" + '• We set your new name for you...'.green;
						}
						else {
							messages += "\n" + '- We left the current name alone...'.grey;
						}


						// set the app version
						if(results.setupVersion !== '##') {
							packageFile.version = results.setupVersion;
							grunt.file.write('package.json', JSON.stringify( packageFile ) );

							messages += "\n" + '• We set the new version for you...'.green;
						}


						// report what has run and what hasn't
						grunt.registerTask('report', 'Report the summary', function() {
							console.log("\n" + messages + "\n\n");
						});

						grunt.task.run(['font:summary', 'report']);
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
									value: nextVersion(grunt),
									name: 'Build: '.yellow + nextVersion(grunt).yellow + ' Next release within this version.',
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
				colors: ['white', 'green'],
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
			}
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
					'BOM/**/*.html',
					'BSA/**/*.html',
					'STG/**/*.html',
					'WBC/**/*.html',
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
					'BOM/**/*.less',
					'BSA/**/*.less',
					'STG/**/*.less',
					'WBC/**/*.less',
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
					'BOM/**/*.svg', '!BOM/**/fonts/*.svg',
					'BSA/**/*.svg', '!BSA/**/fonts/*.svg',
					'STG/**/*.svg', '!STG/**/fonts/*.svg',
					'WBC/**/*.svg', '!WBC/**/fonts/*.svg',
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
					'BOM/**/*.js',
				],
				tasks: [
					'uglify:BOM',
					'copy:BOMJS',
					'replace:BOM',
					'concat:BOM',
					'clean:post',
					'wakeup',
				],
			},

			jsBSA: { //watch all BSA js files
				files: [
					'BSA/**/*.js',
				],
				tasks: [
					'uglify:BSA',
					'copy:BSAJS',
					'replace:BSA',
					'concat:BSA',
					'clean:post',
					'wakeup',
				],
			},

			jsSTG: { //watch all STG js files
				files: [
					'STG/**/*.js',
				],
				tasks: [
					'uglify:STG',
					'copy:STGJS',
					'replace:STG',
					'concat:STG',
					'clean:post',
					'wakeup',
				],
			},

			jsWBC: { //watch all WBC js files
				files: [
					'WBC/**/*.js',
				],
				tasks: [
					'uglify:WBC',
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
					'uglify',
					'copy:BOMJS',
					'copy:BSAJS',
					'copy:STGJS',
					'copy:WBCJS',
					'replace',
					'concat',
					'clean:post',
					'wakeup',
				],
			},

			fonts: { //watch all font files
				files: [
					'BOM/**/*.woff', 'BOM/**/*.woff2', 'BOM/**/*.ttf', 'BOM/**/*.eot', 'BOM/**/fonts/*.svg',
					'BSA/**/*.woff', 'BSA/**/*.woff2', 'BSA/**/*.ttf', 'BSA/**/*.eot', 'BSA/**/fonts/*.svg',
					'STG/**/*.woff', 'STG/**/*.woff2', 'STG/**/*.ttf', 'STG/**/*.eot', 'STG/**/fonts/*.svg',
					'WBC/**/*.woff', 'WBC/**/*.woff2', 'WBC/**/*.ttf', 'WBC/**/*.eot', 'WBC/**/fonts/*.svg',
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
					'BOM/**/*.jpg', 'BOM/**/*.jpeg', 'BOM/**/*.png', 'BOM/**/*.gif',
					'BSA/**/*.jpg', 'BSA/**/*.jpeg', 'BSA/**/*.png', 'BSA/**/*.gif',
					'STG/**/*.jpg', 'STG/**/*.jpeg', 'STG/**/*.png', 'STG/**/*.gif',
					'WBC/**/*.jpg', 'WBC/**/*.jpeg', 'WBC/**/*.png', 'WBC/**/*.gif',
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


	//----------------------------------------------------------------------------------------------------------------------------------------------------------
	// TASKS
	//----------------------------------------------------------------------------------------------------------------------------------------------------------
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
		'concat',
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

	grunt.registerTask('buildBOM', ['font:logo', 'connect', 'BOM']); //build only BOM
	grunt.registerTask('buildBSA', ['font:logo', 'connect', 'BSA']); //build only BSA
	grunt.registerTask('buildSTG', ['font:logo', 'connect', 'STG']); //build only STG
	grunt.registerTask('buildWBC', ['font:logo', 'connect', 'WBC']); //build only WBC

	grunt.registerTask('bump', ['prompt:bumpup', 'build']); //bump up to new version


	grunt.registerTask('default', ['font:logo', 'connect', 'build', 'watch']); //work
};