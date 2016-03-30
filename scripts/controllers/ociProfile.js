
'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')

.controller('ociProfile', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
	var url = "http://www.mocky.io/v2/55b8b475acd73a3e00ee22e4?callback=JSON_CALLBACK"
	$http.jsonp(url)
		.success(function(data) {
				var i;
				$scope.items = data;
			   
			/*Pagination*/
				$scope.pageChanged = function() {
					var begin = (($scope.currentPage - 1) * $scope.maxSize),
					end = begin + $scope.maxSize;
					$scope.items = data.slice(begin, end);
				};
				$scope.maxSize = 5;
				$scope.totalItems =  $scope.items.length;
				$scope.currentPage = 1;            
			  
			/* Deleting the Existing Row */
				 $scope.delete = function(id) {
					for(i in $scope.items) {
						if($scope.items[i].Id == id) {
						$scope.CompanyId = $scope.items[i].CompanyId;
							$scope.items.splice(i,1);
							
							$scope.message ="deleted";
							$scope.notificationMessage = true;
							$timeout(function(){
								$scope.notificationMessage = false;
							},5000);
							$scope.newentry = {};
							return $scope.items;
						}
					}
					
				};  
							 
			/*Search Functionality*/                
				$scope.filterFunction = function(element) {
					return element.$.match(/^Ma/) ? true : false;
				};

			/*Add new Data*/   
				 $scope.addData = function (){
					$scope.items.unshift($scope.newentry);
					$scope.CompanyId = $scope.newentry.CompanyId;
					$scope.message ="added";
					$scope.notificationMessage = true;
					$timeout(function(){
					$scope.notificationMessage = false;
					},4000);
					$scope.newentry={};
				}; 

			/*Reset the new Data */
				$scope.cancelEntry = function(){
					$scope.newentry={};
				};
				
			/* Update::::Save the entry */
				 $scope.update =function(id){
					
					for(i in $scope.items) {
						if($scope.items[i].Id == id) {
							
							
							$scope.CompanyId = $scope.items[i].CompanyId;
							$scope.xml=$scope.items[i].XML;
							$scope.nafta=$scope.items[i].NAFTA;
							$scope.currency=$scope.items[i].Currency;
							$scope.pdtMasterCode=$scope.items[i].ProductMasterCode;
							$scope.pdtGrp=$scope.items[i].ProductMasterGroup;
							$scope.leadTime=$scope.items[i].LeadTime;
							$scope.vendor=$scope.items[i].vendor;
							
						}
					}
					$scope.CompanyId = $scope.CompanyId;
					$scope.message ="updated";
					$scope.notificationMessage = true;
					$timeout(function(){
					$scope.notificationMessage = false;
					},5000);
					
					
				}; 
				
			/* Cancel updated entry */
				$scope.cancel = function(id) {
					for(i in $scope.items) {
						if($scope.items[i].Id == id) {
							
							$scope.items[i].CompanyId = $scope.CompanyId;
							$scope.items[i].XML=$scope.xml;
							$scope.items[i].NAFTA=$scope.nafta;
							$scope.items[i].Currency=$scope.currency;
							$scope.items[i].ProductMasterCode=$scope.pdtMasterCode;
							$scope.items[i].ProductMasterGroup=$scope.pdtGrp;
							$scope.items[i].LeadTime=$scope.leadTime;
							$scope.items[i].vendor=$scope.vendor;
							 
						}
					}
				}; 

			
		});/*success*/
}]);/*controller ociProfile ends here*/

