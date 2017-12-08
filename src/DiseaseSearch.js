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
DiseaseSearch = function DiseaseSearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

/**
 * Fetch the disease represented by the URI provided.
 * @param {string} URI - The URI for the disease of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseaseResult = searcher.parseDiseaseResponse(response);
 * };
 * searcher.fetchDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
 */
DiseaseSearch.prototype.fetchDisease = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
	nets({
        url: this.baseURL + '/disease?' + Utils.encodeParams(params),
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
 * Fetch multiple diseases represented by the URIs provided.
 * @param {Array} URIList - A list of URIs for multiple diseases.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseaseResult = searcher.parseDiseaseBatchResponse(response);
 * };
 * searcher.fetchDiseaseBatch('http://linkedlifedata.com/resource/umls/id/C0004238|http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
 */
DiseaseSearch.prototype.fetchDiseaseBatch = function(URIList, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    var URIs = URIList.join('|');
    params['uri_list'] = URIs;
    lens ? params['_lens'] = lens : '';
	nets({
        url: this.baseURL + '/disease/batch?' + Utils.encodeParams(params),
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
 * Count the number of diseases for a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseaseResult = searcher.parseDiseasesByTargetCountResponse(response);
 * };
 * searcher.diseasesByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
 */
DiseaseSearch.prototype.diseasesByTargetCount = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
	nets({
        url: this.baseURL + '/disease/byTarget/count?' + Utils.encodeParams(params),
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
 * Fetch the diseases for a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var diseases = searcher.parseDiseasesByTargetResponse(response);
 * };
 * searcher.diseasesByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
 */
DiseaseSearch.prototype.diseasesByTarget = function(URI, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
	nets({
        url: this.baseURL + '/disease/byTarget?' + Utils.encodeParams(params),
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
 * Count the number of targets for a disease represented by the URI provided.
 * @param {string} URI - The URI for the disease of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var targetResult = searcher.parseTargetsByDiseaseCountResponse(response);
 * };
 * searcher.targetsByDiseaseCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
 */
DiseaseSearch.prototype.targetsByDiseaseCount = function(URI, lens, callback) {
        params = {};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
nets({
        url: this.baseURL + '/disease/getTargets/count?' + Utils.encodeParams(params),
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
     * Fetch the targets for a disease represented by the URI provided.
     * @param {string} URI - The URI for the disease of interest.
     * @param {string} [page=1] - Which page of records to return.
     * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
     * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
     * @param {string} [lens] - An optional lens to apply to the result.
     * @param {requestCallback} callback - Function that will be called with the result.
     * @method
     * @example
     * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
     * var callback=function(success, status, response){
     *    var targets = searcher.parseTargetsByDiseaseResponse(response);
     * };
     * searcher.targetsByDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, null, null, null, callback);
     */
DiseaseSearch.prototype.targetsByDisease = function(URI, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
nets({
        url: this.baseURL + '/disease/getTargets?' + Utils.encodeParams(params),
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
 * Count the number of diseases associated with a target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var associationsCount = searcher.parseAssociationsByTargetCountResponse(response);
 * };
 * searcher.associationsByTargetCount('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, callback);
 */
DiseaseSearch.prototype.associationsByTargetCount = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
nets({
        url: this.baseURL + '/disease/assoc/byTarget/count?' + Utils.encodeParams(params),
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
 * Fetch the disease-target associations for a particular target represented by the URI provided.
 * @param {string} URI - The URI for the target of interest.
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var associations = searcher.parseAssociationsByTargetResponse(response);
 * };
 * searcher.associationsByTarget('http://purl.uniprot.org/uniprot/Q9Y5Y9', null, null, null, null, callback);
 */
DiseaseSearch.prototype.associationsByTarget = function(URI, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
nets({
        url: this.baseURL + '/disease/assoc/byTarget?' + Utils.encodeParams(params),
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
 * Fetch the disease-target associations for a particular disease represented by the URI provided.
 * @param {string} URI - The URI for the disease of interest.
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var associations = searcher.parseAssociationsByDiseaseResponse(response);
 * };
 * searcher.associationsByDisease('http://linkedlifedata.com/resource/umls/id/C0004238', null, null, null, null, callback);
 */
DiseaseSearch.prototype.associationsByDisease = function(URI, page, pageSize, orderBy, lens, callback) {
        params = {};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        page ? params['_page'] = page : '';
        pageSize ? params['_pageSize'] = pageSize : '';
        orderBy ? params['_orderBy'] = orderBy : '';
        lens ? params['_lens'] = lens : '';
nets({
        url: this.baseURL + '/disease/assoc/byDisease?' + Utils.encodeParams(params),
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
     * Count the number of targets associated with a disease represented by the URI provided.
     * @param {string} URI - The URI for the disease of interest.
     * @param {string} [lens] - An optional lens to apply to the result.
     * @param {requestCallback} callback - Function that will be called with the result.
     * @method
     * @example
     * var searcher = new DiseaseSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
     * var callback=function(success, status, response){
     *    var associationsCount = searcher.parseAssociationsByDiseaseCountResponse(response);
     * };
     * searcher.associationsByDiseaseCount('http://linkedlifedata.com/resource/umls/id/C0004238', null, callback);
     */
DiseaseSearch.prototype.associationsByDiseaseCount = function(URI, lens, callback) {
        params = {};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = URI;
        lens ? params['_lens'] = lens : '';
nets({
        url: this.baseURL + '/disease/assoc/byDisease/count?' + Utils.encodeParams(params),
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
     * Parse the results from {@link DiseaseSearch#fetchDisease}
     * @param {Object} response - the JSON response from {@link DiseaseSearch#fetchDisease}
     * @returns {FetchDiseaseResponse} Containing the flattened response
     * @method
     */
DiseaseSearch.prototype.parseDiseaseResponse = function(response) {
    var constants = new Constants();
    var URI = null,
        name = null,
        diseaseClass = [];
    URI = response.primaryTopic[constants.ABOUT];
    name = response.primaryTopic.name;
    if (response.primaryTopic.diseaseClass != null) {
            Utils.arrayify(response.primaryTopic.diseaseClass).forEach(function(item, index) {
                diseaseClass.push({
                    "name": item.name,
                    "URI": item[constants.ABOUT]
                });
            });
    }
    return {
        "URI": URI,
        "name": name,
        "diseaseClass": diseaseClass
    };
}

/**
     * Parse the results from {@link DiseaseSearch#fetchDiseaseBatch}
     * @param {Object} response - the JSON response from {@link DiseaseSearch#fetchDiseaseBatch}
     * @returns {Array.FetchDiseaseResponse} Containing the flattened response
     * @method
     */
DiseaseSearch.prototype.parseDiseaseBatchResponse = function(response) {
    var constants = new Constants();
    var items = [];
    response.items.forEach(function(item, index) {
    var URI = null,
        name = null,
        diseaseClass = [];
    URI = item[constants.ABOUT];
    name = item.name;
    if (item.diseaseClass != null) {
        Utils.arrayify(item.diseaseClass).forEach(function(diseaseClassItem, index) {
                diseaseClass.push({
                    "name": diseaseClassItem.name,
                    "URI": diseaseClassItem[constants.ABOUT]
                });
            });
        }
    items.push({
        "URI": URI,
        "name": name,
        "diseaseClass": diseaseClass
    });
    });
    return items;
}

/**
 * Parse the results from {@link DiseaseSearch#diseasesByTargetCount}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#diseasesByTargetCount}
 * @returns {Number} Count of the number of diseases for the target
 * @method
 */
DiseaseSearch.prototype.parseDiseasesByTargetCountResponse = function(response) {
    return response.primaryTopic.diseaseCount;
}

/**
 * Parse the results from {@link DiseaseSearch#diseasesByTarget}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#diseasesByTarget}
 * @returns {DiseasesByTargetResponse} List of disease items
 * @method
 */
DiseaseSearch.prototype.parseDiseasesByTargetResponse = function(response) {
    var constants = new Constants();
    var diseases = [];
    response.items.forEach(function(item, index) {
        var name = null,
            URI = null,
            gene = null,
            encodes = null,
            encodeURI = null,
            encodeLabel = null;
        name = item.name;
        URI = item[constants.ABOUT];
        gene = {};
        gene["URI"] = item.forGene[constants.ABOUT];
	gene["encodes"] = [];
	Utils.arrayify(item.forGene.encodes).forEach(function(encode, i) {
               var about = encode[constants.ABOUT];
	    	if (encode.exactMatch != null) {
               var provenance = encode.exactMatch[constants.ABOUT] != null ? item.forGene.encodes.exactMatch[constants.ABOUT] : null;
               var label = encode.exactMatch.prefLabel != null ? item.forGene.encodes.exactMatch.prefLabel : null;
	       gene["encodes"].push({"uri": about, "provenance": provenance, "label": label});
        } else {
		gene["encodes"].push({"uri": about});
               gene["provenance"] = null;
               gene["label"] = null;
        }
	});
        diseases.push({
            "name": name,
            "URI": URI,
            "gene": gene
        });
    });
    return diseases;
}

/**
 * Parse the results from {@link DiseaseSearch#targetsByDiseaseCount}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#targetsByDiseaseCount}
 * @returns {Number} Count of the number of diseases for the target
 * @method
 */
DiseaseSearch.prototype.parseTargetsByDiseaseCountResponse = function(response) {
    return response.primaryTopic.targetCount;
}

/**
 * Parse the results from {@link DiseaseSearch#targetsByDisease}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#targetsByDisease}
 * @returns {TargetsByDiseaseResponse} List of disease items
 * @method
 */
DiseaseSearch.prototype.parseTargetsByDiseaseResponse = function(response) {
    var constants = new Constants();
    var targets = [];
        Utils.arrayify(response.items).forEach(function(item, index, array) {
            var dataset = null,
                URI = null;
            URI = item[constants.ABOUT];
            dataset = item[constants.IN_DATASET];
            targets.push({
                "dataset": dataset,
                "URI": URI
            });
        });
    return targets;
}

/**
 * Parse the results from {@link DiseaseSearch#associationsByTargetCount}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#associationsByTargetCount}
 * @returns {Number} Total count of disease-target associations which correspond to a target
 * @method
 */
DiseaseSearch.prototype.parseAssociationsByTargetCountResponse = function(response) {
    return response.primaryTopic.associationsCount;
}

/**
 * Parse the results from {@link DiseaseSearch#associationsByTarget}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#associationsByTarget}
 * @returns {AssociationsResponse} List of disease-target associations
 * @method
 */
DiseaseSearch.prototype.parseAssociationsByTargetResponse = function(response) {
    var constants = new Constants();
    var diseaseTargetAssociations = [];
        Utils.arrayify(response.items).forEach(function(diseaseTargetAssociation, index, array) {
            var dta = {};
            dta.about = diseaseTargetAssociation[constants.ABOUT];
            dta.dataset = diseaseTargetAssociation[constants.IN_DATASET];
            dta.gene = {};
            dta.gene["URI"] = diseaseTargetAssociation.gene[constants.ABOUT];
            dta.gene["encodes"] = diseaseTargetAssociation.gene.encodes[constants.ABOUT];
            dta.gene["encodesProvenance"] = diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] != null ? diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] : null;
            dta.gene["encodesLabel"] = diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel != null ? diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel : null;
            dta.pmid = [];
            if (diseaseTargetAssociation.pmid != null) {
                Utils.arrayify(diseaseTargetAssociation.pmid).forEach(function(pmid, index, array) {
                    dta.pmid.push(pmid);
                });
            }
            dta.type = [];
                Utils.arrayify(diseaseTargetAssociation.assoc_type).forEach(function(type, index, array) {
                    dta.type.push({
                        "about": type[constants.ABOUT],
                        "label": type.label
                    });
                });

            dta.description = [];
            if (diseaseTargetAssociation.description != null) {
                Utils.arrayify(diseaseTargetAssociation.description).forEach(function(description, index, array) {
                    dta.description.push(description);
                });
            }
            dta.primarySource = [];
                Utils.arrayify(diseaseTargetAssociation.primarySource).forEach(function(primarySource, index, array) {
                    dta.primarySource.push(primarySource);
                });
            dta.disease = {};
            dta.disease.diseaseClasses = [];
            dta.disease.URI = diseaseTargetAssociation.disease[constants.ABOUT];
            dta.disease.dataset = diseaseTargetAssociation.disease[constants.IN_DATASET];
            if(diseaseTargetAssociation.disease.diseaseClass != null) {
	    Utils.arrayify(diseaseTargetAssociation.disease.diseaseClass).forEach(function(diseaseClass, index, array) {
                    var URI = diseaseClass[constants.ABOUT];
                    var name = diseaseClass.name;
                    var dataset = diseaseClass[constants.IN_DATASET];
                    dta.disease.diseaseClasses.push({
                        "URI": URI,
                        "name": name,
                        "dataset": dataset
                    });
            });
	    }
            diseaseTargetAssociations.push(dta);
        });
    return diseaseTargetAssociations;
}

/**
 * Parse the results from {@link DiseaseSearch#associationsByDiseaseCount}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#associationsByDiseaseCount}
 * @returns {Number} Total count of disease-target associations which correspond to a disease
 * @method
 */
DiseaseSearch.prototype.parseAssociationsByDiseaseCountResponse = function(response) {
    return response.primaryTopic.associationsCount;
}

/**
 * Parse the results from {@link DiseaseSearch#associationsByDisease}
 * @param {Object} response - the JSON response from {@link DiseaseSearch#associationsByDisease}
 * @returns {AssociationsResponse} List of disease-target associations
 * @method
 */
DiseaseSearch.prototype.parseAssociationsByDiseaseResponse = function(response) {
    var constants = new Constants();
    var diseaseTargetAssociations = [];
        Utils.arrayify(response.items).forEach(function(diseaseTargetAssociation, index, array) {
            var dta = {};
            dta.about = diseaseTargetAssociation[constants.ABOUT];
            dta.dataset = diseaseTargetAssociation[constants.IN_DATASET];
            dta.gene = {};
            dta.gene["URI"] = diseaseTargetAssociation.gene[constants.ABOUT];
            // TODO API contract not being fulfilled for gene encodes
            if (diseaseTargetAssociation.gene.encodes != null) {
                dta.gene["encodes"] = diseaseTargetAssociation.gene.encodes[constants.ABOUT];
                dta.gene["encodesProvenance"] = diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] != null ? diseaseTargetAssociation.gene.encodes.exactMatch[constants.ABOUT] : null;
                dta.gene["encodesLabel"] = diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel != null ? diseaseTargetAssociation.gene.encodes.exactMatch.prefLabel : null;
            } else {
                dta.gene.encodes = null;
                dta.gene.encodesProvenance = null;
                dta.gene.encodesLabel = null;
            }
            dta.pmid = [];
            if (diseaseTargetAssociation.pmid != null) {
                Utils.arrayify(diseaseTargetAssociation.pmid).forEach(function(pmid, index, array) {
                    dta.pmid.push(pmid);
                });
            }
            dta.type = [];
                Utils.arrayify(diseaseTargetAssociation.type).forEach(function(type, index, array) {
                    dta.type.push({
                        "about": type[constants.ABOUT],
                        "label": type.label
                    });
                });

            dta.description = [];
            if (diseaseTargetAssociation.description != null) {
                Utils.arrayify(diseaseTargetAssociation.description).forEach(function(description, index, array) {
                    dta.description.push(description);
                });
            }
            dta.primarySource = [];
                Utils.arrayify(diseaseTargetAssociation.primarySource).forEach(function(primarySource, index, array) {
                    dta.primarySource.push(primarySource);
                });
            dta.disease = {};
            dta.disease.diseaseClasses = [];
            dta.disease.URI = diseaseTargetAssociation.disease[constants.ABOUT];
            dta.disease.dataset = diseaseTargetAssociation.disease[constants.IN_DATASET];
                Utils.arrayify(diseaseTargetAssociation.disease.diseaseClass).forEach(function(diseaseClass, index, array) {
                    var URI = diseaseClass[constants.ABOUT];
                    var name = diseaseClass.name;
                    var dataset = diseaseClass[constants.IN_DATASET];
                    dta.disease.diseaseClasses.push({
                        "URI": URI,
                        "name": name,
                        "dataset": dataset
                    });
                });
            diseaseTargetAssociations.push(dta);
        });
    return diseaseTargetAssociations;
}

exports.DiseaseSearch = DiseaseSearch;
