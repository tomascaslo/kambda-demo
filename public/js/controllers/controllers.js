'use strict';

/*================================================
Module - for the Controllers
================================================ */
angular.module('postgreDbApp.controllers', [])

/**
 * Controller - MainCtrl
 */
.controller('MainCtrl', function($scope, $q, getTodosService, 
	createTodoService, updateTodoService, deleteTodoService, createUserService, loginUserService, logoutUserService) {

	$scope.formData = {};
	$scope.todos = {};
  $scope.user = {
    email: null,
    password: null
  };
  $scope.userSignup = {
    email: null,
    password: null
  };
  $scope.alerts = [];

	/*
	 * Get Todos
	 */
  function getTodos() {
    getTodosService.getTodos()
      .then(function(todos) {
        $scope.todos = todos.reverse();
      },
      function(error) {
        $scope.alerts.push({ message: 'OOPS! Error Loading Todos!!!!! ' + JSON.stringify(error) })
      });
  }

	/*
	 * Create a New Todo
	 */
	$scope.createTodo = function() {
		createTodoService.createTodo($scope.formData)
			.then(function(answer) {
        console.log(answer);
				$scope.todos.unshift(answer);
			},
			function(error) {
        $scope.alerts.push({ message: "OOPS Error Creating Todo!!!! " + JSON.stringify(error) })
			});
	};

	/*
	 * Update a Todo
	 */
	$scope.editTodo = function(id, txt, isDone) {

		var updateData = {"text":txt, "done": isDone};

		updateTodoService.updateTodo(id, updateData)
			.then(function(answer) {
        // Do something when todo task was successfully updated
			},
			function(error) {
        $scope.alerts.push({ message: "OOPS Error Updating!!!! " + JSON.stringify(error) })
			});
	};

	/*
	 * Delete a Todo
	 */
  $scope.deleteTodo = function(id) 
  {
    deleteTodoService.deleteTodo(id)
      .then(function(answer) {
        $scope.todos = $scope.todos.filter(function(todo) {
          return todo.id != id;
        });
      }, function(error) {
        $scope.alerts.push({ message: "OOPS Error Deleting!!!! " + JSON.stringify(error) })
      });
  };

  $scope.getTodoStatus = function(index) {
    if ($scope.todos[index].done) {
      return "Done";
    }

    return "Not done, yet";
  }

  // User functions

  $scope.isAuthenticated = function() { // We should also validate with server if token is valid
    return !!localStorage.getItem('sessionToken');
  };

  $scope.createUser = function() {
    createUserService.createUser($scope.userSignup)
      .then(function(user) {
        console.log(user);
      }, function(err) {
        $scope.alerts.push({ message: "OOPS Creating User!!!! " + JSON.stringify(err) })
      });
  };

  $scope.login = function() {
    loginUserService.login($scope.user)
      .then(function(user) {
        localStorage.setItem('sessionToken', user.sessionToken);
        getTodos();
      }, function(err) {
        $scope.alerts.push({ message: "OOPS in Login!!!! " + JSON.stringify(err) });
      });
  };

  $scope.logout = function() {
    localStorage.removeItem('sessionToken');
    logoutUserService.logout()
      .then(function(response) {
        console.log(response); 
        $scope.todos = [];
      }, function(err) {
        $scope.alerts.push({ message: "OOPS in Logout!!!! " + JSON.stringify(err) })
      });
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  }

  // Load todos
  if($scope.isAuthenticated()) {
    getTodos();
  }
});
