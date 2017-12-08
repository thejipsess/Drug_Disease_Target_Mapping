//This content is released under the MIT License, http://opensource.org/licenses/MIT. See licence.txt for more details.

Openphacts.EnzymeSearch = function EnzymeSearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

Openphacts.EnzymeSearch.prototype.getClassificationRootClasses = function(callback) {
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/root',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result.primaryTopic);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.EnzymeSearch.prototype.getClassificationClass = function(enzymeURI, callback) {
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/node',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: enzymeURI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result.primaryTopic);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.EnzymeSearch.prototype.getClassificationClassMembers = function(enzymeURI, callback) {
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/members',
                dataType: 'json',
		cache: true,
		data: {
			_format: "json",
                        uri: enzymeURI,
			app_id: this.appID,
			app_key: this.appKey
		},
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result.primaryTopic);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.EnzymeSearch.prototype.getPharmacologyCount = function(enzymeURI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = enzymeURI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        minActivityValue != null ? params['min-activity_value'] = minActivityValue : '';
        minExActivityValue != null ? params['minEx-activity_value'] = minExActivityValue : '';
        maxActivityValue != null ? params['max-activity_value'] = maxActivityValue : '';
        maxExActivityValue != null ? params['maxEx-activity_value'] = maxExActivityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
	var enzymeQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/pharmacology/count',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result.primaryTopic);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.EnzymeSearch.prototype.getPharmacologyPaginated = function(enzymeURI, assayOrganism, targetOrganism, activityType, activityValue, minActivityValue, minExActivityValue, maxActivityValue, maxExActivityValue, activityUnit, page, pageSize, orderBy, callback) {
        params={};
        params['_format'] = "json";
        params['app_key'] = this.appKey;
        params['app_id'] = this.appID;
        params['uri'] = enzymeURI;
        assayOrganism != null ? params['assay_organism'] = assayOrganism : '';
        targetOrganism != null ? params['target_organism'] = targetOrganism : '';
        activityType != null ? params['activity_type'] = activityType : '';
        activityValue != null ? params['activity_value'] = activityValue : '';
        minActivityValue != null ? params['min-activity_value'] = minActivityValue : '';
        minExActivityValue != null ? params['minEx-activity_value'] = minExActivityValue : '';
        maxActivityValue != null ? params['max-activity_value'] = maxActivityValue : '';
        maxExActivityValue != null ? params['maxEx-activity_value'] = maxExActivityValue : '';
        activityUnit != null ? params['activity_unit'] = activityUnit : '';
        page != null ? params['_page'] = page : '';
        pageSize != null ? params['_pageSize'] = pageSize : '';
        orderBy != null ? params['_orderBy'] = orderBy : '';
	var chebiQuery = $.ajax({
		url: this.baseURL + '/target/enzyme/pharmacology/pages',
                dataType: 'json',
		cache: true,
		data: params,
		success: function(response, status, request) {
			callback.call(this, true, request.status, response.result);
		},
		error: function(request, status, error) {
			callback.call(this, false, request.status);
		}
	});
}

Openphacts.EnzymeSearch.prototype.parseClassificationRootClasses = function(response) {
        var enzymeRootClasses = [];
	$.each(response.rootNode, function(i, member) {
            enzymeRootClasses.push({uri: member["_about"], name: member.name});
	});
	return enzymeRootClasses;
}

Openphacts.EnzymeSearch.prototype.parseClassificationClass = function(response) {
        var enzymeClasses = [];
        var uri = response["_about"];
        var name = response.name;
	$.each(response.sibling, function(i, member) {
            enzymeClasses.push({uri: member["_about"], name: member.name});
	});
	return { uri: uri, name: name, siblings: enzymeClasses};
}

Openphacts.EnzymeSearch.prototype.parseClassificationClassMembers = function(response) {
        var enzymeClasses = [];
        if ($.isArray(response.has_member)) {
	        $.each(response.has_member, function(i, member) {
                var about = member["_about"];
                var names = [];
                if ($.isArray(member.name)) {
                    $.each(member.name, function(j, label) {
                        names.push(label);
                    });
                } else {
                   names.push(member.name);
                }
                enzymeClasses.push({uri: about, names: names});
	        });
        } else {
	        var about = response.has_member["_about"];
            var names = [];
            if ($.isArray(response.has_member.name)) {
                $.each(response.has_member.name, function(j, label) {
                    names.push(label);
                });
            } else {
                names.push(response.has_member.name);
            }
            enzymeClasses.push({uri: about, names: names});
        }
	    return enzymeClasses;
}

Openphacts.EnzymeSearch.prototype.parsePharmacologyCount = function(response) {
	return response.enzymePharmacologyTotalResults;
}

Openphacts.EnzymeSearch.prototype.parsePharmacologyPaginated = function(response) {
        var records = [];
        $.each(response.items, function(i, item) {
            var targets = [];
            var chemblActivityURI, pmid, relation, standardUnits, standardValue, activityType, inDataset, fullMWT, chemblURI, cwURI, prefLabel, csURI, inchi, inchiKey, smiles, ro5Violations, targetURI, targetTitle, targetOrganism, assayURI, assayDescription;
            chemblActivityURI = item["_about"];
            pmid = item.pmid;
            relation = item.relation;
            standardUnits = item.standardUnits;
            standardValue = item.standardValue;
            activityType = item.activity_type;
            inDataset = item.inDataset;
            chemblURI = item.forMolecule["_about"];
            fullMWT = item.forMolecule.full_mwt;
            $.each(item.forMolecule.exactMatch, function(j, match) {
		if (match["_about"] && match["_about"].indexOf("http://www.conceptwiki.org") !== -1) {
                    cwURI = match["_about"];
                    prefLabel = match["prefLabel"];
		} else if (match["_about"] && match["_about"].indexOf("chemspider.com") !== -1) {
                    csURI = match["_about"];
                    inchi = match.inchi;
                    inchiKey = match.inchikey;
                    smiles = match.smiles;
                    ro5Violations = match.ro5_violations;
		}
            });
            targetURI = item.target["_about"];
            targetTitle = item.target.title;
            targetOrganism = item.target.organism;
            if (item.target.exactMatch) {
                $.each(item.target.exactMatch, function(j, match) {
                    targets.push(match);
                });
            }
            assayURI = item.onAssay["_about"];
            assayDescription = item.onAssay.description;
            records.push({
                             targets: targets,
                             chemblActivityURI: chemblActivityURI,
                             pmid: pmid,
                             relation: relation,
                             standardUnits: standardUnits,
                             standardValue: standardValue,
                             activityType: activityType,
                             inDataset: inDataset,
                             fullMWT: fullMWT,
                             chemblURI: chemblURI,
                             cwURI: cwURI,
                             prefLabel: prefLabel,
                             csURI: csURI,
                             inchi: inchi,
                             inchiKey: inchiKey,
                             smiles: smiles,
                             ro5Violations: ro5Violations,
                             targetURI: targetURI,
                             targetTitle: targetTitle,
                             targetOrganism: targetOrganism,
                             assayURI: assayURI,
                             assayDescription: assayDescription
                         });
        });
        return records;
}
