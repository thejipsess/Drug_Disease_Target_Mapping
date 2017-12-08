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
ActivitySearch = function ActivitySearch(baseURL, appID, appKey) {
	this.baseURL = baseURL;
	this.appID = appID;
	this.appKey = appKey;
}

ActivitySearch.prototype.getTypes = function(activityUnit, page, pageSize, orderBy, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    activityUnit ? params['activity_unit'] = activityUnit : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    lens ? params['_lens'] = lens : '';
    nets({
        url: this.baseURL + '/pharmacology/filters/activities?' + Utils.encodeParams(params),
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

ActivitySearch.prototype.getUnits = function(activityType, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    lens ? params['_lens'] = lens : '';
    var unitsURL = null;
    activityType != null ? unitsURL = '/pharmacology/filters/units/' + activityType : unitsURL = '/pharmacology/filters/units';
    nets({
        url: this.baseURL + unitsURL + '?' + Utils.encodeParams(params),
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

ActivitySearch.prototype.getAllUnits = function(page, pageSize, orderBy, lens, callback) {
    params={};
    params['_format'] = "json";
    params['app_key'] = this.appKey;
    params['app_id'] = this.appID;
    lens ? params['_lens'] = lens : '';
    page ? params['_page'] = page : '';
    pageSize ? params['_pageSize'] = pageSize : '';
    orderBy ? params['_orderBy'] = orderBy : '';
    nets({
        url: this.baseURL + '/pharmacology/filters/units?' + Utils.encodeParams(params),
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

ActivitySearch.prototype.parseTypes = function(response) {
    var activityTypes = [];
	    Utils.arrayify(response.items).forEach(function(item, i) {
          activityTypes.push({uri: item["_about"], label: item.label});
	    });
	return activityTypes;
}

ActivitySearch.prototype.parseUnits = function(response) {
    var units = [];
	response.primaryTopic.unit.forEach(function(type, i) {
            units.push({uri: type["_about"], label: type.label});
	});
	return units;
}

ActivitySearch.prototype.parseAllUnits = function(response) {
    var units = [];
	response.items.forEach(function(item, i) {
            units.push({uri: item["_about"], label: item.label});
	});
	return units;
}

exports.ActivitySearch = ActivitySearch;
