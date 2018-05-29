(function() {
  "use strict";

  angular.module("app").controller("LoginController", LoginController);

  LoginController.$inject = ["$location", "Authentication", "FlashService"];

  function LoginController($location, AuthenticationService, FlashService) {
    let vm = this;

    vm.login = login;

    (function initController() {
      // reset login status
      AuthenticationService.ClearCredentials();
    })();

    function login() {
      vm.dataLoading = true;
      AuthenticationService.Login(
        vm.username,
        vm.password,
        (response = () => {
          if (response.success) {
            AuthenticationService.SetCredentials(vm.username, vm.password);
            $location.path("/");
          } else {
            FlashService.Error(response.message);
            vm.dataLoading = false;
          }
        })
      );
    }
  }
})();
