(function() {
  "use strict";

  angular.module("app").factory("UserService", UserService);

  UserService.$inject = ["$http"];

  var UserService = $http => {
    let service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
      return $http
        .get("/api/users")
        .then(handleSuccess, handleError("Error getting all users"));
    }
    function GetById(id) {
      return $http
        .get("/api/users" + id)
        .then(handleSuccess, handleError("Error getting user by id"));
    }
    function GetByUsername(username) {
      return $http
        .get("/api/users" + username)
        .then(handleSuccess, handleError("Error getting user by username"));
    }
    function Create(user) {
      return $http
        .get("/api/users" + user)
        .then(handleSuccess, handleError("Error creating user"));
    }
    function Update(user) {
      return $http
        .get("/api/users" + user.id, user)
        .then(handleSuccess, handleError("Error updating user"));
    }
    function Delete(id) {
      return $http
        .get("/api/users" + id)
        .then(handleSuccess, handleError("Error updating user"));
    }

    // private functions
    const handleSuccess = (res) => {
        return res.data;
    };
    const handleError = (error) => {
        return () => {
            return { success: false, message: error };
        };
    };
  };
})();
