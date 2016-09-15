/*================================================================
	Server side Routing
	Route Declarations

=================================================================*/

/* ========================================================== 
Internal App Modules/Packages Required
============================================================ */
var userRoutes = require('./routes/user-routes');
var todoRoutes = require('./routes/todo-routes');

var auth = require('./middleware/auth');

module.exports = function(app) {

	/*================================================================
	ROUTES
	=================================================================*/
  app.post('/api/users/create', userRoutes.create);
  app.post('/api/users/login', userRoutes.login);
  app.post('/api/users/logout', userRoutes.logout);
	app.post('/api/todos', auth.authorized, todoRoutes.createTodo);
	app.get('/api/todos', auth.authorized, todoRoutes.getTodos);
	app.put('/api/todos/:todo_id', auth.authorized, todoRoutes.updateTodo);
	app.delete('/api/todos/:todo_id', auth.authorized, todoRoutes.deleteTodo);
};
