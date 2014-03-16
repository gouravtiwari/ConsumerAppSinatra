'use strict';

angular.module('publicApp')
  .service('Data', function Data($http, $rootScope, $timeout, $location, $q, $route) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Data = {

        cache: {},
        add_data_to_cache:  function (url_calling, api_data) {
            this.cache[url_calling] = api_data;
            console.log('$$$$$$$$$ CACHE $$$$$$$$$$$');
            console.log(this.cache);
        },

        in_cache: function (base_url) {
            return this.cache[base_url] || null;
        },

        empty_cache: function () {
            console.log('$$$$$$$$$ CACHE EMPTIED $$$$$$$$$$$');
            this.cache = {};
        },

        get_plain_query_url: function (path){
            return 'https://nielsen.api.tibco.com/'+path;
        },

        get_query_url:  function (path, param_path){
            return this.get_plain_query_url(path)+'?'+this.get_param_path(param_path)+'apikey=' + '7567-3e6b208a-01b3-4326-bdea-f4052e5de424';
        },

        get_param_path: function(obj){
            var path = '';
            for(var data in obj){
                obj[data] = obj[data].toString();
                path = path + data +"=" + obj[data].split(' ').join('%20') + '&';
            }
            return path;
        },

        get_query_params : function (){
            //var settings = this.settings;
            return 'product_id=' + '0016000275270' + '&' +
                'lat=' + '29.7907' + '&' +
                'long=' + '-95.1621' + '&' +
                'apikey=' + '3359-3a99eff0-e18d-43c2-aad1-5bab4701f6ec';
        },

        get_base_json: function(path){
            var url_calling = this.get_plain_query_url(path);
            return this.get_promise(url_calling)
        },

        get_promise: function(url_calling, url_part, param_path){
            console.log(url_calling);
            window.recent_api_url = url_calling
            var base_url = url_calling.split('?')[0], cached_data, promise;
            cached_data = this.in_cache(url_calling);
            if(cached_data && base_url != '/api/bkg_progress') {
                console.log('$$$$$$$$ FOUND IN CACHE $$$$$$$$$');
                promise = {
                    success: function(callback){
                        callback(cached_data);
                    }
                }
            } else {
                promise = $http.get(url_calling).success(function(api_response){
                    window.recent_api_response = api_response
                });   
                var that = this;
                promise.success(function(api_data){
                    if(base_url != '/api/bkg_progress') {
                        that.add_data_to_cache(url_calling, api_data);
                        if(url_part){
                            that.add_to_recent_searches(url_part, param_path);
                        }
                    }
                }); 
            }
             
            if(promise.error) {
                promise.error(function(data, status){
                    if(status == 303){
                        console.log('Status 303, starting progress bar...')
                        $rootScope.job_progress = true;
                    }
                });
            }
            return promise
        },

        get_json: function(url_part, param_path){
            return this.get_promise(this.get_query_url(url_part, param_path), url_part, param_path);
        },

        recent_searches: [],

        add_to_recent_searches: function(url_part, param_path){
          if(param_path.pageno && param_path.pageno != 1) {
            return;
          }
          var recentSearch = {input: {}},
            url_split = url_part.split('/');
            
          if(url_split[0] == 'EMM'){
            url_split[0]  = 'Mobile Audience on ';
            recentSearch.input.platform = url_split[2];
          }
          recentSearch.api = url_split[0] + (url_split[2] ? url_split[2] : '');
          
          for (var input in param_path){
            if(input == 'pageno') continue;
            recentSearch.input[input] = param_path[input];
          }
          recentSearch.cache_url = this.get_query_url(url_part, param_path);
          recentSearch.location = this.locations[url_split[0]];
          this.recent_searches.push(recentSearch);
          console.log(this.recent_searches);
        },
        
        get_local: function(path){
            return this.get_promise(path);
        },

        set_search_data: function(obj){
            this.gmapdata = obj;
            console.log(obj)
        },

        get_search_data: function(){
            return this.gmapdata;
        },

        locations: {
          'Mobile Audience on ': '/mobile-audience',
          'Products': '/product_by_desc',
          'NetView': '/audience',
          'Stores' : '/store_by_name'
        },

        fillSortByFields: function(viewObject){
          var sortBy = [];
          for(var field in viewObject) {
            if(typeof(viewObject[field]) !== 'object'){
              sortBy.push(field);
            }
          }
          return sortBy;
        },

        sortBy: function(field, array){
          return _.sortBy(array, function(item){
            return -item[field];
          });
        }

	}
    return Data;
  })

.factory('PieChartOptions', function () {
    var simple_pie_chart = {

        chart: {
            style: {"fontFamily": "OpenSansCondLight"},
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            animation: {
                duration: 1800
            }
        },
        exporting: {
            enabled: false
        },
        title: {
            text: '',
            style: {
                "fontFamily": "OpenSansCondLight",
                fontSize: 16,
                color: "#777"
            },
            align: 'center',
            verticalAlign: 'top'
        },
        tooltip: {
            formatter: function(){
                return '<b>'+ this.key + ': </b>' + this.y;
            }
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '{point.percentage:.1f} %',
                    style: { fontFamily: "OpenSansCondLight,Georgia,Times,serif"}
                }
            }
        },
        series: [{
            type: 'pie',
            data: [],
            size: '50%'
        }]
        
    }


    var BCC = {

        simplePie: simple_pie_chart

    }
    return BCC;
  });

