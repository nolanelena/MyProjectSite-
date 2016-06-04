var $ = require('jquery');

// legacy loading for bootstrap
window.jQuery = window.$ = $;
require('bootstrap'); 

import _ from 'underscore'; 
import Backbone from 'backbone';
import Handlebars from 'handlebars';
import lscache from 'lscache';
import todoItemTemplate from 'templates/todoItem.html';


// Backbone Todo App 

var TodoModel;   // classes 
var TodoControllerView;
var TodoView;
var TodoItemView;

var todoModel;  // object 
var todoControllerView;

// Model

TodoModel = Backbone.Model.extend({
  defaults: {
    todos: []
  },
  todoSchema: {
    id: 0,
    title: '',
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
      return _.defaults(todo, schema);
    });

    return data;
  },
  addItem: function(newTitle){
    var newTodo = {title: newTitle};
    var todos = this.get('todos');
    todos.push(newTodo);
    this.set('todos', todos);
    this.save();
  },
  removeItem: function(id){
    // finally actually remove the item
    var todos = this.get('todos');
    todos.splice(id, 1);
    this.save();
  }
});

todoModel = new TodoModel();

// View 

TodoControllerView = Backbone.View.extend({
  el: '.todo-container',
  model: todoModel,
  events: {
    'click .btn-add': 'addTodoItem'
  },
  initialize: function(){
    this.model.fetch();
  },
  render: function(){
    var todos = this.model.get('todos');
    var $ul = this.$el.find('ul');
    $ul.html('');
    todos.map(function(todo){
      var view = new TodoItemView(todo);
      $ul.append(view.$el);
    });
  },
  addTodoItem: function(){
    var $input = this.$el.find('.input-name');
    var newTitle = $input.val();
    if (newTitle === '') {return; }
    this.model.addItem(newTitle);
    $input.val('');
    this.render();
  },
  removeItem: function(id){
    this.model.removeItem(id);
    this.render();
  }
});

TodoItemView = Backbone.View.extend({
  tagName: 'li', // el= <li class="list-group-item"></li>
  className: 'list-group-item row',
  events: {
    'click .close': 'removerItem'
  },
  template: Handlebars.compile(todoItemTemplate),
  initialize: function(todo){
    this.data = todo;
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.data));
  },
  removeItem: function(){
    // get the id of the current item
    todoControllerView.removeItem(this.data.id);
  }
});

todoControllerView = new TodoControllerView(); // it calls ViewClass.initialize

module.exports = todoControllerView;
