"use strict";

// Aside >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Rivero_CV.directive("contact", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/contact.html"
  };
})
.directive("languages", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/languages.html"
  };
})
.directive("programming", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/programming.html"
  };
})
.directive("hobbies", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/hobbies.html"
  };
})
// Principal >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
.directive("education", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/education.html"
  };
})
.directive("employment", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/employment.html"
  };
})
.directive("personalSkills", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/personal_skills.html"
  };
})
.directive("professionalSkills", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/professional_skills.html"
  };
})
.directive("honorsAwards", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/honors_awards.html"
  };
})
.directive("foot", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/footer.html"
  };
})
.directive("projects", function() {
  return {
    restrict: 'E',
    templateUrl: "app/template/projects.html"
  };	
});
