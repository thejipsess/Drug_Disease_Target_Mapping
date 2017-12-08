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
 */
TissueSearch = function TissueSearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

/**
 * Fetch the tissue represented by the URI provided.
 * @param {string} URI - The URI for the tissue of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new TissueSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var tissueResult = searcher.parseTissueResponse(response);
 * };
 * searcher.fetchTissue('ftp://ftp.nextprot.org/pub/current_release/controlled_vocabularies/caloha.obo#TS-0171', null, callback);
 */
TissueSearch.prototype.fetchTissue = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    nets({
        url: this.baseURL + '/tissue?' + Utils.encodeParams(params),
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

/**
 * Fetch the mutiple tissues represented by the URIs provided.
 * @param {Array.<string>} URIList - A list of URIs for the tissue of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new TissueSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var tissueResult = searcher.parseTissueBatchResponse(response);
 * };
 * searcher.fetchTissueBatch(['ftp://ftp.nextprot.org/pub/current_release/controlled_vocabularies/caloha.obo#TS-0171', 'ftp://ftp.nextprot.org/pub/current_release/controlled_vocabularies/caloha.obo#TS-0173'], null, callback);
 */
TissueSearch.prototype.fetchTissueBatch = function(URIList, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    var URIs = URIList.join('|');
    params['uri_list'] = URIs;
    lens ? params['_lens'] = lens : '';
    nets({
        url: this.baseURL + '/tissue/batch?' + Utils.encodeParams(params),
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

/**
 * Parse the results from {@link TissueSearch#fetchTissue}
 * @param {Object} response - the JSON response from {@link TissueSearch#fetchTissue}
 * @returns {FetchTissueResponse} Containing the flattened response
 * @method
 */
TissueSearch.prototype.parseTissueResponse = function(response) {
    var constants = new Constants();
    var uri = response.primaryTopic[constants.ABOUT];
    var label = response.primaryTopic.label;
    var definition = response.primaryTopic.definition != null ? response.primaryTopic.definition : null;
    var dataset = response.primaryTopic[constants.IN_DATASET] != null ? response.primaryTopic[constants.IN_DATASET] : null;
    var dbXrefs = [];
    if (response.primaryTopic.hasDbXref != null) {
        Utils.arrayify(response.primaryTopic.hasDbXref).forEach(function(dbXref, index) {
            dbXrefs.push(dbXref);
        });
    }
    return {
        "uri": uri,
        "label": label,
        "definition": definition,
        "dataset": dataset,
        "dbXrefs": dbXrefs
    };
}

/**
 * Parse the results from {@link TissueSearch#fetchTissueBatch}
 * @param {Object} response - the JSON response from {@link TissueSearch#fetchTissueBatch}
 * @returns {Array.<FetchTissueResponse>} Containing the flattened response
 * @method
 */
TissueSearch.prototype.parseTissueBatchResponse = function(response) {
    var constants = new Constants();
    var tissues = [];
    response.items.forEach(function(tissue, index) {
    var uri = tissue[constants.ABOUT];
    var label = tissue.label;
    var definition = tissue.definition != null ? tissue.definition : null;
    var dataset = tissue[constants.IN_DATASET] != null ? tissue[constants.IN_DATASET] : null;
    var dbXrefs = [];
    if (tissue.hasDbXref != null) {
        arrayify(tissue.hasDbXref).forEach(function(dbXref, index) {
            dbXrefs.push(dbXref);
        });
    }
    tissues.push({
        "uri": uri,
        "label": label,
        "definition": definition,
        "dataset": dataset,
        "dbXrefs": dbXrefs
    });
    });
    return tissues;
}

exports.TissueSearch = TissueSearch;
