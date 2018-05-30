(function() {
  "use strict";

  angular
    .module("app", ["ngRoute", "ngCookies"])
    .config(config)
    .run(run);

  config.$inject = ["$routeProvider", "$locationProvider"];

  function config($routeProvider, $locationProvider) {
    $routeProvider

      .when("/", {
        controller: "HomeController",
        templateUrl: "home/home.view.html",
        controllerAs: vm
      })
      .when("/login", {
        controller: "LoginController",
        templateUrl: "login/login.view.html",
        controllerAs: "vm"
      })
      .when("/register", {
        controller: "RegisterController",
        templateUrl: "register/register.view.html",
        controllerAs: vm
      })
      .otherwise({ redirctTo: "/login" });
  }

  run.$inject = ["$rootScope", "$location", "$cookies", "$http"];
  function run($rootScope, $location, $cookies, $http) {
    //   keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject("globals") || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common["Authentation"] =
        "Basic" + $rootScope.globals.currentUser.authData;
    }

    $rootScope.$on("$locationChangeStart", (event, next, current) => {
      // redirect to login page if not loggedin and try to access a restricted page
      let restrictedPage =
        $.inArray($location.path(), ["/login", "/register"]) === -1;
      let loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path("/login");
      }
    });
  }
})();
