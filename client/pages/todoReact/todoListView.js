var $ = require('jquery');
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import todoModel from 'pages/todoReact/todoModel';
import TodoItemView from 'pages/todoReact/todoView';
import dispatcher from 'pages/todoReact/todoDispatcher';


// Controller View

var TodoListView = Backbone.View.extend({
  el: '.todo-container',
  model: todoModel,
  events: {
    'click .btn-add': 'addTodoItem'
  },
  initialize: function(){
    this.model.fetch();
    this.model.on('change', this.render, this);
  },
  render: function(){
    // render the todo items
    var todos = this.model.get('todos');
    var $ul = this.$el.find('.list-group');
    $ul.html('');
    todos.forEach(function(todo){
      var extraClass = (todo.completed) ? 'disabled' : '';
      var $li = $('<li class="list-group-item row' + extraClass + '"></li>');
      $ul.append($li);
      ReactDOM.render(
          <TodoItemView data={todo} />,
          $li[0] // get original DOMnode from JQuery object 
        );
    });
  },
  addTodoItem: function(){
    var $input = this.$el.find('.input-name');
    var newTitle = $input.val();
    dispatcher.addTodo(newTitle);
    $input.val('');
    // TODO this.model.addItem(newTitle);

  }
});

module.exports = TodoListView;
