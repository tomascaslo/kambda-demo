/*================================================================
Server side Routing
Route Definitions

Depending on the REST route/endpoint the PostgreSQL database 
is Queried appropriately.

PostgreSQL DB table name is: 'todos'
=================================================================*/
var models = require('../models');
var Todo = models.Todo;

var results = [];


module.exports = {

	/*================================================================
	CREATE - $http post
	=================================================================*/
	//create todo and send back all todos after creation
	createTodo : function(req, res) {

    results = [];

    //Data to be saved to the DB - taken from $http request packet
    var data = {
      text : req.body.text,
    };

    Todo.create({
      text: data.text
    }).then(function(todo) {
      res.json(todo);
    });
  },


	/*================================================================
	READ - $http get
	=================================================================*/
	//Get all todos in the database
	getTodos : function(req, res) {

		results = [];

    Todo.findAll().then(function(todos) {
      res.json(todos);
    });
	},


	/*================================================================
	UPDATE - $http put
	=================================================================*/
	updateTodo : function(req, res) {

    results = [];

    var id = req.params.todo_id;

    var data = {
      text : req.body.text,
      done: req.body.done
    };

    console.log("ID= "+id); //TEST

    Todo.find({
      where: {
        id: id
      }
    }).then(function(todo) {
      if (todo) {
        todo.updateAttributes({
          text: data.text,
          done: data.done
        }).then(function(todo) {
          res.json(todo);
        });
      }
    });
  },

	/*================================================================
	DELETE - $http delete
	=================================================================*/
	deleteTodo : function(req, res) {

		results = [];
		var id = req.params.todo_id;

		console.log("id= "+id); //TEST

    Todo.destroy({
      where: {
        id: id
      }
    }).then(function(todo) {
      res.json(todo);
    });

	}
};
