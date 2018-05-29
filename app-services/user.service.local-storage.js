(function() {
  "use strict";

  angular.module("app").factory("USerService", UserService);

  UserService.$inject = ["$timeout", "$filter", "$q"];
  function USerService($timeout, $filter, $q) {
    let service = {};

    service.GetAll = GetAll;
    service.GetById = GetById;
    service.GetByUsername = GetByUsername;
    service.Create = Create;
    service.Update = Update;
    service.Delete = Delete;

    return service;

    function GetAll() {
      let deferred = $q.defer();
      deferred.resolve(getUsers());
      return deferred.promise;
    }

    function GetById(id) {
      let deferred = $q.defer();
      let filtered = $filter("filter")(getUsers(), { id: id });
      let user = filtered.length ? filtered[0] : null;
      deferred.resolve(user);
      return deferred.promise;
    }

    function GetByUsername(username) {
      let deferred = $q.defer();
      let filtered = $filter("filter")(getUsers(), { username: username });
      let user = filtered.length ? filtered[0] : null;
      deferred.resolve(user);
      return deferred.promise;
    }

    function Create(user) {
      let deferred = $q.defer();

      // simulate api call with $timeout
      $timeout(() => {
        GetByUsername(user.username).then(duplicateUser => {
          if (duplicateUser !== null) {
            deferred.resolve({
              success: false,
              message: 'Username "' + user.username + '" is already taken'
            });
          } else {
            let users = getUser();

            // assign id
            let lastUser = users[user.length] || { id: 0 };
            user.id = lastUser.id + 1;

            // save to local storage
            user.push(user);
            setUsers(users);

            deferred.resolve({ success: true });
          }
        });
      }, 1000);

      return deferred.promise;
    }

    function Update(user) {
      let deferred = $q.defer();

      let users = getUsers();
      for (let i = 0; i < users.length; i++) {
        if (users[i].id === user.id) {
          user[i] = user;
          break;
        }
      }
      setUsers(users);
      deferred.resolve();

      return deferred.promise;
    }

    function Delete(id) {
      let deferred = $q.defer();

      let user = getUsers();
      for (let i = 0; i < users.length; i++) {
        let user = users[i];

        if (user.id === id) {
          users.splice(i, 1);
          break;
        }
      }

      // private functions
      function getUsers() {
        if (!localStorage.users) {
          localStorage.users = JSON.stringify([]);
        }

        return JSON.parse(localStorage.users);
      }

      function setUsers(users) {
        localStorage.users = JSON.stringify(users);
      }
    }
  }
})();
