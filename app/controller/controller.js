"use strict";

var Rivero_CV_Controllers = angular.module('Rivero_CV_Controllers', [ 'ngRoute', 'pascalprecht.translate' ]);

Rivero_CV_Controllers
.controller('showInfoCtrl',['$scope', '$location', '$translate','Info', function($scope, $location, $translate, Info){
    angular.element(document).ready(function () {
        $scope.data = {};

        getData();

        function getData() {
            $scope.$emit('LOAD');
            Info.getJSON()
                .success(function(data){
                    $scope.data = data;
                    $translate.use($scope.data.language);
                    console.info("Data loaded succesfully.");
                    countVisit($scope.data.language);
                    $scope.$emit('UNLOAD');
                })
                .error(function(data, status, headers, config) {
                    console.error('Error: '+status);
                    console.error('Error message: '+ data.error.message);
                    console.error("There was error loading data")
                });
        }

        function countVisit(lan) {
            var self = this,
                $modal = $(".mr-modal-contact"),
                numberVisits,
                sContact = 'SEND EMAIL',
                sCancel = 'CLOSE';

            localStorage[lan] = localStorage[lan] || 0;
            localStorage[lan] = +1 + parseInt(localStorage[lan]);
            numberVisits = parseInt(localStorage[lan]);

            if ( (numberVisits >= 5) && (numberVisits % 2 == 1)){

                if(lan === 'Español'){
                    sContact = 'ENVIAR EMAIL';
                    sCancel = 'CERRAR';
                }

                setTimeout(function() {
                    $modal.mrModal({
                        close: function(){
                            $(this).empty();
                            $(this).mrModal('destroy');
                        },
                        buttons: [{
                            text: sCancel,
                            class: 'link',
                            click: function() { 
                                $(this).mrModal('close')
                            }
                        },{
                            text: sContact,
                            class: 'button',
                            click: function() { 
                                $(this).mrModal('close');
                                document.location.href = "mailto:rmiguelrivero@gmail.com?subject=Job%20opportunity";
                            }
                        }],
                        autoOpen: true,
                        loadingIndicator: false, // loader true will show the spinner
                    });
                }, 10);
            }
        }
    })
}])
.controller('loadCtrl',['$scope', function($scope){
    $scope.$on('LOAD', function(){
        $scope.loading=true;
    })
    $scope.$on('UNLOAD', function(){
        $scope.loading=false;
    })
}]);