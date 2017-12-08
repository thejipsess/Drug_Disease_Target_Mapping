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
CompoundSearch = function CompoundSearch(baseURL, appID, appKey) {
    this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

/**
 * Fetch the compound represented by the URI provided.
 * @param {string} URI - The URI for the compound of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new CompoundSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var compoundResult = searcher.parseCompoundResponse(response);
 * };
 * searcher.fetchCompound('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, callback);
 */
CompoundSearch.prototype.fetchCompound = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    nets({
        url: this.baseURL + '/compound?' + Utils.encodeParams(params),
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
 * Fetch the compounds matching the list of URIs provided.
 * @param {Array} URIList - An array of URIs for the compounds of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new CompoundSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var compoundResults = searcher.parseCompoundBatchResponse(response);
 * };
 * searcher.fetchCompoundBatch(['http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', 'http://www.conceptwiki.org/concept/dd758846-1dac-4f0d-a329-06af9a7fa413'], null, callback);
 */
CompoundSearch.prototype.fetchCompoundBatch = function(URIList, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    var URIs = URIList.join('|');
    params['uri_list'] = URIs;
    lens ? params['_lens'] = lens : '';
    nets({
        url: this.baseURL + '/compound/batch?' + Utils.encodeParams(params),
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
 * Count the number of compounds classified with the class represented by the URI provided.
 * @param {string} URI - The URI for the class of interest.
 * @param {string} [lens] - An optional lens to apply to the result.
 * @param {requestCallback} callback - Function that will be called with the result.
 * @method
 * @example
 * var searcher = new CompoundSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *    var result = searcher.parseCompoundClassMembersCountResponse(response);
 * };
 * searcher.compoundClassMembersCount('http://purl.obolibrary.org/obo/CHEBI_24431', null, callback);
 */
CompoundSearch.prototype.compoundClassMembersCount = function(URI, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    lens ? params['_lens'] = lens : '';
    nets({
        url: this.baseURL + '/compound/members/count?' + Utils.encodeParams(params),
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
 * Fetch compounds for the class represented by the URI provided.
 * @param {string} URI - The URI for the compound class of interest
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - Which chemistry lens to apply to the records
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 * @example
 * var searcher = new CompoundSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *     var classMembersResult == searcher.parseCompoundClassMembersResponse(response);
 * };
 * searcher.compoundClassMembers('http://purl.obolibrary.org/obo/CHEBI_24431', 1, 20, null, null, callback);
 */
CompoundSearch.prototype.compoundClassMembers = function(URI, page, pageSize, orderBy, lens, callback) {
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
        url: this.baseURL + '/compound/members/pages?' + Utils.encodeParams(params),
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
 * Fetch pharmacology records for the compound represented by the URI provided.
 * @param {string} URI - The URI for the compound of interest
 * @param {string} [assayOrganism] - Filter by assay organism eg Homo Sapiens
 * @param {string} [targetOrganism] - Filter by target organism eg Rattus Norvegicus
 * @param {string} [activityType] - Filter by activity type eg IC50
 * @param {string} [activityValue] - Return pharmacology records with activity values equal to this number
 * @param {string} [minActivityValue] - Return pharmacology records with activity values greater than or equal to this number
 * @param {string} [minExActivityValue] - Return pharmacology records with activity values greater than this number
 * @param {string} [maxActivityValue] - Return pharmacology records with activity values less than or equal to this number
 * @param {string} [maxExActivityValue] - Return pharmacology records with activity values less than this number
 * @param {string} [activityUnit] - Return pharmacology records which have this activity unit eg nanomolar
 * @param {string} [activityRelation] - Return pharmacology records which have this activity relation eg =
 * @param {string} [pChembl] - Return pharmacology records with pChembl equal to this number
 * @param {string} [minpChembl] - Return pharmacology records with pChembl values greater than or equal to this number
 * @param {string} [minExpChembl] - Return pharmacology records with pChembl values greater than this number
 * @param {string} [maxpChembl] - Return pharmacology records with pChembl values less than or equal to this number
 * @param {string} [maxExpChembl] - Return pharmacology records with pChembl values less than this number
 * @param {string} [targetType] - Filter by one of the available target types. e.g. single_protein
 * @param {string} [page=1] - Which page of records to return.
 * @param {string} [pageSize=10] - How many records to return. Set to 'all' to return all records in a single page
 * @param {string} [orderBy] - Order the records by this field eg ?assay_type or DESC(?assay_type)
 * @param {string} [lens] - Which chemistry lens to apply to the records
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 * @example
 * var searcher = new CompoundSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseCompoundPharmacologyResponse(response);
 * };
 * searcher.compoundPharmacology('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 1, 20, null, null, callback);
 */
CompoundSearch.prototype.compoundPharmacology = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, page, pageSize, orderBy, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';

    nets({
        url: this.baseURL + '/compound/pharmacology/pages?' + Utils.encodeParams(params),
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
 * Fetch a count of the pharmacology records belonging to the compound represented by the URI provided.
 * @param {string} URI - The URI for the compound of interest
 * @param {string} [assayOrganism] - Filter by assay organism eg Homo Sapiens
 * @param {string} [targetOrganism] - Filter by target organism eg Rattus Norvegicus
 * @param {string} [activityType] - Filter by activity type eg IC50
 * @param {string} [activityValue] - Return pharmacology records with activity values equal to this number
 * @param {string} [minActivityValue] - Return pharmacology records with activity values greater than or equal to this number
 * @param {string} [minExActivityValue] - Return pharmacology records with activity values greater than this number
 * @param {string} [maxActivityValue] - Return pharmacology records with activity values less than or equal to this number
 * @param {string} [maxExActivityValue] - Return pharmacology records with activity values less than this number
 * @param {string} [activityUnit] - Return pharmacology records which have this activity unit eg nanomolar
 * @param {string} [activityRelation] - Return pharmacology records which have this activity relation eg =
 * @param {string} [pChembl] - Return pharmacology records with pChembl equal to this number
 * @param {string} [minpChembl] - Return pharmacology records with pChembl values greater than or equal to this number
 * @param {string} [minExpChembl] - Return pharmacology records with pChembl values greater than this number
 * @param {string} [maxpChembl] - Return pharmacology records with pChembl values less than or equal to this number
 * @param {string} [maxExpChembl] - Return pharmacology records with pChembl values less than this number
 * @param {string} [targetType] - Filter by one of the available target types. e.g. single_protein
 * @param {string} [lens] - Which chemistry lens to apply to the records
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 * @example
 * var searcher = new CompoundSearch("https://beta.openphacts.org/1.5", "appID", "appKey");
 * var callback=function(success, status, response){
 *     var pharmacologyResult == searcher.parseCompoundPharmacologyCountResponse(response);
 * };
 * searcher.compoundPharmacologyCount('http://www.conceptwiki.org/concept/38932552-111f-4a4e-a46a-4ed1d7bdf9d5', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, callback);
 */
CompoundSearch.prototype.compoundPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, activityRelation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism ? params['assay_organism'] = assayOrganism : '';
    targetOrganism ? params['target_organism'] = targetOrganism : '';
    activityType ? params['activity_type'] = activityType : '';
    activityValue ? params['activity_value'] = activityValue : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    activityUnit ? params['activity_unit'] = activityUnit : '';
    activityRelation ? params['activity_relation'] = activityRelation : '';
    pChembl ? params['pChembl'] = pChembl : '';
    minpChembl ? params['min-pChembl'] = minpChembl : '';
    minExpChembl ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType ? params['target_type'] = targetType : '';
    lens ? params['_lens'] = lens : '';

    nets({
        url: this.baseURL + '/compound/pharmacology/count?' + Utils.encodeParams(params),
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
 * The classes the given compound URI has been classified with eg ChEBI
 * @param {string} URI - The URI for the compound of interest
 * @param {string} tree - Restrict results by hierarchy eg chebi
 * @param {requestCallback} callback - Function that will be called with the result
 * @method
 */
CompoundSearch.prototype.compoundClassifications = function(URI, tree, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    params['tree'] = tree;

    nets({
        url: this.baseURL + '/compound/classifications?' + Utils.encodeParams(params),
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
 * Parse the results from {@link CompoundSearch#fetchCompound}
 * @param {Object} response - the JSON response from {@link CompoundSearch#fetchCompound}
 * @returns {FetchCompoundResponse} Containing the flattened response
 * @method
 */
CompoundSearch.prototype.parseCompoundResponse = function(response) {
    var constants = new Constants();
    var drugbankData = {},
        chemspiderData = {},
        chemblData = {},
        conceptWikiData = {};
    var URI = response.primaryTopic[constants.ABOUT];
    var id = URI.split("/").pop();
    var me = this;
    if (constants.SRC_CLS_MAPPINGS[response.primaryTopic[constants.IN_DATASET]] === 'drugbankValue') {
        drugbankData = me.parseDrugbankBlock(response.primaryTopic);
    } else if (constants.SRC_CLS_MAPPINGS[response.primaryTopic[constants.IN_DATASET]] === 'chemspiderValue') {
        chemspiderData = me.parseChemspiderBlock(response.primaryTopic);
    } else if (constants.SRC_CLS_MAPPINGS[response.primaryTopic[constants.IN_DATASET]] === 'chemblValue') {
        chemblData = me.parseChemblBlock(response.primaryTopic);
        //TODO more than 1 chembl block possible?
        //chemblItems.push(chemblBlock);
    } else if (constants.SRC_CLS_MAPPINGS[response.primaryTopic[constants.IN_DATASET]] === 'conceptWikiValue') {
        conceptWikiData = me.parseConceptwikiBlock(response.primaryTopic);
    }
    Utils.arrayify(response.primaryTopic.exactMatch).forEach(function(match, i, allValues) {
        var src = match[constants.IN_DATASET];
        if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
            drugbankData = me.parseDrugbankBlock(match);
        } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
            chemspiderData = me.parseChemspiderBlock(match);
        } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
            chemblData = me.parseChemblBlock(match);
        } else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
            conceptWikiData = me.parseConceptwikiBlock(match);
        }
    });
    return {
        "id": id,
        "cwURI": conceptWikiData.URI != null ? conceptWikiData.URI : null,
        "prefLabel": conceptWikiData.prefLabel != null ? conceptWikiData.prefLabel : null,
        "URI": URI,
        "description": drugbankData.description != null ? drugbankData.description : null,
        "biotransformationItem": drugbankData.biotransformationItem != null ? drugbankData.description : null,
        "toxicity": drugbankData.toxicity != null ? drugbankData.toxicity : null,
        "proteinBinding": drugbankData.proteinBinding != null ? drugbankData.proteinBinding : null,
        "drugbankURI": drugbankData.URI != null ? drugbankData.URI : null,
        "csURI": chemspiderData.URI != null ? chemspiderData.URI : null,
        "hba": chemspiderData.hba != null ? chemspiderData.hba : null,
        "hbd": chemspiderData.hbd != null ? chemspiderData.hbd : null,
        "inchi": chemspiderData.inchi != null ? chemspiderData.inchi : null,
        "logp": chemspiderData.logp != null ? chemspiderData.logp : null,
        "psa": chemspiderData.psa != null ? chemspiderData.psa : null,
        "ro5Violations": chemspiderData.ro5Violations != null ? chemspiderData.ro5Violations : null,
        "smiles": chemspiderData.smiles != null ? chemspiderData.smiles : null,
        "rtb": chemspiderData.rtb != null ? chemspiderData.rtb : null,
        "inchiKey": chemspiderData.inchiKey != null ? chemspiderData.inchiKey : null,
        "fullMWT": chemspiderData.fullMWT != null ? chemspiderData.fullMWT : null,
        "molform": chemspiderData.molform != null ? chemspiderData.molform : null,
        "chemblURI": chemblData.URI != null ? chemblData.URI : null,
        "mwFreebase": chemblData.mwFreebase != null ? chemblData.mwFreebase : null,

        "drugbankProvenance": drugbankData.drugbankProvenance != null ? drugbankData.drugbankProvenance : null,
        "chemspiderProvenance": chemspiderData.chemspiderProvenance != null ? chemspiderData.chemspiderProvenance : null,
        "chemblProvenance": chemblData.chemblProvenance != null ? chemblData.chemblProvenance : null,
        "conceptWikiProvenance": conceptWikiData.conceptwikiProvenance != null ? conceptWikiData.conceptwikiProvenance : null
    };
}

/**
 * Parse the results from {@link CompoundSearch#fetchCompound} which have a lens applied
 * @param {Object} response - the JSON response from {@link CompoundSearch#fetchCompound}
 * @returns {FetchCompoundLensResponse} Containing the flattened response
 * @method
 */
CompoundSearch.prototype.parseCompoundLensResponse = function(response) {
    var constants = new Constants();
    var drugbankData, chemspiderData, chemblData, conceptWikiData;

    // There will be many different compounds due to the lens but at this stage there is no way of connecting
    // all the exactMatch blocks together. Later on we can use mapURI to link them
    var lensChemspider = [];
    var lensDrugbank = [];
    var lensCW = [];
    var lensChembl = [];
    var topLevelResponse = response.primaryTopic[constants.IN_DATASET];
    if (constants.SRC_CLS_MAPPINGS[topLevelResponse] === 'chemspiderValue') {
        var prefLabel = null,
            cwURI = null,
            description = null,
            biotransformationItem = null,
            toxicity = null,
            proteinBinding = null,
            csURI = null,
            hba = null,
            hbd = null,
            inchi = null,
            logp = null,
            psa = null,
            ro5Violations = null,
            smiles = null,
            chemblURI = null,
            fullMWT = null,
            molform = null,
            mwFreebase = null,
            rtb = null,
            inchiKey = null,
            drugbankURI = null,
            molweight = null,
            molformula = null;

        csURI = response.primaryTopic["_about"] !== null ? response.primaryTopic["_about"] : csURI;
        hba = response.primaryTopic.hba != null ? response.primaryTopic.hba : hba;
        hbd = response.primaryTopic.hbd != null ? response.primaryTopic.hbd : hbd;
        inchi = response.primaryTopic.inchi != null ? response.primaryTopic.inchi : inchi;
        logp = response.primaryTopic.logp != null ? response.primaryTopic.logp : logp;
        psa = response.primaryTopic.psa != null ? response.primaryTopic.psa : psa;
        ro5Violations = response.primaryTopic.ro5_violations != null ? response.primaryTopic.ro5_violations : ro5Violations;
        smiles = response.primaryTopic.smiles != null ? response.primaryTopic.smiles : smiles;
        inchiKey = response.primaryTopic.inchikey != null ? response.primaryTopic.inchikey : inchikey;
        rtb = response.primaryTopic.rtb != null ? response.primaryTopic.rtb : rtb;
        fullMWT = response.primaryTopic.molweight != null ? response.primaryTopic.molweight : molweight;
        molform = response.primaryTopic.molformula != null ? response.primaryTopic.molformula : molformula;

        // provenance 
        chemspiderLinkOut = csURI;
        chemspiderProvenance = {};
        chemspiderProvenance['source'] = 'chemspider';
        chemspiderProvenance['hba'] = chemspiderLinkOut;
        chemspiderProvenance['hbd'] = chemspiderLinkOut;
        chemspiderProvenance['inchi'] = chemspiderLinkOut;
        chemspiderProvenance['logp'] = chemspiderLinkOut;
        chemspiderProvenance['psa'] = chemspiderLinkOut;
        chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
        chemspiderProvenance['smiles'] = chemspiderLinkOut;
        chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
        chemspiderProvenance['molform'] = chemspiderLinkOut;
        lensChemspider.push({
            "csURI": csURI,
            "hba": hba,
            "hbd": hbd,
            "inchi": inchi,
            "logp": logp,
            "psa": psa,
            "ro5Violations": ro5Violations,
            "smiles": smiles,
            "fullMWT": fullMWT,
            "molform": molform,
            "rtb": rtb,
            "inchiKey": inchiKey,
            "chemspiderProvenance": chemspiderProvenance
        })

    }
    response.primaryTopic.exactMatch.forEach(function(match, i, allMatches) {
        var src = match[constants.IN_DATASET];
        var prefLabel = null,
            cwURI = null,
            description = null,
            biotransformationItem = null,
            toxicity = null,
            proteinBinding = null,
            csURI = null,
            hba = null,
            hbd = null,
            inchi = null,
            logp = null,
            psa = null,
            ro5Violations = null,
            smiles = null,
            chemblURI = null,
            fullMWT = null,
            molform = null,
            mwFreebase = null,
            rtb = null,
            inchiKey = null,
            drugbankURI = null,
            molweight = null,
            molformula = null;

        if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
            drugbankData = match;
            description = drugbankData.description != null ? drugbankData.description : description;
            biotransformationItem = drugbankData.biotransformation != null ? drugbankData.biotransformation : biotransformationItem;
            toxicity = drugbankData.toxicity != null ? drugbankData.toxicity : toxicity;
            proteinBinding = drugbankData.proteinBinding != null ? drugbankData.proteinBinding : proteinBinding;
            drugbankURI = drugbankData[constants.ABOUT] != null ? drugbankData[constants.ABOUT] : drugbankURI;

            // provenance
            drugbankLinkout = drugbankURI;
            drugbankProvenance = {};
            drugbankProvenance['source'] = 'drugbank';
            drugbankProvenance['description'] = drugbankLinkout;
            drugbankProvenance['biotransformation'] = drugbankLinkout;
            drugbankProvenance['toxicity'] = drugbankLinkout;
            drugbankProvenance['proteinBinding'] = drugbankLinkout;
            lensDrugbank.push({
                "description": description,
                "biotransformationItem": biotransformationItem,
                "toxicity": toxicity,
                "proteinBinding": proteinBinding,
                "drugbankURI": drugbankURI,
                "drugbankProvenance": drugbankProvenance
            });

        } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
            chemspiderData = match;
            csURI = chemspiderData["_about"] !== null ? chemspiderData["_about"] : csURI;
            hba = chemspiderData.hba != null ? chemspiderData.hba : hba;
            hbd = chemspiderData.hbd != null ? chemspiderData.hbd : hbd;
            inchi = chemspiderData.inchi != null ? chemspiderData.inchi : inchi;
            logp = chemspiderData.logp != null ? chemspiderData.logp : logp;
            psa = chemspiderData.psa != null ? chemspiderData.psa : psa;
            ro5Violations = chemspiderData.ro5_violations != null ? chemspiderData.ro5_violations : ro5Violations;
            smiles = chemspiderData.smiles != null ? chemspiderData.smiles : smiles;
            inchiKey = chemspiderData.inchikey != null ? chemspiderData.inchikey : inchikey;
            rtb = chemspiderData.rtb != null ? chemspiderData.rtb : rtb;
            fullMWT = chemspiderData.molweight != null ? chemspiderData.molweight : molweight;
            molform = chemspiderData.molformula != null ? chemspiderData.molformula : molformula;

            // provenance 
            chemspiderLinkOut = csURI;
            chemspiderProvenance = {};
            chemspiderProvenance['source'] = 'chemspider';
            chemspiderProvenance['hba'] = chemspiderLinkOut;
            chemspiderProvenance['hbd'] = chemspiderLinkOut;
            chemspiderProvenance['inchi'] = chemspiderLinkOut;
            chemspiderProvenance['logp'] = chemspiderLinkOut;
            chemspiderProvenance['psa'] = chemspiderLinkOut;
            chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
            chemspiderProvenance['smiles'] = chemspiderLinkOut;
            chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
            chemspiderProvenance['molform'] = chemspiderLinkOut;
            lensChemspider.push({
                "csURI": csURI,
                "hba": hba,
                "hbd": hbd,
                "inchi": inchi,
                "logp": logp,
                "psa": psa,
                "ro5Violations": ro5Violations,
                "smiles": smiles,
                "fullMWT": fullMWT,
                "molform": molform,
                "rtb": rtb,
                "inchiKey": inchiKey,
                "chemspiderProvenance": chemspiderProvenance
            })

        } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
            chemblData = match;
            chemblURI = chemblData["_about"] != null ? chemblData["_about"] : chemblURI;
            mwFreebase = chemblData.mw_freebase != null ? chemblData.mw_freebase : mwFreebase;

            // provenance
            chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/compound/inspect/' + chemblURI.split("/").pop();
            chemblProvenance = {};
            chemblProvenance['source'] = 'chembl';
            chemblProvenance['fullMWT'] = chemblLinkOut;
            chemblProvenance['mwFreebase'] = chemblLinkOut;
            chemblProvenance['rtb'] = chemblLinkOut;
            lensChembl.push({
                "chemblURI": chemblURI,
                "chemblProvenance": chemblProvenance
            });

        } else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
            conceptWikiData = match;
            prefLabel = conceptWikiData.prefLabel != null ? conceptWikiData.prefLabel : prefLabel;
            cwURI = conceptWikiData["_about"] != null ? conceptWikiData["_about"] : cwURI;
            lensCW.push({
                "cwURI": cwURI,
                "prefLabel": prefLabel
            });

        }
    });
    return {
        "lensChemspider": lensChemspider,
        "lensDrugbank": lensDrugbank,
        "lensChembl": lensChembl,
        "lensCW": lensCW
    };
}

CompoundSearch.prototype.parseDrugbankBlock = function(drugbankBlock) {
    var constants = new Constants();
    var URI = null,
        description = null,
        biotransformationItem = null,
        toxicity = null,
        proteinBinding = null,
        drugbankData = null,
        drugbankProvenance = {},
        drugbankLinkout = null;

    drugbankData = drugbankBlock;
    URI = drugbankData[constants.ABOUT] !== null ? drugbankData[constants.ABOUT] : null;
    description = drugbankData.description != null ? drugbankData.description : description;
    biotransformationItem = drugbankData.biotransformation != null ? drugbankData.biotransformation : biotransformationItem;
    toxicity = drugbankData.toxicity != null ? drugbankData.toxicity : toxicity;
    proteinBinding = drugbankData.proteinBinding != null ? drugbankData.proteinBinding : proteinBinding;
    drugbankURI = drugbankData[constants.ABOUT] != null ? drugbankData[constants.ABOUT] : drugbankURI;

    // provenance
    drugbankLinkout = URI;
    drugbankProvenance['source'] = 'drugbank';
    drugbankProvenance['description'] = drugbankLinkout;
    drugbankProvenance['biotransformation'] = drugbankLinkout;
    drugbankProvenance['toxicity'] = drugbankLinkout;
    drugbankProvenance['proteinBinding'] = drugbankLinkout;
    return {
        "description": description,
        "biotransformationItem": biotransformationItem,
        "toxicity": toxicity,
        "proteinBinding": proteinBinding,
        "URI": drugbankURI,
        "drugbankProvenance": drugbankProvenance,
    };

}

CompoundSearch.prototype.parseChemspiderBlock = function(chemspiderBlock) {
    var constants = new Constants();
    var URI = null,
        hba = null,
        hbd = null,
        inchi = null,
        logp = null,
        psa = null,
        ro5Violations = null,
        smiles = null,
        fullMWT = null,
        molform = null,
        rtb = null,
        inchiKey = null,
        molform = null;
    var chemspiderData = chemspiderBlock;
    var chemspiderProvenance = {};
    var chemspiderLinkOut = null;

    URI = chemspiderData["_about"] !== null ? chemspiderData["_about"] : URI;
    hba = chemspiderData.hba != null ? chemspiderData.hba : hba;
    hbd = chemspiderData.hbd != null ? chemspiderData.hbd : hbd;
    inchi = chemspiderData.inchi != null ? chemspiderData.inchi : inchi;
    logp = chemspiderData.logp != null ? chemspiderData.logp : logp;
    psa = chemspiderData.psa != null ? chemspiderData.psa : psa;
    ro5Violations = chemspiderData.ro5_violations != null ? chemspiderData.ro5_violations : ro5Violations;
    smiles = chemspiderData.smiles != null ? chemspiderData.smiles : smiles;
    inchiKey = chemspiderData.inchikey != null ? chemspiderData.inchikey : null;
    rtb = chemspiderData.rtb != null ? chemspiderData.rtb : rtb;
    fullMWT = chemspiderData.molweight != null ? chemspiderData.molweight : null;
    molform = chemspiderData.molformula != null ? chemspiderData.molformula : null;

    // provenance 
    chemspiderLinkOut = URI;
    chemspiderProvenance = {};
    chemspiderProvenance['source'] = 'chemspider';
    chemspiderProvenance['hba'] = chemspiderLinkOut;
    chemspiderProvenance['hbd'] = chemspiderLinkOut;
    chemspiderProvenance['inchi'] = chemspiderLinkOut;
    chemspiderProvenance['logp'] = chemspiderLinkOut;
    chemspiderProvenance['psa'] = chemspiderLinkOut;
    chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
    chemspiderProvenance['smiles'] = chemspiderLinkOut;
    chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
    chemspiderProvenance['molform'] = chemspiderLinkOut;
    return {
        "URI": URI,
        "hba": hba,
        "hbd": hbd,
        "inchi": inchi,
        "logp": logp,
        "psa": psa,
        "ro5Violations": ro5Violations,
        "smiles": smiles,
        "fullMWT": fullMWT,
        "molform": molform,
        "rtb": rtb,
        "inchiKey": inchiKey,
        "chemspiderProvenance": chemspiderProvenance
    };

}

CompoundSearch.prototype.parseChemblBlock = function(chemblBlock) {
    var constants = new Constants();
    var mwFreebase = null;
    var chemblData = chemblBlock;
    var URI = chemblData[constants.ABOUT];
    var chemblProvenance = null;
    var chemblLinkOut = null;

    mwFreebase = chemblData.mw_freebase != null ? chemblData.mw_freebase : mwFreebase;

    // provenance
    chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/compound/inspect/' + URI.split("/").pop();
    chemblProvenance = {};
    chemblProvenance['source'] = 'chembl';
    chemblProvenance['mwFreebase'] = chemblLinkOut;
    return {
        "URI": URI,
        "mwFreebase": mwFreebase,
        "chemblProvenance": chemblProvenance
    };
}

CompoundSearch.prototype.parseConceptwikiBlock = function(conceptwikiBlock) {
    var constants = new Constants();
    var conceptWikiData = conceptwikiBlock;
    var prefLabel = conceptWikiData.prefLabel != null ? conceptWikiData.prefLabel : prefLabel;
    var URI = conceptWikiData[constants.ABOUT] != null ? conceptWikiData[constants.ABOUT] : cwURI;

    var conceptwikiProvenance = {};
    // provenance
    conceptwikiProvenance['source'] = 'conceptwiki';
    conceptwikiProvenance['prefLabel'] = URI;

    return {
        "URI": URI,
        "prefLabel": prefLabel,
        "conceptwikiProvenance": conceptwikiProvenance
    };


}

/**
 * Parse the results from {@link CompoundSearch#fetchCompoundBatch}
 * @param {Object} response - the JSON response from {@link CompoundSearch#fetchCompoundBatch}
 * @returns {FetchCompoundBatchResponse} Containing the flattened response
 * @method
 */
CompoundSearch.prototype.parseCompoundBatchResponse = function(response) {
    var constants = new Constants();
    var compounds = [];
    response.items.forEach(function(item, index, items) {
        var id = null,
            prefLabel = null,
            cwURI = null,
            description = null,
            biotransformationItem = null,
            toxicity = null,
            proteinBinding = null,
            csURI = null,
            hba = null,
            hbd = null,
            inchi = null,
            logp = null,
            psa = null,
            ro5Violations = null,
            smiles = null,
            chemblURI = null,
            fullMWT = null,
            molform = null,
            mwFreebase = null,
            rtb = null,
            inchiKey = null,
            drugbankURI = null,
            molweight = null,
            molformula = null;
        var drugbankData, chemspiderData, chemblData, conceptWikiData;
        var uri = item[constants.ABOUT];

        // check if we already have the CS URI
        var possibleURI = 'http://' + uri.split('/')[2];
        //var uriLink = document.createElement('a');
        //uriLink.href = uri;
        //var possibleURI = 'http://' + uriLink.hostname;
        csURI = constants.SRC_CLS_MAPPINGS[possibleURI] === 'chemspiderValue' ? uri : null;

        var drugbankProvenance, chemspiderProvenance, chemblProvenance;
        var descriptionItem, toxicityItem, proteinBindingItem, hbaItem, hbdItem, inchiItem, logpItem, psaItem, ro5VioloationsItem, smilesItem, inchiKeyItem, molformItem, fullMWTItem, mwFreebaseItem;
        var drugbankLinkout, chemspiderLinkOut, chemblLinkOut;

        // this id is not strictly true since we could have searched using a chemspider id etc
        id = uri.split("/").pop();
        prefLabel = item.prefLabel ? item.prefLabel : null;
        cwURI = constants.SRC_CLS_MAPPINGS[item[constants.IN_DATASET]] == 'conceptWikiValue' ? item[constants.ABOUT] : cwURI;
        //if an ops.rsc.org uri is used then the compound chemistry details are found in the top level
        hba = item.hba != null ? item.hba : null;
        hbd = item.hbd != null ? item.hbd : null;
        inchi = item.inchi != null ? item.inchi : null;
        inchiKey = item.inchikey != null ? item.inchikey : null;
        logp = item.logp != null ? item.logp : null;
        molform = item.molformula != null ? item.molformula : null;
        fullMWT = item.molweight != null ? item.molweight : null;
        psa = item.psa != null ? item.psa : null;
        ro5Violations = item.ro5_violations != null ? item.ro5_violations : null;
        rtb = item.rtb !== null ? item.rtb : null;
        smiles = item.smiles != null ? item.smiles : null;
        if (Array.isArray(item.exactMatch)) {
            item.exactMatch.forEach(function(match, i, allValues) {
                var src = match[constants.IN_DATASET];
                if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                    drugbankData = match;
                } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                    chemspiderData = match;
                } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemblValue') {
                    chemblData = match;
                } else if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                    conceptWikiData = match;
                }
            });
        }
        if (drugbankData) {
            description = drugbankData.description != null ? drugbankData.description : description;
            biotransformationItem = drugbankData.biotransformation != null ? drugbankData.biotransformation : biotransformationItem;
            toxicity = drugbankData.toxicity != null ? drugbankData.toxicity : toxicity;
            proteinBinding = drugbankData.proteinBinding != null ? drugbankData.proteinBinding : proteinBinding;
            drugbankURI = drugbankData[constants.ABOUT] != null ? drugbankData[constants.ABOUT] : drugbankURI;

            // provenance
            drugbankLinkout = drugbankURI;
            drugbankProvenance = {};
            drugbankProvenance['source'] = 'drugbank';
            drugbankProvenance['description'] = drugbankLinkout;
            drugbankProvenance['biotransformation'] = drugbankLinkout;
            drugbankProvenance['toxicity'] = drugbankLinkout;
            drugbankProvenance['proteinBinding'] = drugbankLinkout;

        }
        if (chemspiderData) {
            csURI = chemspiderData["_about"] !== null ? chemspiderData["_about"] : csURI;
            hba = chemspiderData.hba != null ? chemspiderData.hba : hba;
            hbd = chemspiderData.hbd != null ? chemspiderData.hbd : hbd;
            inchi = chemspiderData.inchi != null ? chemspiderData.inchi : inchi;
            logp = chemspiderData.logp != null ? chemspiderData.logp : logp;
            psa = chemspiderData.psa != null ? chemspiderData.psa : psa;
            ro5Violations = chemspiderData.ro5_violations != null ? chemspiderData.ro5_violations : ro5Violations;
            smiles = chemspiderData.smiles != null ? chemspiderData.smiles : smiles;
            inchiKey = chemspiderData.inchikey != null ? chemspiderData.inchikey : inchikey;
            rtb = chemspiderData.rtb != null ? chemspiderData.rtb : rtb;
            fullMWT = chemspiderData.molweight != null ? chemspiderData.molweight : molweight;
            molform = chemspiderData.molformula != null ? chemspiderData.molformula : molformula;

            // provenance 
            chemspiderLinkOut = csURI;
            chemspiderProvenance = {};
            chemspiderProvenance['source'] = 'chemspider';
            chemspiderProvenance['hba'] = chemspiderLinkOut;
            chemspiderProvenance['hbd'] = chemspiderLinkOut;
            chemspiderProvenance['inchi'] = chemspiderLinkOut;
            chemspiderProvenance['logp'] = chemspiderLinkOut;
            chemspiderProvenance['psa'] = chemspiderLinkOut;
            chemspiderProvenance['ro5violations'] = chemspiderLinkOut;
            chemspiderProvenance['smiles'] = chemspiderLinkOut;
            chemspiderProvenance['inchiKey'] = chemspiderLinkOut;
            chemspiderProvenance['molform'] = chemspiderLinkOut;

        }
        if (chemblData) {
            chemblURI = chemblData["_about"] != null ? chemblData["_about"] : chemblURI;
            mwFreebase = chemblData.mw_freebase != null ? chemblData.mw_freebase : mwFreebase;

            // provenance
            chemblLinkOut = 'https://www.ebi.ac.uk/chembldb/compound/inspect/' + chemblURI.split("/").pop();
            chemblProvenance = {};
            chemblProvenance['source'] = 'chembl';
            chemblProvenance['fullMWT'] = chemblLinkOut;
            chemblProvenance['mwFreebase'] = chemblLinkOut;
            chemblProvenance['rtb'] = chemblLinkOut;
        }
        if (conceptWikiData) {
            prefLabel = conceptWikiData.prefLabel != null ? conceptWikiData.prefLabel : prefLabel;
            cwURI = conceptWikiData["_about"] != null ? conceptWikiData["_about"] : cwURI;
        }
        compounds.push({
            "id": id,
            "cwURI": cwURI,
            "prefLabel": prefLabel,
            "URI": uri,
            "description": description,
            "biotransformationItem": biotransformationItem,
            "toxicity": toxicity,
            "proteinBinding": proteinBinding,
            "csURI": csURI,
            "hba": hba,
            "hbd": hbd,
            "inchi": inchi,
            "logp": logp,
            "psa": psa,
            "ro5Violations": ro5Violations,
            "smiles": smiles,
            "chemblURI": chemblURI,
            "fullMWT": fullMWT,
            "molform": molform,
            "mwFreebase": mwFreebase,
            "rtb": rtb,
            "inchiKey": inchiKey,
            "drugbankURI": drugbankURI,

            "drugbankProvenance": drugbankProvenance,
            "chemspiderProvenance": chemspiderProvenance,
            "chemblProvenance": chemblProvenance

        });
    });
    return compounds;
}

/**
 * Parse the results from {@link CompoundSearch#fetchCompoundPharmacology}
 * @param {Object} response - the JSON response from {@link CompoundSearch#fetchCompoundPharmacology}
 * @returns {FetchCompoundPharmacologyResponse} Containing the flattened response
 * @method
 */
CompoundSearch.prototype.parseCompoundPharmacologyResponse = function(response) {
    var drugbankProvenance, chemspiderProvenance, chemblProvenance, conceptwikiProvenance;
    var constants = new Constants();
    var records = [];
    response.items.forEach(function(item, i, items) {

        chemblProvenance = {};
        chemblProvenance['source'] = 'chembl';

        var chembl_activity_uri = item[constants.ABOUT];
        var chembl_src = item[constants.IN_DATASET];
        // according to the API docs pmid can be an array but an array of what?
        var activity_pubmed_id = item['pmid'] ? item['pmid'] : null;
        var activity_relation = item['activity_relation'] ? item['activity_relation'] : null;
        var activity_unit_block = item['activity_unit'];
        var activity_standard_units = activity_unit_block ? activity_unit_block.prefLabel : null;
        //var activity_standard_units = item['standardUnits'] ? item['standardUnits'] : null;
        var activity_standard_value = item['standardValue'] ? item['standardValue'] : null;
        var activity_activity_type = item['activity_type'] ? item['activity_type'] : null;
        //TODO seems to be some confusion about what the value is called
        var activity_activity_value = item['activity_value'] ? item['activity_value'] : null;
        var pChembl = item['pChembl'] ? item['pChembl'] : null;

        var compound_full_mwt_item = null;
        var forMolecule = item[constants.FOR_MOLECULE];
        var chembleMoleculeLink = 'https://www.ebi.ac.uk/chembldb/compound/inspect/';
        var chembl_compound_uri = null;
        var compound_full_mwt = null;
        var em = null;
        var cw_compound_uri = null,
            compound_pref_label = null,
            cw_src = null,
            cs_compound_uri = null,
            compound_inchi = null,
            compound_inchikey = null,
            compound_smiles = null,
            cs_src = null,
            drugbank_compound_uri = null,
            compound_drug_type = null,
            compound_generic_name = null,
            drugbank_src = null,
            csid = null,
            compound_smiles_item = null,
            compound_inchi_item = null,
            compound_inchikey_item = null,
            compound_pref_label_item = null;

        if (forMolecule != null) {
            chembl_compound_uri = forMolecule[constants.ABOUT];
            //compound_full_mwt = forMolecule['full_mwt'] ? forMolecule['full_mwt'] : null;
            chembleMoleculeLink += chembl_compound_uri.split('/').pop();
            //compound_full_mwt_item = chembleMoleculeLink;
            em = forMolecule["exactMatch"];
        }
        //during testing there have been cases where em is null
        var chemblMolecule = em != null ? em[constants.ABOUT] : null;
        if (em != null) {
            // the exact match block may only have 1 entry
            Utils.arrayify(em).forEach(function(match, index, matches) {
                var src = match[constants.IN_DATASET];
                if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                    cw_compound_uri = match[constants.ABOUT];
                    compound_pref_label = match[constants.PREF_LABEL];
                    compound_pref_label_item = cw_compound_uri;
                    cw_src = match["inDataset"];
                } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                    cs_compound_uri = match[constants.ABOUT];
                    csid = cs_compound_uri.split('/').pop();
                    compound_inchi = match['inchi'];
                    compound_inchikey = match['inchikey'];
                    compound_smiles = match['smiles'];
                    compound_full_mwt = match['molweight'];
                    var chemSpiderLink = 'http://www.chemspider.com/' + csid;
                    compound_smiles_item = chemSpiderLink;
                    compound_inchi_item = chemSpiderLink;
                    compound_inchikey_item = chemSpiderLink;
                    compound_full_mwt_item = chemSpiderLink;
                    cs_src = match["inDataset"];
                } else if (constants.SRC_CLS_MAPPINGS[src] == 'drugbankValue') {
                    drugbank_compound_uri = match[constants.ABOUT];
                    compound_drug_type = match['drugType'];
                    compound_generic_name = match['genericName'];
                    drugbank_src = match[constants.ABOUT];
                }
            });
        }

        var target_title_item = null,
            target_organism_item = null,
            activity_activity_type_item = null,
            activity_standard_value_item = null,
            activity_standard_units_item = null,
            activity_relation_item = null,
            assay_description = null,
            assay_description_item = null,
            assay_organism = null,
            assay_organism_src = null,
            assay_organism_item = null;
        var target_organism = {};
        var onAssay = item[constants.ON_ASSAY];
        if (onAssay != null) {
            var chembl_assay_uri = onAssay[constants.ABOUT];
            var chembldAssayLink = 'https://www.ebi.ac.uk/chembldb/assay/inspect/';
            assay_description = onAssay['description'];
            var chembleAssayLink = chembldAssayLink + chembl_assay_uri.split('/').pop();
            assay_description_item = chembleAssayLink;
            assay_organism = onAssay['assayOrganismName'] ? onAssay['assayOrganismName'] : null;
            assay_organism_item = chembleAssayLink;
            chemblProvenance['assayOrganism'] = chembleAssayLink;
            chemblProvenance['assayDescription'] = chembleAssayLink;

            var target = onAssay[constants.ON_TARGET];
            // For Target
            var target_components = [];
	    var target_title = null;
	    var target_organism_name = null;
	    var target_uri = null;
	    if (target != null) {
                target_title = target.title;
		target_uri = target._about;
                target_provenance = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target._about.split('/').pop();
		target_organism_name = target.targetOrganismName != null ? target.targetOrganismName : null;
		if (target.hasTargetComponent != null) {
			Utils.arrayify(target.hasTargetComponent).forEach(function(targetComponent, i) {
				var tc = {};
				tc.uri = targetComponent._about;
				if (targetComponent.exactMatch != null) {
					tc.labelProvenance = targetComponent[constants.EXACT_MATCH]._about != null ? targetComponent[constants.EXACT_MATCH]._about : null;
					tc.label = targetComponent[constants.EXACT_MATCH].prefLabel != null ? targetComponent[constants.EXACT_MATCH].prefLabel : null;
				}
				target_components.push(tc);
			});
		}
            }
        }
        var chemblActivityLink = 'https://www.ebi.ac.uk/ebisearch/search.ebi?t=' + chembl_activity_uri.split('/').pop().split('_').pop() + '&db=chembl-activity';

        activity_activity_type_item = chemblActivityLink;
        activity_standard_value_item = chemblActivityLink;
        activity_standard_units_item = chemblActivityLink;
        activity_relation_item = chemblActivityLink;
        records.push({
            //for compound
            compoundInchikey: compound_inchikey,
            compoundDrugType: compound_drug_type,
            compoundGenericName: compound_generic_name,
            compoundInchikeySrc: cs_src,
            compoundDrugTypeSrc: drugbank_src,
            compoundGenericNameSrc: drugbank_src,
            targetTitleSrc: chembl_src,
            //for target
            chemblActivityUri: chembl_activity_uri,
            chemblCompoundUri: chembl_compound_uri,
            compoundFullMwt: compound_full_mwt,
            cwCompoundUri: cw_compound_uri,
            compoundPrefLabel: compound_pref_label,
            csCompoundUri: cs_compound_uri,
            csid: csid,
            compoundInchi: compound_inchi,
            compoundSmiles: compound_smiles,
            chemblAssayUri: chembl_assay_uri,
            targetTitle: target_title,
	    targetOrganismName: target_organism_name,
	    targetComponents: target_components,
	    targetURI: target_uri,
	    targetProvenance: target_provenance,
            assayOrganism: assay_organism,
            assayDescription: assay_description,
            activityRelation: activity_relation,
            activityStandardUnits: activity_standard_units,
            activityStandardValue: activity_standard_value,
            activityActivityType: activity_activity_type,
            activityValue: activity_activity_value,

            compoundFullMwtSrc: chembl_src,
            compoundPrefLabel_src: cw_src,
            compoundInchiSrc: cs_src,
            compoundSmilesSrc: cs_src,
            targetOrganismSrc: chembl_src,
            assayOrganismSrc: chembl_src,
            assayDescriptionSrc: chembl_src,
            activityRelationSrc: chembl_src,
            activityStandardUnitsSrc: chembl_src,
            activityStandardValueSrc: chembl_src,
            activityActivityTypeSrc: chembl_src,
            activityPubmedId: activity_pubmed_id,
            assayDescriptionItem: assay_description_item,
            assayOrganismItem: assay_organism_item,
            activityActivityTypeItem: activity_activity_type_item,
            activityRelationItem: activity_relation_item,
            activityStandardValueItem: activity_standard_value_item,
            activityStandardUnitsItem: activity_standard_units_item,
            compoundFullMwtItem: compound_full_mwt_item,
            compoundSmilesItem: compound_smiles_item,
            compoundInchiItem: compound_inchi_item,
            compoundInchikeyItem: compound_inchikey_item,
            compoundPrefLabelItem: compound_pref_label_item,
            pChembl: pChembl,
            chemblProvenance: chemblProvenance
        });
    });
    return records;
}

/**
 * Parse the results from {@link CompoundSearch#compoundPharmacologyCount}
 * @param {Object} response - the JSON response from {@link CompoundSearch#compoundPharmacologyCount}
 * @returns {Number} Count of the number of pharmacology entries for the compound
 * @method
 */
CompoundSearch.prototype.parseCompoundPharmacologyCountResponse = function(response) {
    return response.primaryTopic.compoundPharmacologyTotalResults;
}

/**
 * Parse the results from {@link CompoundSearch#compoundClassMembersCount}
 * @param {Object} response - the JSON response from {@link CompoundSearch#compoundClassMembersCount}
 * @returns {Number} Count of the number of compounds classified for a particular class
 * @method
 */
CompoundSearch.prototype.parseCompoundClassMembersCountResponse = function(response) {
    return response.primaryTopic.memberCount;
}

/**
 * Parse the results from {@link CompoundSearch#compoundClassMembers}
 * @param {Object} response - the JSON response from {@link CompoundSearch#compoundClassMembers}
 * @returns {Number} Compounds classified for a particular class
 * @method
 */
CompoundSearch.prototype.parseCompoundClassMembersResponse = function(response) {
    var constants = new Constants();
    var compounds = [];
    response.items.forEach(function(item, index, array) {
        compounds.push({
            "label": item.exactMatch.prefLabel,
            "URI": item[constants.ABOUT]
        });
    });
    return compounds;
}
exports.CompoundSearch = CompoundSearch;
