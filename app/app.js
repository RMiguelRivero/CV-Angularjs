'use strict';

var Rivero_CV = angular.module('Rivero_CV',[
    'ngRoute',
    'pascalprecht.translate',
    'Rivero_CV_Controllers',
    'Rivero_CV_Services'
    ]);

Rivero_CV.config(['$routeProvider', '$translateProvider', '$locationProvider', '$compileProvider',
  function($routeProvider, $translateProvider, $locationProvider, $compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|mailto|tel|skype):/); // https?|ftp|file|
    $routeProvider.
        when('/en/',{
            controller:'showInfoCtrl',
            templateUrl:'app/views/tpl.html'
        }).
        when('/es/',{
            controller:'showInfoCtrl',
            templateUrl:'app/views/tpl.html'
        }).
        otherwise({
            redirectTo:'/en/'
        });
    $translateProvider.translations('English', {
        'CONTACT': 'contact',
        'EDUCATION': 'education',
        'EMPLOYMENT': 'experience',
        'LAN': 'languages',
        'PROGRAMMING': 'programming',
        'HOBBIES': 'hobbies',
        'PRO_SKILLS': 'professional skills',
        'PER_SKILLS': 'personal skills',
        'HONORS_AWARDS': 'honors & awards',
        'PROJECTS': 'projects',
        // professional skills
        'LANGUAGES': 'Languages',
        'DBMS': 'DBMS',
        'IDE': 'IDE',
        'OS': 'OS',
        'DESIGN': 'Design',
        'OTHERS': 'Others',
        'HOURS': 'hours',
        // footer
        'BUILD': 'Built with',
        'UPDATED': 'Last update: April 2016',
        // Modal
        'MODAL_TITLE': 'CONTACT ME',
        'MODAL_BODY': 'If you liked my CV and you want to know more, do not hesitate to send me an email!',
    })
    .translations('Español', {
        'CONTACT': 'contacto',
        'LAN': 'idiomas',
        'PROGRAMMING': 'programación',
        'HOBBIES': 'aficiones',
        'EDUCATION': 'formación',
        'EMPLOYMENT': 'experiencia',
        'PRO_SKILLS': 'tecnologías',
        'PER_SKILLS': 'aptitudes',
        'HONORS_AWARDS': 'premios y menciones',
        'PROJECTS': 'projectos', 
        // professional skills
        'LANGUAGES': 'Lenguajes',
        'DBMS': 'BBDD',
        'IDE': 'IDE',
        'OS': 'SSOO',
        'DESIGN': 'Diseño',
        'OTHERS': 'Otros',
        'HOURS': 'horas',
        // footer
        'BUILD': 'Hecho con',
        'UPDATED': 'Última actualización: April 2016',
        // Modal
        'MODAL_TITLE': 'CONTACTA CONMIGO',
        'MODAL_BODY': 'Si mi curriculo te ha gustado y quieres saber más, ¡no dudes en contactar conmigo!',
    });

    // if(window.history && window.history.pushState){
    //     $locationProvider.html5Mode(true);
    // }
}]);
