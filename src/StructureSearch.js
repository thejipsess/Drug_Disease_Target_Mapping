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
StructureSearch = function StructureSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

StructureSearch.prototype.exact = function(smiles, matchType, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        matchType != null ? params['searchOptions.MatchType'] = matchType : '';
    nets({
        url: this.baseURL + '/structure/exact?' + Utils.encodeParams(params),
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

StructureSearch.prototype.substructure = function(smiles, molType, start, count, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['searchOptions.Molecule'] = smiles;
    molType != null ? params['searchOptions.MolType'] = molType : '';
    start != null ? params['resultOptions.Start'] = start : '';
    count != null ? params['resultOptions.Count'] = count : '';
    nets({
        url: this.baseURL + '/structure/substructure?' + Utils.encodeParams(params),
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

StructureSearch.prototype.inchiKeyToURL = function(inchiKey, callback) {
params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['inchi_key'] = inchiKey;   
    nets({
        url: this.baseURL + '/structure?' + Utils.encodeParams(params),
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

StructureSearch.prototype.inchiToURL = function(inchi, callback) {
params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['inchi'] = inchi;   
 
    nets({
        url: this.baseURL + '/structure?' + Utils.encodeParams(params),
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

StructureSearch.prototype.similarity = function(smiles, type, threshold, alpha, beta, start, count, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['searchOptions.Molecule'] = smiles;
        type != null ? params['searchOptions.SimilarityType'] = type : params['searchOptions.SimilarityType'] = 0;
        threshold != null ? params['searchOptions.Threshold'] = threshold : params['searchOptions.Threshold'] = 0.99;
        alpha != null ? params['searchOptions.Alpha'] = alpha : '';
        beta != null ? params['searchOptions.Beta'] = beta : '';
        start != null ? params['resultOptions.Start'] = start : '';
        count != null ? params['resultOptions.Count'] = count : '';
    nets({
        url: this.baseURL + '/structure/similarity?' + Utils.encodeParams(params),
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

StructureSearch.prototype.smilesToURL = function(smiles, callback) {
params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['smiles'] = smiles;   
 
    nets({
        url: this.baseURL + '/structure?' + Utils.encodeParams(params),
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

StructureSearch.prototype.parseExactResponse = function(response) {
    var results = [];
        Utils.arrayify(response.primaryTopic.result).forEach(function(result, i) {
          results.push(result);
        });
	return results;
}

StructureSearch.prototype.parseSubstructureResponse = function(response) {
    var constants = new Constants();
    var results = [];
        Utils.arrayify(response.primaryTopic.result).forEach(function(result, i) {
          results.push({"about": result[constants.ABOUT], "relevance": result[constants.RELEVANCE]});
        });
	return results;
}

StructureSearch.prototype.parseInchiKeyToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}

StructureSearch.prototype.parseInchiToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}

StructureSearch.prototype.parseSimilarityResponse = function(response) {
    var constants = new Constants();
    var results = [];
        Utils.arrayify(response.primaryTopic.result).forEach(function(result, i) {
          results.push({"about": result[constants.ABOUT], "relevance": result[constants.RELEVANCE]});
        });
	return results;
}

StructureSearch.prototype.parseSmilesToURLResponse = function(response) {
	return response.primaryTopic["_about"];
}

exports.StructureSearch = StructureSearch;
