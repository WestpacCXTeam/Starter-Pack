/***************************************************************************************************************************************************************
 *
 * App framework and settings
 *
 * Description of init process
 *
 **************************************************************************************************************************************************************/

'use strict';


var App = (function() {

	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	// settings
	//------------------------------------------------------------------------------------------------------------------------------------------------------------
	return {
		DEBUG: true, //Enable/disable debugger
		SETTING1: 'string', //Setting description
		SETTING2: false, //Setting description
		SETTING3: 1, //Setting description
		SETTING4: {}, //Setting description
		SETTING5: [], //Setting description
		SETTING6: function() { //Setting description
			return 'string';
		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// initiate app
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		init: function() {

			console.log('%cDEBUGGING INFORMATION', 'font-size: 25px;');

			App.module1.init();
			App.module2.init();

		},


		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		// debugging prettiness
		//
		// text  string   Text to be printed to debugger
		// code  keyword  What kind of urgency: report,error,interaction
		//----------------------------------------------------------------------------------------------------------------------------------------------------------
		debugging: function( text, code ) {

			if( code === 'report' ) {
				if( App.DEBUG ) console.log('%c\u2611 ', 'color: green; font-size: 18px;', text);
			}

			else if( code === 'error' ) {
				if( App.DEBUG ) console.log('%c\u2612 ', 'color: red; font-size: 18px;', text);
			}

			else if( code === 'interaction' ) {
				if( App.DEBUG ) console.log('%c\u261C ', 'color: blue; font-size: 18px;', text);
			}

		}

	}

}());