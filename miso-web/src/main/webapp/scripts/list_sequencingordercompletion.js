/*
 * Copyright (c) 2012. The Genome Analysis Centre, Norwich, UK
 * MISO project contacts: Robert Davey @ TGAC
 * *********************************************************************
 *
 * This file is part of MISO.
 *
 * MISO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MISO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MISO.  If not, see <http://www.gnu.org/licenses/>.
 *
 * *********************************************************************
 */

ListTarget.sequencingordercompletion = {
  name: "Sequencing Orders",
  getUserManualUrl: function() {
    return Urls.external.userManual('sequencing_orders');
  },
  createUrl: function(config, projectId) {
    if (config.poolId) {
      return Urls.rest.pools.completionsDatatable(config.poolId);
    } else {
      return Urls.rest.sequencingOrders.completionsDatatable(config.slug, config.platform);
    }
  },
  getQueryUrl: null,
  createBulkActions: function(config, projectId) {
    if (config.poolId) {
      return [];
    }
    return BulkTarget.pool.getBulkActions().filter(function(action) {
      return !action || !action.excludeOnOrders;
    }).map(function(action) {
      return action ? {

        name: action.name + ' (Pool)',
        action: function(orders) {
          action.action(orders.map(function(order) {
            return order.pool;
          }));
        }

      } : null;
    });
  },
  createStaticActions: function(config, prodjectId) {
    return [];
  },
  createColumns: function(config, projectId) {
    var nonZero = function(items) {
      return items.some(function(x) {
        return x != 0;
      });
    }
    return [ListUtils.idHyperlinkColumn("Name", Urls.ui.pools.edit, "pool.id", function(completion) {
      return completion.pool.name;
    }, 1, !config.poolId), ListUtils.labelHyperlinkColumn("Alias", Urls.ui.pools.edit, function(completion) {
      return completion.pool.id;
    }, "pool.alias", 0, !config.poolId), {
      "sTitle": "Purpose",
      "mData": "purpose",
      "bSortable": true,
      "iSortPriority": 0,
      "include": true
    }, {
      "sTitle": "Order Description",
      "mData": "description",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true
    }, {
      "sTitle": "Pool Description",
      "mData": "pool.description",
      "mRender": Warning.tableWarningRenderer(WarningTarget.completion),
      "bSortable": false,
      "iSortPriority": 0,
      "include": !config.poolId
    }, {
      "sTitle": "Instrument Model",
      "mData": "parameters.instrumentModelAlias",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true
    }, {
      "sTitle": "Longest Index",
      "mData": "pool.longestIndex",
      "bSortable": false,
      "iSortPriority": 0,
      "include": !config.poolId
    }, {
      sTitle: 'Container Model',
      mData: 'containerModelAlias',
      mRender: ListUtils.render.naIfNull
    }, {
      "sTitle": "Sequencing Parameters",
      "mData": "parameters.name",
      "iSortPriority": 0,
      "include": true
    }, {
      "sTitle": "Completed",
      "mData": "completed",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Failed",
      "mData": "failed",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Requested",
      "mData": "requested",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Running",
      "mData": "running",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Started",
      "mData": "started",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Stopped",
      "mData": "stopped",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Unknown",
      "mData": "unknown",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Pending",
      "mData": "loaded",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "visibilityFilter": nonZero
    }, {
      "sTitle": "Remaining",
      "mData": "remaining",
      "bSortable": false,
      "iSortPriority": 0,
      "include": true,
      "mRender": function(data, type, full) {
        if (type === 'display') {
          return Math.max(0, data - full.loaded) + (full.loaded ? '*' : '');
        }
        return data;
      }
    }, {
      "sTitle": "Modified",
      "mData": "lastUpdated",
      "iSortPriority": 2,
      "include": true
    }];
  },
  searchTermSelector: function(searchTerms) {
    return [searchTerms['fulfilled'], //
    searchTerms['active'], //
    searchTerms['runstatus'], //
    searchTerms['changed'], //
    searchTerms['platform'], //
    searchTerms['index']]
  }
};
