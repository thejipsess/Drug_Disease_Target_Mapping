//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

/**
 * @constructor
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author [Ian Dunlop]{@link https://github.com/ianwdunlop}
 */
Version = function Version() {
 
};

/**
 * Provides metadata and version information about this release of OPS.js.
 * @method
 * @example
 * new Version().information();
 */
Version.prototype.information = function() {
	return {
               "version": "6.1.3", 
               "author": "Ian Dunlop",
	       "ORCID": "http://orcid.org/0000-0001-7066-3350",
               "title": "OPS.js",
               "description": "Javascript library for accessing the Open PHACTS Linked Data API",
               "project": "Open PHACTS",
               "organization": "School of Computer Science",
               "address": "University of Manchester, UK",
               "year": "2015",
               "month": "August",
               "url": "http://github.com/openphacts/ops.js",
               "LDA-version": "1.5"
           }; 
};

exports.Version = Version;
