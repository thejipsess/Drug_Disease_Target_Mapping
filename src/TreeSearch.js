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
TreeSearch = function TreeSearch(baseURL, appID, appKey) {
    	this.baseURL = baseURL;
    this.appID = appID;
    this.appKey = appKey;
}

TreeSearch.prototype.getRootNodes = function(root, callback) {
	var params = {};
	params['root'] = root;
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
 
    nets({
        url: this.baseURL + '/tree?' + Utils.encodeParams(params),
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

TreeSearch.prototype.getChildNodes = function(URI, callback) {
	var params = {};
	params['uri'] = URI;
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    nets({
        url: this.baseURL + '/tree/children?' + Utils.encodeParams(params),
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

TreeSearch.prototype.getParentNodes = function(URI, callback) {
	var params = {};
	params['uri'] = URI;
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;

    nets({
        url: this.baseURL + '/tree/parents?' + Utils.encodeParams(params),
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


TreeSearch.prototype.getTargetClassPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
    targetOrganism != null ? params['target_organism'] = targetOrganism : '';
    activityType != null ? params['activity_type'] = activityType : '';
    activityValue != null ? params['activity_value'] = activityValue : '';
    activityUnit != null ? params['activity_unit'] = activityUnit : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    relation != null ? params['activity_relation'] = relation : '';
    pChembl != null ? params['pChembl'] = pChembl : '';
    minpChembl != null ? params['min-pChembl'] = minpChembl : '';
    minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
    lens != null ? params['lens'] = lens : '';
    nets({
        url: this.baseURL + '/target/tree/pharmacology/count?' + Utils.encodeParams(params),
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

TreeSearch.prototype.getTargetClassPharmacologyPaginated = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
    targetOrganism != null ? params['target_organism'] = targetOrganism : '';
    activityType != null ? params['activity_type'] = activityType : '';
    activityValue != null ? params['activity_value'] = activityValue : '';
    activityUnit != null ? params['activity_unit'] = activityUnit : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    relation != null ? params['activity_relation'] = relation : '';
    pChembl != null ? params['pChembl'] = pChembl : '';
    minpChembl != null ? params['min-pChembl'] = minpChembl : '';
    minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
    lens != null ? params['lens'] = lens : '';
    page != null ? params['_page'] = page : '';
    pageSize != null ? params['_pageSize'] = pageSize : '';
    orderBy != null ? params['_orderBy'] = orderBy : '';
nets({
        url: this.baseURL + '/target/tree/pharmacology/pages?' + Utils.encodeParams(params),
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

TreeSearch.prototype.getCompoundClassPharmacologyCount = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
    targetOrganism != null ? params['target_organism'] = targetOrganism : '';
    activityType != null ? params['activity_type'] = activityType : '';
    activityValue != null ? params['activity_value'] = activityValue : '';
    activityUnit != null ? params['activity_unit'] = activityUnit : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    relation != null ? params['activity_relation'] = relation : '';
    pChembl != null ? params['pChembl'] = pChembl : '';
    minpChembl != null ? params['min-pChembl'] = minpChembl : '';
    minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
    lens != null ? params['lens'] = lens : '';
nets({
        url: this.baseURL + '/compound/tree/pharmacology/count?' + Utils.encodeParams(params),
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

TreeSearch.prototype.getCompoundClassPharmacologyPaginated = function(URI, assayOrganism, targetOrganism, activityType, activityValue, activityUnit, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, relation, pChembl, minpChembl, minExpChembl, maxpChembl, maxExpChembl, targetType, lens, page, pageSize, orderBy, callback) {
    params = {};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    params['uri'] = URI;
    assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
    targetOrganism != null ? params['target_organism'] = targetOrganism : '';
    activityType != null ? params['activity_type'] = activityType : '';
    activityValue != null ? params['activity_value'] = activityValue : '';
    activityUnit != null ? params['activity_unit'] = activityUnit : '';
    minActivityValue ? params['min-activity_value'] = minActivityValue : '';
    minExActivityValue ? params['minEx-activity_value'] = minExActivityValue : '';
    maxActivityValue ? params['max-activity_value'] = maxActivityValue : '';
    maxExActivityValue ? params['maxEx-activity_value'] = maxExActivityValue : '';
    relation != null ? params['activity_relation'] = relation : '';
    pChembl != null ? params['pChembl'] = pChembl : '';
    minpChembl != null ? params['min-pChembl'] = minpChembl : '';
    minExpChembl != null ? params['minEx-pChembl'] = minExpChembl : '';
    maxpChembl != null ? params['max-pChembl'] = maxpChembl : '';
    maxExpChembl != null ? params['maxEx-pChembl'] = maxExpChembl : '';
    targetType != null ? params['target_type'] = targetType : '';
    lens != null ? params['lens'] = lens : '';
    page != null ? params['_page'] = page : '';
    pageSize != null ? params['_pageSize'] = pageSize : '';
    orderBy != null ? params['_orderBy'] = orderBy : '';
nets({
        url: this.baseURL + '/compound/tree/pharmacology/pages?' + Utils.encodeParams(params),
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

TreeSearch.prototype.parseRootNodes = function(response) {
    var enzymeRootClasses = [];
    var prefLabel = response.primaryTopic.hasPart.prefLabel;
        Utils.arrayify(response.primaryTopic.hasPart.rootNode).forEach(function(member, i) {
            enzymeRootClasses.push({
                uri: member["_about"],
                name: member.prefLabel
            });
        });
    return {
        'label': prefLabel,
        'rootClasses': enzymeRootClasses
    };
}

TreeSearch.prototype.parseChildNodes = function(response) {
    var constants = new Constants();
    var childResponse = {};
    var treeClasses = [];
    var label = response.primaryTopic.prefLabel;
    //label = Utils.arrayify(label)[0];
    childResponse['label'] = label;
    // The childNode might be inside an exactMatch block in 1.5
    if (response.primaryTopic.childNode == null) {
        response.primaryTopic.childNode = response.primaryTopic.exactMatch.childNode;
    }
        Utils.arrayify(response.primaryTopic.childNode).forEach(function(member, i) {
            var about;
            var names = [];
            if (member[constants.ABOUT] != null) {
                about = member["_about"];

                    Utils.arrayify(member.prefLabel).forEach(function(label, j) {
                        names.push(label);
                    });
            }
            treeClasses.push({
                uri: about,
                names: names
            });
        });
    childResponse['children'] = treeClasses;
    return childResponse;
}

TreeSearch.prototype.parseParentNodes = function(response) {
    var constants = new Constants();
    var parentResponse = {};
    var treeClasses = [];
    var label = response.primaryTopic.prefLabel;
    label = Utils.arrayify(label)[0];
    parentResponse['label'] = label;
        Utils.arrayify(response.primaryTopic.parentNode).forEach(function(member, i) {
            var about = member["_about"];
            var names = [];
                Utils.arrayify(member.prefLabel).forEach(function(label, j) {
                    names.push(label);
                });
            treeClasses.push({
                uri: about,
                names: names
            });
        });
    parentResponse['parents'] = treeClasses;
    return parentResponse;
}


TreeSearch.prototype.parseTargetClassPharmacologyCount = function(response) {
    var constants = new Constants();
    return response.primaryTopic[constants.TARGET_PHARMACOLOGY_COUNT];
}

TreeSearch.prototype.parseTargetClassPharmacologyPaginated = function(response) {
    var constants = new Constants();
    var records = [];
    response.items.forEach(function(item, i, all) {
        var targets = [];
        var chemblActivityURI = null,
            pmid = null,
            //relation = null,
            //standardUnits = null,
            //standardValue = null,
            activityType = null,
            inDataset = null,
            fullMWT = null,
            chemblURI = null,
            cwURI = null,
            prefLabel = null,
            csURI = null,
            inchi = null,
            inchiKey = null,
            smiles = null,
            ro5Violations = null,
            targetURI = null,
            targetTitle = null,
            targetOrganism = null,
            assayURI = null,
            assayDescription = null,
            assayOrganism = null,
            publishedRelation = null,
            publishedType = null,
            publishedUnits = null,
            publishedValue = null,
            pChembl = null,
            activityType = null,
            activityRelation = null,
            activityValue = null,
            activityUnits = null,
            conceptwikiProvenance = {},
            chemspiderProvenance = {},
            assayTargetProvenance = {},
            assayProvenance = {};
        chemblActivityURI = item["_about"];
        pmid = item.pmid;

        activityType = item.activity_type;
        activityRelation = item.activity_relation;
        activityValue = item.activity_value;
        var units = item.activity_unit;
        if (units) {
            activityUnits = units.prefLabel;
        }
        //relation = item.relation ? item.relation : null;
        //standardUnits = item.standardUnits;
        //standardValue = item.standardValue ? item.standardValue : null;
        activityType = item.activity_type;
        inDataset = item[constants.IN_DATASET];
        forMolecule = item[constants.FOR_MOLECULE];
        chemblURI = forMolecule[constants.ABOUT] ? forMolecule[constants.ABOUT] : null;
        pChembl = item.pChembl ? item.pChembl : null;
        if (forMolecule[constants.EXACT_MATCH] != null) {
            forMolecule[constants.EXACT_MATCH].forEach(function(match, j, all) {
                var src = match[constants.IN_DATASET];
                if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                    cwURI = match[constants.ABOUT];
                    prefLabel = match[constants.PREF_LABEL];
                    var conceptWikiLinkOut = cwURI;
                    conceptwikiProvenance['source'] = 'conceptwiki';
                    conceptwikiProvenance['prefLabel'] = conceptWikiLinkOut;
                } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                    csURI = match[constants.ABOUT];
                    inchi = match[constants.INCHI];
                    inchiKey = match[constants.INCHIKEY];
                    smiles = match[constants.SMILES];
                    ro5Violations = match[constants.RO5_VIOLATIONS] != null ? match[constants.RO5_VIOLATIONS] : null;
                    fullMWT = match[constants.MOLWT] ? match[constants.MOLWT] : null;
                    var chemspiderLinkOut = csURI;
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
            });
        }
        var target = item.hasAssay.hasTarget;
var target_organisms = [];
            // For Target
            var target_components = [];
	    var target_title = null;
	    var target_organism_name = null;
	    var target_uri = null;
	    if (target != null) {
                target_title = target.title;
		target_uri = target._about;
                target_provenance = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target._about.split('/').pop();
		target_organism_name = target.assay_organism != null ? target.assay_organism : null;
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
        var onAssay = item[constants.ON_ASSAY];
        assayURI = onAssay["_about"] ? onAssay["_about"] : null;
        assayDescription = onAssay.description ? onAssay.description : null;
        assayOrganismName = onAssay.assayOrganismName ? onAssay.assayOrganismName : null;
        var assayOrganismLinkOut = assayURI;
        assayProvenance['assayDescription'] = assayOrganismLinkOut;
        assayProvenance['assayOrganismName'] = assayOrganismLinkOut;
        publishedRelation = item.publishedRelation ? item.publishedRelation : null;
        publishedType = item.publishedType ? item.publishedType : null;
        publishedUnits = item.publishedUnits ? item.publishedUnits : null;
        publishedValue = item.publishedValue ? item.publishedValue : null;
        standardUnits = item.standardUnits ? item.standardUnits : null;
        var activity_comment = item['activityComment'] ? item['activityComment'] : null;
        var documents = [];
        if (item.hasDocument) {
                Utils.arrayify(item.hasDocument).forEach(function(document, index, documents) {
                    documents.push(document);
                });
            }
        records.push({
            'targetComponents': target_components,
		'targetTitle': target_title,
		'targetURI': target_uri,
		'targetOrganismName': target_organism_name,
            'chemblActivityURI': chemblActivityURI,
            'pmid': pmid,
            //'relation': relation,
            //'standardUnits': standardUnits,
            //'standardValue': standardValue,
            'activityType': activityType,
            'activityRelation': activityRelation,
            'activityUnits': activityUnits,
            'activityValue': activityValue,
            'inDataset': inDataset,
            'fullMWT': fullMWT,
            'chemblURI': chemblURI,
            'cwURI': cwURI,
            'prefLabel': prefLabel,
            'csURI': csURI,
            'inchi': inchi,
            'inchiKey': inchiKey,
            'smiles': smiles,
            'ro5Violations': ro5Violations,
            //targetURI: targetURI,
            //targetTitle: targetTitle,
            //targetOrganism: targetOrganism,
            'assayURI': assayURI,
            'assayDescription': assayDescription,
            'assayOrganismName': assayOrganismName,
            'publishedRelation': publishedRelation,
            'publishedType': publishedType,
            'publishedUnits': publishedUnits,
            'publishedValue': publishedValue,
            'pChembl': pChembl,
            'conceptWikiProvenance': conceptwikiProvenance,
            'chemspiderProvenance': chemspiderProvenance,
            'assayTargetProvenance': assayTargetProvenance,
            'assayProvenance': assayProvenance,
            'chemblDOIs': documents,
            'activityComment': activity_comment
        });
    });
    return records;
}

TreeSearch.prototype.parseCompoundClassPharmacologyCount = function(response) {
    var constants = new Constants();
    return response.primaryTopic[constants.COMPOUND_PHARMACOLOGY_COUNT];
}

TreeSearch.prototype.parseCompoundClassPharmacologyPaginated = function(response) {
    var constants = new Constants();
    var records = [];
    response.items.forEach(function(item, i, all) {
        var targets = [];
        var chemblActivityURI = null,
            qudtURI = null,
            pmid = null,
            //relation = null,
            //standardUnits = null,
            //standardValue = null,
            activityType = null,
            inDataset = null,
            fullMWT = null,
            chemblURI = null,
            cwURI = null,
            prefLabel = null,
            csURI = null,
            inchi = null,
            inchiKey = null,
            smiles = null,
            ro5Violations = null,
            targetURI = null,
            targetTitle = null,
            targetOrganism = null,
            assayURI = null,
            assayDescription = null,
            assayOrganism = null,
            publishedRelation = null,
            publishedType = null,
            publishedUnits = null,
            publishedValue = null,
            pChembl = null,
            activityType = null,
            activityRelation = null,
            activityValue = null,
            activityUnits = null,
            conceptwikiProvenance = {},
            chemspiderProvenance = {},
            assayTargetProvenance = {},
            assayProvenance = {};
        chemblActivityURI = item["_about"];
        pmid = item.pmid;

        activityType = item.activity_type;
        activityRelation = item.activity_relation;
        activityValue = item.activity_value;
        var units = item.activity_unit;
        if (units) {
            activityUnits = units.prefLabel;
        }
        qudtURI = item.qudt_uri ? item.qudt_uri : null;
        //relation = item.relation ? item.relation : null;
        //standardUnits = item.standardUnits;
        //standardValue = item.standardValue ? item.standardValue : null;
        activityType = item.activity_type;
        inDataset = item[constants.IN_DATASET];
        forMolecule = item[constants.FOR_MOLECULE];
        chemblURI = forMolecule[constants.ABOUT] ? forMolecule[constants.ABOUT] : null;
        pChembl = item.pChembl ? item.pChembl : null;
if (forMolecule[constants.EXACT_MATCH] != null) {
        forMolecule[constants.EXACT_MATCH].forEach(function(match, j, all) {
            var src = match[constants.IN_DATASET];
            if (constants.SRC_CLS_MAPPINGS[src] == 'conceptWikiValue') {
                cwURI = match[constants.ABOUT];
                prefLabel = match[constants.PREF_LABEL];
                var conceptWikiLinkOut = cwURI;
                conceptwikiProvenance['source'] = 'conceptwiki';
                conceptwikiProvenance['prefLabel'] = conceptWikiLinkOut;
            } else if (constants.SRC_CLS_MAPPINGS[src] == 'chemspiderValue') {
                csURI = match[constants.ABOUT];
                inchi = match[constants.INCHI];
                inchiKey = match[constants.INCHIKEY];
                smiles = match[constants.SMILES];
                ro5Violations = match[constants.RO5_VIOLATIONS] !== null ? match[constants.RO5_VIOLATIONS] : null;
                fullMWT = match[constants.MOLWT] ? match[constants.MOLWT] : null;
                var chemspiderLinkOut = csURI;
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
        });
}
        var target = item.hasAssay.hasTarget;
        var assayTargets = [];
var target_organism_name = null;
            // For Target
            var target_components = [];
	    var target_title = null;
	    var target_organism_name = null;
	    var target_uri = null;
	    if (target != null) {
                target_title = target.title;
		target_uri = target._about;
                target_provenance = 'https://www.ebi.ac.uk/chembl/target/inspect/' + target._about.split('/').pop();
		target_organism_name = target.assay_organism != null ? target.assay_organism : null;
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
        var onAssay = item[constants.ON_ASSAY];
        assayURI = onAssay["_about"] ? onAssay["_about"] : null;
        assayDescription = onAssay.description ? onAssay.description : null;
        assayOrganismName = onAssay.assayOrganismName ? onAssay.assayOrganismName : null;
        var assayOrganismLinkOut = assayURI;
        assayProvenance['assayDescription'] = assayOrganismLinkOut;
        assayProvenance['assayOrganismName'] = assayOrganismLinkOut;
        publishedRelation = item.publishedRelation ? item.publishedRelation : null;
        publishedType = item.publishedType ? item.publishedType : null;
        publishedUnits = item.publishedUnits ? item.publishedUnits : null;
        publishedValue = item.publishedValue ? item.publishedValue : null;
        standardUnits = item.standardUnits ? item.standardUnits : null;
        var activity_comment = item['activityComment'] ? item['activityComment'] : null;
        var documents = [];
        if (item.hasDocument) {
                Utils.arrayify(item.hasDocument).forEach(function(document, index, documents) {
                    documents.push(document);
                });
        }

        records.push({
            'qudtURI': qudtURI,
            'chemblActivityURI': chemblActivityURI,
            'pmid': pmid,
            //'relation': relation,
            //'standardUnits': standardUnits,
            //'standardValue': standardValue,
            'activityType': activityType,
            'activityRelation': activityRelation,
            'activityUnits': activityUnits,
            'activityValue': activityValue,
            'inDataset': inDataset,
            'fullMWT': fullMWT,
            'chemblURI': chemblURI,
            'cwURI': cwURI,
            'prefLabel': prefLabel,
            'csURI': csURI,
            'inchi': inchi,
            'inchiKey': inchiKey,
            'smiles': smiles,
            'ro5Violations': ro5Violations,
            'targetURI': target_uri,
            'targetTitle': target_title,
            'targetOrganismName': target_organism_name,
	    'targetComponents': target_components,
            'assayURI': assayURI,
            'assayDescription': assayDescription,
            'assayOrganismName': assayOrganismName,
            'publishedRelation': publishedRelation,
            'publishedType': publishedType,
            'publishedUnits': publishedUnits,
            'publishedValue': publishedValue,
            'pChembl': pChembl,
            'conceptWikiProvenance': conceptwikiProvenance,
            'chemspiderProvenance': chemspiderProvenance,
            'assayTargetProvenance': assayTargetProvenance,
            'assayProvenance': assayProvenance,
            'chemblDOIs': documents,
            'activityComment': activity_comment
        });
    });
    return records;
}
exports.TreeSearch = TreeSearch;
