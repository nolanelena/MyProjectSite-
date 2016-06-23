var $ = require('jquery');
import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import todoModel from 'pages/todoReact/todoModel';
import TodoItemView from 'pages/todoReact/todoView';


// Controller View

var TodoControllerView = Backbone.View.extend({
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
    var controller = this;
    todos.forEach(function(todo){
      var $li = $('<li class="list-group-item row"></li>');
      $ul.append($li);
      ReactDOM.render(
          <TodoItemView data={todo} controller={controller} />,
          $li[0] // get original DOMnode from JQuery object 
        );
    });
  },
  addTodoItem: function(){
    var $input = this.$el.find('.input-name');
    var newTitle = $input.val();
    if (newTitle === '') { return; }
    this.model.addItem(newTitle);
    $input.val('');
    this.render();
  },
  titleEdit: function(newTitle, id){
    this.model.editTitle(newTitle, id);
    this.render();
  }
});

module.exports = TodoControllerView;
