'use strict';

angular.module('publicApp')
  .service('Data', function Data($http, $rootScope, $timeout, $location, $q, $route) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var Data = {

        cache: {},
        add_data_to_cache:  function (base_url, api_data) {
            this.cache[base_url] = api_data;
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

        get_query_url:  function (path){
            return this.get_plain_query_url(path)+'?'+this.get_query_params();
        },

        get_query_params : function (){
            //var settings = this.settings;
            return 'product_id=' + '0016000275270' + '&' +
                'lat=' + '29.7907' + '&' +
                'long=' + '-95.1621' + '&' +
                'apikey=' + '3359-3a99eff0-e18d-43c2-aad1-5bab4701f6ec';
        },

        get_query_part : function (){

        },

        get_base_json: function(path){
            var url_calling = this.get_plain_query_url(path);
            return this.get_promise(url_calling)
        },

        get_promise: function(url_calling){
            console.log(url_calling);
            window.recent_api_url = url_calling
            var base_url = url_calling.split('?')[0], cached_data, promise;
            cached_data = this.in_cache(base_url);
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
                        that.add_data_to_cache(base_url, api_data)
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

        get_json: function(url_part){
            return this.get_promise(this.get_query_url(url_part));
        },
        
        get_local: function(path){
            return this.get_promise(path);
        }

		}
    return Data;
  });
