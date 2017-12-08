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
ConceptWikiSearch = function(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

/**
 * Performs a free text search to resolve the identity of an entity as specified by the given type
 * in a certain branch.
 * @param {string} query - Query of at least three characters.
 * @param {string} limit - The maximum number of search results.
 * @param {string} branch - The branch of ConceptWiki to search in: 1 = Community, 2 = UMLS, 3 = SwissProt,
 *                          4 = ChemSpider, 5 = Computer Inferred, 6 = Pathway Ontology, 7 = WikiPathways.
 * @param {string} type - The type of entity for which is search: 07a84994-e464-4bbf-812a-a4b96fa3d197 for
 *                        'Chemical Viewed Structurally', eda73945-b112-407e-811a-88448966834f for
 *                        'Disease or Syndrome', or eeaec894-d856-4106-9fa1-662b1dc6c6f1 for
 *                        'Amino Acid, Peptide, or Protein'
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
ConceptWikiSearch.prototype.byTag = function(query, limit, branch, type, callback) {
	params={};
	params['_format'] = "json";
	params['app_key'] = this.appKey;
	params['app_id'] = this.appID;
	params['q'] = query;
	limit ? params['limit'] = limit : '';
	branch ? params['branch'] = branch : '';
	params['uuid'] = type;
	nets({
        url: this.baseURL + '/search/byTag?' + Utils.encodeParams(params),
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
 * Performs a free text search to resolve the identity of an entity in a certain branch.
 * @param {string} query - Query of at least three characters.
 * @param {string} limit - The maximum number of search results.
 * @param {string} branch - The branch of ConceptWiki to search in: 1 = Community, 2 = UMLS, 3 = SwissProt,
 *                          4 = ChemSpider, 5 = Computer Inferred, 6 = Pathway Ontology, 7 = WikiPathways.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 */
ConceptWikiSearch.prototype.freeText = function(query, limit, branch, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    limit ? params['limit'] = limit : '';
    branch ? params['branch'] = branch : '';
    nets({
        url: this.baseURL + '/search/freetext?' + Utils.encodeParams(params),
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

ConceptWikiSearch.prototype.findCompounds = function(query, limit, branch, callback) {
	params = {};
	params['uuid'] = '07a84994-e464-4bbf-812a-a4b96fa3d197';
	params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    limit ? params['limit'] = limit : '';
    branch ? params['branch'] = branch : '';
    nets({
        url: this.baseURL + '/search/byTag?' + Utils.encodeParams(params),
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

ConceptWikiSearch.prototype.findTargets = function(query, limit, branch, callback) {
	params = {};
	params['uuid'] = 'eeaec894-d856-4106-9fa1-662b1dc6c6f1';
	params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['q'] = query;
    limit ? params['limit'] = limit : '';
    branch ? params['branch'] = branch : '';
    nets({
        url: this.baseURL + '/search/byTag?' + Utils.encodeParams(params),
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

ConceptWikiSearch.prototype.findConcept = function(uuid, branch, callback) {
	params = {};
	params['uuid'] = uuid;
	branch != null ? params['branch'] = branch : '';
	params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    nets({
        url: this.baseURL + '/getConceptDescription?' + Utils.encodeParams(params),
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

ConceptWikiSearch.prototype.parseResponse = function(response) {
	var uris = [];
	//response can be either array or singleton.
    if (response.primaryTopic.result) {
		    Utils.arrayify(response.primaryTopic.result).forEach(function(match, i) {
			    uris.push({
				   'uri': match["_about"],
				   'prefLabel': match["prefLabel"],
				   'match': match["match"]
			    });
		    });
    }
	return uris;
}

ConceptWikiSearch.prototype.parseFindConceptResponse = function(response) {
	var prefLabel = response.primaryTopic.prefLabel_en;
	var definition = response.primaryTopic.definition != null ? response.primaryTopic.definition : null;
	var altLabels = [];
	if (response.primaryTopic.altLabel_en) {
		response.primaryTopic.altLabel_en.forEach(function(altLabel, index) {
			altLabels.push(altLabel);
		});
	}
	return {
		prefLabel: prefLabel,
		definition: definition,
		altLabels: altLabels
	};
}
