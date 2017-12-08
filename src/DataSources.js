//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.
var Utils = require("./Utils");
var Constants = require("./Constants");
var nets = require("nets");

/**
 * @constructor
 * @param {string} baseURL - URL for the Open PHACTS API
 * @param {string} appID - Application ID for the application being used. Created by {@link https://dev.openphacts.org}
 * @param {string} appKey - Application Key for the application ID.
 * @license [MIT]{@link http://opensource.org/licenses/MIT}
 * @author [Ian Dunlop]{@link https://github.com/ianwdunlop}
 * @author [Egon Willighagen]{@link http://orcid.org/0000-0001-7542-0286}
 */
DataSources = function DataSources(baseURL, appID, appKey) {
        this.baseURL = baseURL;
        this.appID = appID;
        this.appKey = appKey;
}

/**
 * Fetch a list of data sources used in the Open PHACTS linked data cache.
 *
 * @param {requestCallback} callback - Function that will be called with success, status, and JSON response values.
 * @method
 * @example
 * var datasources = new DataSources("https://beta.openphacts.org/1.5", appID, appKey);
 * var callback = function(success, status, response) {
 *    var subsets = response.primaryTopic.subset;
 *    for (i=0; subsets.length; i++) {
 *      console.log("Subset: " + subsets[i].title);
 *    }
 * };
 * datasources.getSources(callback);
 */
DataSources.prototype.getSources = function(callback) {
	params={};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	nets({
        url: this.baseURL + '/sources?' + Utils.encodeParams(params),
        method: "GET",
        // 30 second timeout just in case
        timeout: 30000,
        headers: {
            "Accept": "application/json"
        }
    }, function(err, resp, body) {
        if (resp.statusCode === 200) {
            callback.call(this, true, resp.statusCode, JSON.parse(body.toString()).result);
        } else {
            callback.call(this, false, resp.statusCode);
        }
    });


}

exports.DataSources = DataSources;
