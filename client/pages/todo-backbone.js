var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap'); 

import _ from 'underscore'; 
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import rawTemplate from 'templates/todoItem.html';


// Backbone Todo App 

var TodoModel;
var TodoControllerView;
var TodoView;

var todoModel;
var TodoControllerView;


// Model

TodoModel = Backbone.Model.extend({
  defaults: {
    todos: []
  },
  todoSchema: {
    id: 0,
    title: "",
    completed: false
  },
  fetch: function(){
    var data = lscache.get('todos');
    data = this.applySchema(data);
    this.set('todos', data);
  },
  save: function(){
    var data = this.get('todos');
    lscache.set('todos', data);
  },
  applySchema: function(todos){
    var data = todos;
    var schema = this.todoSchema;
    data = (_.isArray(todos)) ? data : [];
    data = data.map(function(todo, index){
      todo.id = index;
      return _.defaults(todo, this.todoSchema);
    });

    return data;
  }
});

todoModel = new TodoModel();

// View 

TodoControllerView = Backbone.View.extend({
  el: 'body',
  model: todoModel,
  events: {
  },
  initialize: function(){},
  render: function(){
    alert('backbone!');
  }
});

todoControllerView = new TodoControllerView(); // it calls ViewClass.initialize

module.exports = todoControllerView;
